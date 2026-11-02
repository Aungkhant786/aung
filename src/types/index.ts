export interface Service {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price: number;
  is_active: boolean;
  created_at?: string;
}

export interface Appointment {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  service_id: string;
  appointment_date: string; // YYYY-MM-DD
  start_time: string; // HH:mm:ss or HH:mm
  end_time: string; // HH:mm:ss or HH:mm
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string | null;
  created_at?: string;
  services?: Service;
}

export interface BusinessHours {
  id: string;
  weekday: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  is_open: boolean;
  start_time: string; // "09:00:00"
  end_time: string; // "19:00:00"
}

export interface BlockedDate {
  id: string;
  blocked_date: string; // YYYY-MM-DD
  reason: string | null;
  created_at?: string;
}

export interface BusinessSettings {
  id: string;
  business_name: string;
  business_email: string;
  business_phone: string;
  business_address: string;
  slot_interval_minutes: number;
  booking_notice_hours: number;
  created_at?: string;
}

export interface AdminUser {
  id: string;
  user_id: string;
  created_at?: string;
}

export interface TimeSlot {
  start: Date;
  end: Date;
  label: string; // e.g. "09:00 AM"
  startTimeString: string; // "09:00:00"
  endTimeString: string; // "10:15:00"
}

export interface BookingFormData {
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
}
