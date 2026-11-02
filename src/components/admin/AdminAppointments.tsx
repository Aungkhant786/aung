import React, { useState, useMemo } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Appointment } from '../../types';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Search,
  Filter,
  RefreshCw,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock3,
} from 'lucide-react';

export const AdminAppointments: React.FC = () => {
  const {
    appointments,
    updateAppointmentStatus,
    refreshAppointments,
    loadingAppointments,
  } = useSalon();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Filtered appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      // Status filter
      if (statusFilter !== 'all' && appt.status !== statusFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = appt.full_name.toLowerCase().includes(query);
        const matchesEmail = appt.email.toLowerCase().includes(query);
        const matchesPhone = appt.phone.toLowerCase().includes(query);
        const matchesService = appt.services?.name.toLowerCase().includes(query) ?? false;
        if (!matchesName && !matchesEmail && !matchesPhone && !matchesService) {
          return false;
        }
      }

      return true;
    });
  }, [appointments, statusFilter, searchQuery]);

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Confirmed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
            <Clock3 className="w-3 h-3" />
            Pending
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
            <XCircle className="w-3 h-3" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#241F1C]">
            Appointments Registry
          </h2>
          <p className="text-xs text-[#726861] mt-0.5">
            View, filter, and update status for all client bookings
          </p>
        </div>

        <button
          onClick={() => refreshAppointments()}
          disabled={loadingAppointments}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#FAF3EE] border border-[#DDD0C5] text-xs font-semibold text-[#241F1C] rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#9E6D59] ${loadingAppointments ? 'animate-spin' : ''}`} />
          <span>Refresh Bookings</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 rounded-2xl bg-white border border-[#E8DFD7] shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'All' },
            { id: 'pending', label: 'Pending' },
            { id: 'confirmed', label: 'Confirmed' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                statusFilter === tab.id
                  ? 'bg-[#241F1C] text-white shadow-xs'
                  : 'text-[#726861] hover:text-[#241F1C] hover:bg-[#FAF8F5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#A89E96] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search client, email, service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#DDD0C5] rounded-xl text-xs text-[#241F1C] placeholder-[#A89E96] focus:outline-none focus:ring-1 focus:ring-[#C69F77]"
          />
        </div>
      </div>

      {/* Appointments List / Table */}
      <div className="bg-white rounded-3xl border border-[#E8DFD7] shadow-sm overflow-hidden">
        {filteredAppointments.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <Calendar className="w-10 h-10 text-[#A89E96] mx-auto" />
            <p className="text-sm font-medium text-[#241F1C]">No Appointments Found</p>
            <p className="text-xs text-[#726861] max-w-sm mx-auto">
              No bookings matched your filter criteria. Try clearing search keywords or selecting "All".
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#F2EBE5]">
            {filteredAppointments.map((appt) => (
              <div
                key={appt.id}
                className="p-5 sm:p-6 hover:bg-[#FAF8F5]/80 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                {/* Left: Client & Service Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-serif text-lg font-medium text-[#241F1C]">
                      {appt.full_name}
                    </span>
                    {getStatusBadge(appt.status)}
                    <span className="text-xs font-semibold text-[#9E6D59] bg-[#FAF3EE] px-2.5 py-0.5 rounded-md border border-[#EAE0D6]">
                      {appt.services?.name || 'Selected Ritual'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs text-[#726861]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#9E6D59]" />
                      <span>{appt.appointment_date}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#9E6D59]" />
                      <span className="tabular-nums font-medium text-[#241F1C]">
                        {appt.start_time.slice(0, 5)} - {appt.end_time.slice(0, 5)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#9E6D59]" />
                      <span>{appt.phone}</span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:col-span-2">
                      <Mail className="w-3.5 h-3.5 text-[#9E6D59]" />
                      <span className="truncate">{appt.email}</span>
                    </div>
                  </div>

                  {appt.notes && (
                    <div className="text-xs text-[#726861] bg-[#FAF3EE]/60 p-2 rounded-lg border border-[#EAE0D6]/80 flex items-start gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#9E6D59] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[#241F1C]">Client Note: </strong>
                        {appt.notes}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right: Actions / Status Updater */}
                <div className="flex items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#F2EBE5] shrink-0">
                  <span className="text-xs text-[#726861] mr-1 hidden sm:inline">Set status:</span>
                  <select
                    value={appt.status}
                    onChange={(e) => updateAppointmentStatus(appt.id, e.target.value as Appointment['status'])}
                    className="px-3 py-1.5 bg-[#FAF8F5] border border-[#DDD0C5] rounded-xl text-xs font-semibold text-[#241F1C] focus:outline-none focus:ring-1 focus:ring-[#C69F77] cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
