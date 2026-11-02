import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { Calendar, Clock, CheckCircle2, AlertCircle, Sparkles, User, Phone, ArrowUpRight } from 'lucide-react';
import { Appointment } from '../../types';

interface AdminOverviewProps {
  onNavigate: (tab: 'appointments' | 'services' | 'hours' | 'blocked' | 'settings') => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onNavigate }) => {
  const { appointments, activeServices, updateAppointmentStatus, businessSettings } = useSalon();

  // Metrics
  const totalAppointments = appointments.length;
  const pendingAppointments = appointments.filter((a) => a.status === 'pending');
  const confirmedAppointments = appointments.filter((a) => a.status === 'confirmed');
  const completedAppointments = appointments.filter((a) => a.status === 'completed');

  const recentAppointments = appointments.slice(0, 5);

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'completed':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#241F1C] text-[#FAF8F5] relative overflow-hidden shadow-lg border border-[#3B2C24]">
        <div className="relative z-10 space-y-2 max-w-xl">
          <p className="text-xs uppercase tracking-widest text-[#D9A592] font-semibold">
            Salon Command Center
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-white">
            {businessSettings.business_name || 'Yarpyae Beauty Salon'}
          </h2>
          <p className="text-xs sm:text-sm text-[#D1C7BD] leading-relaxed">
            Manage your daily appointment bookings, edit treatment services, adjust business hours, and update salon preferences.
          </p>
        </div>
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#3B2C24]/50 pointer-events-none" />
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-[#E8DFD7] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-[#726861] uppercase tracking-wider font-medium">Pending Requests</p>
            <p className="font-serif text-3xl font-semibold text-[#241F1C] mt-1 tabular-nums">
              {pendingAppointments.length}
            </p>
            <button
              onClick={() => onNavigate('appointments')}
              className="text-[11px] text-[#9E6D59] hover:underline mt-2 inline-flex items-center gap-1 font-medium"
            >
              <span>Review requests</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E8DFD7] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-[#726861] uppercase tracking-wider font-medium">Confirmed Visits</p>
            <p className="font-serif text-3xl font-semibold text-[#241F1C] mt-1 tabular-nums">
              {confirmedAppointments.length}
            </p>
            <span className="text-[11px] text-[#726861] mt-2 block">
              Active scheduled sessions
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E8DFD7] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-[#726861] uppercase tracking-wider font-medium">Completed</p>
            <p className="font-serif text-3xl font-semibold text-[#241F1C] mt-1 tabular-nums">
              {completedAppointments.length}
            </p>
            <span className="text-[11px] text-[#726861] mt-2 block">
              Total served clients
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E8DFD7] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-[#726861] uppercase tracking-wider font-medium">Active Services</p>
            <p className="font-serif text-3xl font-semibold text-[#241F1C] mt-1 tabular-nums">
              {activeServices.length}
            </p>
            <button
              onClick={() => onNavigate('services')}
              className="text-[11px] text-[#9E6D59] hover:underline mt-2 inline-flex items-center gap-1 font-medium"
            >
              <span>Manage menu</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FAF3EE] text-[#9E6D59] flex items-center justify-center shrink-0 border border-[#EAE0D6]">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Appointments Section */}
      <div className="bg-white rounded-3xl border border-[#E8DFD7] shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#F2EBE5]">
          <div>
            <h3 className="font-serif text-xl text-[#241F1C]">Recent Appointment Requests</h3>
            <p className="text-xs text-[#726861]">Latest incoming bookings from your public salon website</p>
          </div>
          <button
            onClick={() => onNavigate('appointments')}
            className="text-xs font-semibold text-[#9E6D59] hover:text-[#241F1C] transition-colors"
          >
            View All ({totalAppointments}) →
          </button>
        </div>

        {recentAppointments.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Calendar className="w-8 h-8 text-[#A89E96] mx-auto" />
            <p className="text-sm font-medium text-[#241F1C]">No Appointments Recorded Yet</p>
            <p className="text-xs text-[#726861] max-w-sm mx-auto">
              When clients book a session on your website, their appointment details will instantly appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentAppointments.map((appt) => (
              <div
                key={appt.id}
                className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD7] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#D9A592] transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#9E6D59]" />
                    <span className="font-semibold text-sm text-[#241F1C]">{appt.full_name}</span>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusColor(appt.status)}`}>
                      {appt.status}
                    </span>
                  </div>
                  <div className="text-xs text-[#726861] flex flex-wrap items-center gap-3">
                    <span className="font-medium text-[#241F1C]">{appt.services?.name || 'Selected Treatment'}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#9E6D59]" />
                      {appt.appointment_date}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#9E6D59]" />
                      {appt.start_time.slice(0, 5)} - {appt.end_time.slice(0, 5)}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#9E6D59]" />
                      {appt.phone}
                    </span>
                  </div>
                </div>

                {/* Quick status buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {appt.status !== 'confirmed' && (
                    <button
                      onClick={() => updateAppointmentStatus(appt.id, 'confirmed')}
                      className="px-2.5 py-1 text-xs font-medium text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
                    >
                      Confirm
                    </button>
                  )}
                  {appt.status !== 'completed' && (
                    <button
                      onClick={() => updateAppointmentStatus(appt.id, 'completed')}
                      className="px-2.5 py-1 text-xs font-medium text-blue-800 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                    >
                      Complete
                    </button>
                  )}
                  {appt.status !== 'cancelled' && (
                    <button
                      onClick={() => updateAppointmentStatus(appt.id, 'cancelled')}
                      className="px-2.5 py-1 text-xs font-medium text-rose-800 bg-rose-100 hover:bg-rose-200 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
