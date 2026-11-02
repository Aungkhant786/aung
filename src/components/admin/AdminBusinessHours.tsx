import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { BusinessHours } from '../../types';
import { WEEKDAY_NAMES } from '../../lib/defaultData';
import { Clock, Check, Save, AlertCircle } from 'lucide-react';

export const AdminBusinessHours: React.FC = () => {
  const { businessHours, updateBusinessHours } = useSalon();

  // Local state for editing
  const [hoursList, setHoursList] = useState<BusinessHours[]>(businessHours);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleToggleOpen = (weekday: number) => {
    setHoursList((prev) =>
      prev.map((h) => (h.weekday === weekday ? { ...h, is_open: !h.is_open } : h))
    );
    setSaveSuccess(false);
  };

  const handleTimeChange = (weekday: number, field: 'start_time' | 'end_time', value: string) => {
    // ensure value has seconds format: "09:00" -> "09:00:00"
    const formatted = value.length === 5 ? `${value}:00` : value;
    setHoursList((prev) =>
      prev.map((h) => (h.weekday === weekday ? { ...h, [field]: formatted } : h))
    );
    setSaveSuccess(false);
  };

  const handleSaveHours = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    const ok = await updateBusinessHours(hoursList);
    setIsSaving(false);

    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      setSaveError('Failed to save operating schedule. Please check Supabase permissions.');
    }
  };

  // Sort by weekday: 1 (Monday) to 6 (Saturday), then 0 (Sunday)
  const orderedHours = [...hoursList].sort((a, b) => {
    const orderA = a.weekday === 0 ? 7 : a.weekday;
    const orderB = b.weekday === 0 ? 7 : b.weekday;
    return orderA - orderB;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#241F1C]">
            Business Hours & Working Schedule
          </h2>
          <p className="text-xs text-[#726861] mt-0.5">
            Operating schedule directly shapes real-time slot generation for client booking.
          </p>
        </div>

        <button
          onClick={handleSaveHours}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#241F1C] hover:bg-[#3B2C24] disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow-sm transition-all active:scale-95 self-start sm:self-auto"
        >
          {isSaving ? (
            <span>Saving...</span>
          ) : (
            <>
              <Save className="w-4 h-4 text-[#D9A592]" />
              <span>Save Schedule</span>
            </>
          )}
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Business hours successfully updated! Booking slots have been recalculated.</span>
        </div>
      )}

      {saveError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span>{saveError}</span>
        </div>
      )}

      {/* Schedule Table / Cards */}
      <div className="bg-white rounded-3xl border border-[#E8DFD7] shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 pb-4 border-b border-[#F2EBE5]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#726861]">
            Weekly Hours (Standard: Mon-Sat 9AM-7PM, Sun 10AM-4PM)
          </p>
        </div>

        <div className="divide-y divide-[#F2EBE5]">
          {orderedHours.map((item) => {
            const dayName = WEEKDAY_NAMES[item.weekday];
            // Format time for <input type="time" /> (HH:mm)
            const startTimeInput = item.start_time.slice(0, 5);
            const endTimeInput = item.end_time.slice(0, 5);

            return (
              <div
                key={item.weekday}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF8F5]/60 transition-colors"
              >
                {/* Weekday & Status */}
                <div className="flex items-center gap-4 min-w-[160px]">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.is_open}
                      onChange={() => handleToggleOpen(item.weekday)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#241F1C]"></div>
                  </label>

                  <div>
                    <h4 className="font-serif text-base font-medium text-[#241F1C]">
                      {dayName}
                    </h4>
                    <span className={`text-[11px] font-medium ${item.is_open ? 'text-emerald-700' : 'text-slate-400'}`}>
                      {item.is_open ? 'Open for Bookings' : 'Closed'}
                    </span>
                  </div>
                </div>

                {/* Time Range Inputs */}
                {item.is_open ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#9E6D59]" />
                      <span className="text-xs text-[#726861]">Opens:</span>
                      <input
                        type="time"
                        value={startTimeInput}
                        onChange={(e) => handleTimeChange(item.weekday, 'start_time', e.target.value)}
                        className="px-3 py-1.5 bg-[#FAF8F5] border border-[#DDD0C5] rounded-xl text-xs font-semibold text-[#241F1C] focus:outline-none focus:ring-1 focus:ring-[#C69F77]"
                      />
                    </div>

                    <span className="text-xs text-[#726861]">to</span>

                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-[#726861]">Closes:</span>
                      <input
                        type="time"
                        value={endTimeInput}
                        onChange={(e) => handleTimeChange(item.weekday, 'end_time', e.target.value)}
                        className="px-3 py-1.5 bg-[#FAF8F5] border border-[#DDD0C5] rounded-xl text-xs font-semibold text-[#241F1C] focus:outline-none focus:ring-1 focus:ring-[#C69F77]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-[#A89E96] italic">
                    No time slots generated for this day
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
