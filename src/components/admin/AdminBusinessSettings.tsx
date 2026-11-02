import React, { useState, useEffect } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Save, Check, AlertCircle, Building, Mail, Phone, MapPin, Clock, ShieldCheck, Database } from 'lucide-react';

export const AdminBusinessSettings: React.FC = () => {
  const { businessSettings, updateBusinessSettings, seedInitialDataToSupabase } = useSalon();

  const [businessName, setBusinessName] = useState(businessSettings.business_name || '');
  const [businessEmail, setBusinessEmail] = useState(businessSettings.business_email || '');
  const [businessPhone, setBusinessPhone] = useState(businessSettings.business_phone || '');
  const [businessAddress, setBusinessAddress] = useState(businessSettings.business_address || '');
  const [slotInterval, setSlotInterval] = useState(businessSettings.slot_interval_minutes || 30);
  const [bookingNotice, setBookingNotice] = useState(businessSettings.booking_notice_hours || 2);

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);

  // Sync state if settings change in context
  useEffect(() => {
    setBusinessName(businessSettings.business_name || '');
    setBusinessEmail(businessSettings.business_email || '');
    setBusinessPhone(businessSettings.business_phone || '');
    setBusinessAddress(businessSettings.business_address || '');
    setSlotInterval(businessSettings.slot_interval_minutes || 30);
    setBookingNotice(businessSettings.booking_notice_hours || 2);
  }, [businessSettings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      setError('Salon name is required.');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(false);

    const ok = await updateBusinessSettings({
      business_name: businessName.trim(),
      business_email: businessEmail.trim(),
      business_phone: businessPhone.trim(),
      business_address: businessAddress.trim(),
      slot_interval_minutes: Number(slotInterval),
      booking_notice_hours: Number(bookingNotice),
    });

    setSaving(false);

    if (ok) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError('Failed to update business settings in Supabase.');
    }
  };

  const handleSeedDefaults = async () => {
    if (!window.confirm('Do you want to seed default Glow & Glam salon settings, hours, and initial services to your Supabase project?')) {
      return;
    }
    setSeeding(true);
    setSeedMessage(null);
    const result = await seedInitialDataToSupabase();
    setSeeding(false);
    setSeedMessage(result.message);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#241F1C]">
          Business Settings
        </h2>
        <p className="text-xs text-[#726861] mt-0.5">
          Configure salon identity, contact channels, and slot generation intervals.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Business settings saved successfully! Changes are live across the public salon website.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {seedMessage && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs flex items-center gap-2">
          <Database className="w-4 h-4 text-blue-600" />
          <span>{seedMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-[#E8DFD7] shadow-sm p-6 sm:p-8 space-y-6">
        <div className="pb-4 border-b border-[#F2EBE5]">
          <h3 className="font-serif text-lg text-[#241F1C]">
            Salon Profile & Contact Information
          </h3>
          <p className="text-xs text-[#726861]">
            Stored in <code className="font-mono text-[#241F1C]">business_settings</code>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-[#241F1C] mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#9E6D59]" />
              Salon Name
            </label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Glow & Glam Beauty Salon & Spa"
              className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#DDD0C5] rounded-xl text-xs text-[#241F1C] focus:outline-none focus:ring-1 focus:ring-[#C69F77]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#241F1C] mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#9E6D59]" />
              Salon Email
            </label>
            <input
              type="email"
              required
              value={businessEmail}
              onChange={(e) => setBusinessEmail(e.target.value)}
              placeholder="hello@glowandglam.com"
              className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#DDD0C5] rounded-xl text-xs text-[#241F1C] focus:outline-none focus:ring-1 focus:ring-[#C69F77]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#241F1C] mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#9E6D59]" />
              Salon Phone
            </label>
            <input
              type="text"
              required
              value={businessPhone}
              onChange={(e) => setBusinessPhone(e.target.value)}
              placeholder="+95 9 789 223 344"
              className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#DDD0C5] rounded-xl text-xs text-[#241F1C] focus:outline-none focus:ring-1 focus:ring-[#C69F77]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#241F1C] mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#9E6D59]" />
              Salon Address
            </label>
            <input
              type="text"
              required
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
              placeholder="Sanchaung, Yangon"
              className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#DDD0C5] rounded-xl text-xs text-[#241F1C] focus:outline-none focus:ring-1 focus:ring-[#C69F77]"
            />
          </div>
        </div>

        <div className="pt-4 pb-2 border-t border-[#F2EBE5]">
          <h3 className="font-serif text-lg text-[#241F1C]">
            Booking Engine Calibration
          </h3>
          <p className="text-xs text-[#726861]">
            Controls interval granularity and required advance notice
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-[#241F1C] mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#9E6D59]" />
              Slot Interval (Minutes)
            </label>
            <select
              value={slotInterval}
              onChange={(e) => setSlotInterval(Number(e.target.value))}
              className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#DDD0C5] rounded-xl text-xs font-semibold text-[#241F1C] focus:outline-none focus:ring-1 focus:ring-[#C69F77]"
            >
              <option value={15}>15 minutes (dense)</option>
              <option value={30}>30 minutes (recommended)</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
            </select>
            <span className="text-[11px] text-[#726861] mt-1 block">
              Spacing between available starting time slots.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#241F1C] mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#9E6D59]" />
              Booking Notice (Hours)
            </label>
            <select
              value={bookingNotice}
              onChange={(e) => setBookingNotice(Number(e.target.value))}
              className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#DDD0C5] rounded-xl text-xs font-semibold text-[#241F1C] focus:outline-none focus:ring-1 focus:ring-[#C69F77]"
            >
              <option value={1}>1 hour</option>
              <option value={2}>2 hours (recommended)</option>
              <option value={4}>4 hours</option>
              <option value={12}>12 hours</option>
              <option value={24}>24 hours</option>
            </select>
            <span className="text-[11px] text-[#726861] mt-1 block">
              Clients cannot book slots sooner than this window from now.
            </span>
          </div>
        </div>

        <div className="pt-6 border-t border-[#F2EBE5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleSeedDefaults}
            disabled={seeding}
            className="text-xs text-[#726861] hover:text-[#241F1C] flex items-center gap-1.5 underline"
          >
            <Database className="w-3.5 h-3.5 text-[#9E6D59]" />
            <span>Seed Default Salon Data into Supabase</span>
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 text-xs font-medium text-white bg-[#241F1C] hover:bg-[#3B2C24] disabled:opacity-50 transition-colors rounded-xl shadow-xs flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-[#D9A592]" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
