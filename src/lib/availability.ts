import { Appointment, BlockedDate, BusinessHours, BusinessSettings, Service, TimeSlot } from '../types';

/**
 * Format a Date object into a 12-hour label: e.g. "9:00 AM" or "02:30 PM"
 */
export function formatSlotLabel(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 hour is 12 AM
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hours}:${minutesStr} ${ampm}`;
}

/**
 * Format a Date object into "HH:mm:ss" for Supabase TIME column
 */
export function formatTimeForDb(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

/**
 * Format a Date object into "YYYY-MM-DD" for Supabase DATE column
 */
export function formatDateForDb(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parse an appointment start/end time string (like "09:00:00" or "09:00")
 * on top of a specific base date.
 */
export function parseTimeToDate(dateBase: Date, timeStr: string): Date {
  const [hStr, mStr, sStr] = timeStr.split(':');
  const hours = parseInt(hStr || '0', 10);
  const minutes = parseInt(mStr || '0', 10);
  const seconds = parseInt(sStr || '0', 10);

  const result = new Date(dateBase.getTime());
  result.setHours(hours, minutes, seconds, 0);
  return result;
}

/**
 * Generate all valid time slots for a given date, service, business hours,
 * settings, blocked dates, and existing appointments.
 */
export function generateAvailableSlots(params: {
  selectedDate: Date;
  service: Service;
  businessHours: BusinessHours[];
  settings: BusinessSettings;
  blockedDates: BlockedDate[];
  existingAppointments: Appointment[];
}): TimeSlot[] {
  const {
    selectedDate,
    service,
    businessHours,
    settings,
    blockedDates,
    existingAppointments,
  } = params;

  // 1. Check if the date is blocked
  const selectedDateStr = formatDateForDb(selectedDate);
  const isBlocked = blockedDates.some((b) => b.blocked_date === selectedDateStr);
  if (isBlocked) {
    return [];
  }

  // 2. Check business hours for this day of the week (0 = Sunday, 1 = Monday, ...)
  const weekday = selectedDate.getDay();
  const dayHours = businessHours.find((h) => h.weekday === weekday);
  if (!dayHours || !dayHours.is_open) {
    return [];
  }

  // 3. Parse operating hours start and end
  const openTime = parseTimeToDate(selectedDate, dayHours.start_time);
  const closeTime = parseTimeToDate(selectedDate, dayHours.end_time);

  if (openTime >= closeTime) {
    return [];
  }

  // 4. Respect booking notice time: now + notice hours
  const now = new Date();
  const minimumBookingTime = new Date(
    now.getTime() + (settings.booking_notice_hours || 2) * 60 * 60 * 1000
  );

  // 5. Gather relevant existing appointments for this day (ignoring cancelled)
  const activeDayAppointments = existingAppointments.filter((app) => {
    if (app.status === 'cancelled') return false;
    return app.appointment_date === selectedDateStr;
  });

  const durationMs = (service.duration_minutes || 60) * 60 * 1000;
  const intervalMinutes = settings.slot_interval_minutes || 30;
  const intervalMs = intervalMinutes * 60 * 1000;

  const slots: TimeSlot[] = [];

  let currentSlotStart = new Date(openTime.getTime());

  // Loop through candidate slots inside operating hours
  while (currentSlotStart.getTime() + durationMs <= closeTime.getTime()) {
    const currentSlotEnd = new Date(currentSlotStart.getTime() + durationMs);

    // Rule: must respect booking notice
    const satisfiesNotice = currentSlotStart.getTime() >= minimumBookingTime.getTime();

    if (satisfiesNotice) {
      // Overlap rule: new_start < existing_end AND new_end > existing_start
      const hasConflict = activeDayAppointments.some((appt) => {
        const apptStart = parseTimeToDate(selectedDate, appt.start_time);
        const apptEnd = parseTimeToDate(selectedDate, appt.end_time);
        return currentSlotStart < apptEnd && currentSlotEnd > apptStart;
      });

      if (!hasConflict) {
        slots.push({
          start: new Date(currentSlotStart),
          end: new Date(currentSlotEnd),
          label: formatSlotLabel(currentSlotStart),
          startTimeString: formatTimeForDb(currentSlotStart),
          endTimeString: formatTimeForDb(currentSlotEnd),
        });
      }
    }

    // Advance by interval
    currentSlotStart = new Date(currentSlotStart.getTime() + intervalMs);
  }

  return slots;
}
