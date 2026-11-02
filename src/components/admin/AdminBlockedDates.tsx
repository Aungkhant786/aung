import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Calendar, Trash2, Plus, AlertCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { formatDateForDb } from '../../lib/availability';

export const AdminBlockedDates: React.FC = () => {
  const { blockedDates, addBlockedDate, removeBlockedDate } = useSalon();

  const [date, setDate] = useState<string>(formatDateForDb(new Date()));
  const [reason, setReason] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      setError('Please select a date to block.');
      return;
    }

    // Check if already blocked
    if (blockedDates.some((b) => b.blocked_date === date)) {
      setError('This date is already blocked.');
      return;
    }

    setIsAdding(true);
    setError(null);

    const ok = await addBlockedDate(date, reason.trim() || 'Private salon event or holiday closure');
    setIsAdding(false);

    if (ok) {
      setReason('');
    } else {
      setError('Failed to block date. Please verify your Supabase connection.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to unblock this date? Clients will be able to book sessions on this day.')) {
      await removeBlockedDate(id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#241F1C]">
          Blocked Dates & Salon Closures
        </h2>
        <p className="text-xs text-[#726861] mt-0.5">
          Dates registered here are immediately excluded from public booking availability.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Add Blocked Date Form */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-[#E8DFD7] shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#F2EBE5]">
            <ShieldAlert className="w-4 h-4 text-[#9E6D59]" />
            <h3 className="font-serif text-lg font-medium text-[#241F1C]">
              Block a Specific Date
            </h3>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#241F1C] mb-1">
                Date to Block *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#DDD0C5] rounded-xl text-xs text-[#241F1C] focus:outline-none focus:ring-1 focus:ring-[#C69F77]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#241F1C] mb-1">
                Reason / Note (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. National Holiday, Staff Masterclass, Deep Renovation"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#DDD0C5] rounded-xl text-xs text-[#241F1C] placeholder-[#A89E96] focus:outline-none focus:ring-1 focus:ring-[#C69F77]"
              />
            </div>

            <button
              type="submit"
              disabled={isAdding}
              className="w-full py-2.5 text-xs font-medium text-white bg-[#241F1C] hover:bg-[#3B2C24] disabled:opacity-50 transition-colors rounded-xl shadow-xs flex items-center justify-center gap-2"
            >
              <Plus className="w-3.5 h-3.5 text-[#D9A592]" />
              <span>{isAdding ? 'Adding Closure...' : 'Block Date'}</span>
            </button>
          </form>

          <p className="text-[11px] text-[#726861] pt-2">
            Tip: Clients browsing this date will see a clear unavailable notice and be guided to pick another open slot.
          </p>
        </div>

        {/* Right: Blocked Dates List */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E8DFD7] shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 sm:p-6 pb-4 border-b border-[#F2EBE5] flex items-center justify-between">
            <h3 className="font-serif text-lg font-medium text-[#241F1C]">
              Scheduled Closures ({blockedDates.length})
            </h3>
            <span className="text-xs text-[#726861]">Active exclusions</span>
          </div>

          <div className="flex-1 divide-y divide-[#F2EBE5]">
            {blockedDates.length === 0 ? (
              <div className="py-16 text-center space-y-2">
                <Calendar className="w-8 h-8 text-[#A89E96] mx-auto" />
                <p className="text-sm font-medium text-[#241F1C]">No Blocked Dates</p>
                <p className="text-xs text-[#726861] max-w-xs mx-auto">
                  The salon operates on normal weekly schedule without upcoming holiday closures.
                </p>
              </div>
            ) : (
              blockedDates.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#FAF8F5]/80 transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#9E6D59]" />
                      <span className="font-semibold text-sm text-[#241F1C]">
                        {item.blocked_date}
                      </span>
                    </div>
                    <p className="text-xs text-[#726861] pl-6">
                      {item.reason || 'Salon Closed'}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-[#726861] hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove blocked date"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
