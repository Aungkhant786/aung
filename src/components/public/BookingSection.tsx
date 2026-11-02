import React, { useState, useMemo, useEffect } from 'react';
import { useSalon } from '../../context/SalonContext';
import { useLanguage } from '../../context/LanguageContext';
import { Service, TimeSlot } from '../../types';
import { generateAvailableSlots, formatDateForDb } from '../../lib/availability';
import { BookingSuccessModal } from './BookingSuccessModal';
import { Calendar, Clock, Check, ArrowRight, User, Mail, Phone, MessageSquare, AlertCircle } from 'lucide-react';

interface BookingSectionProps {
  preselectedService?: Service | null;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ preselectedService }) => {
  const {
    activeServices,
    businessHours,
    businessSettings,
    blockedDates,
    appointments,
    createAppointment,
  } = useSalon();

  const { t, language } = useLanguage();

  // Steps: 1: Service, 2: Date & Time, 3: Details
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selections
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Calculate default valid date (tomorrow or today + 1 day)
  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return formatDateForDb(d);
  }, []);

  const [selectedDateStr, setSelectedDateStr] = useState<string>(tomorrowStr);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // Client Details Form
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    fullName: string;
    email: string;
    phone: string;
    date: string;
    slotLabel: string;
    notes?: string;
    service: Service;
  } | null>(null);

  // Update selectedService when preselectedService prop changes
  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
      setCurrentStep(2);
      setSelectedSlot(null);
    }
  }, [preselectedService]);

  // Set initial selected service if none selected
  useEffect(() => {
    if (!selectedService && activeServices.length > 0) {
      setSelectedService(activeServices[0]);
    }
  }, [activeServices, selectedService]);

  // Compute available slots whenever selectedDateStr or selectedService changes
  const availableSlots = useMemo(() => {
    if (!selectedService || !selectedDateStr) return [];

    const [y, m, d] = selectedDateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);

    return generateAvailableSlots({
      selectedDate: dateObj,
      service: selectedService,
      businessHours,
      settings: businessSettings,
      blockedDates,
      existingAppointments: appointments,
    });
  }, [selectedDateStr, selectedService, businessHours, businessSettings, blockedDates, appointments]);

  // Handle slot click
  const handleSelectSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setErrorMessage(null);
  };

  // Check if current date is blocked
  const isDateBlocked = useMemo(() => {
    return blockedDates.some((b) => b.blocked_date === selectedDateStr);
  }, [blockedDates, selectedDateStr]);

  // Handle submit appointment
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedSlot) {
      setErrorMessage(t.booking.validationMissing);
      return;
    }

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage(t.booking.validationInputs);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const result = await createAppointment({
      fullName,
      email,
      phone,
      serviceId: selectedService.id,
      appointmentDate: selectedDateStr,
      startTime: selectedSlot.startTimeString,
      endTime: selectedSlot.endTimeString,
      notes,
    });

    setIsSubmitting(false);

    if (result.success) {
      setConfirmedBooking({
        fullName,
        email,
        phone,
        date: selectedDateStr,
        slotLabel: selectedSlot.label,
        notes,
        service: selectedService,
      });
      setIsSuccessModalOpen(true);

      // Reset form partially
      setFullName('');
      setEmail('');
      setPhone('');
      setNotes('');
      setSelectedSlot(null);
      setCurrentStep(1);
    } else {
      setErrorMessage(result.error || 'Failed to submit booking. Please try again.');
    }
  };

  // Formatted date label
  const formattedSelectedDate = useMemo(() => {
    if (!selectedDateStr) return '';
    const [y, m, d] = selectedDateStr.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(language === 'my' ? 'my-MM' : 'en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }, [selectedDateStr, language]);

  const getServiceDisplayName = (srv: Service) => {
    const tr = t.services.serviceNames[srv.name];
    return (language === 'my' && tr) ? tr.name : srv.name;
  };

  const getServiceDisplayDesc = (srv: Service) => {
    const tr = t.services.serviceNames[srv.name];
    return (language === 'my' && tr) ? tr.description : (srv.description || t.services.customServiceFallback);
  };

  return (
    <section id="booking" className="py-20 lg:py-28 bg-[#FAF8F5] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="max-w-xl mx-auto text-center space-y-3 mb-12">
          <p className="text-xs uppercase tracking-widest text-[#9E6D59] font-medium">
            {t.booking.kicker}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#241F1C] tracking-tight">
            {t.booking.headline}
          </h2>
          <p className="text-sm text-[#726861]">
            {t.booking.subtitle}
          </p>
        </div>

        {/* Step Indicator (Clean, non-pill) */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="grid grid-cols-3 gap-2 text-center">
            <button
              onClick={() => setCurrentStep(1)}
              className={`pb-3 border-b-2 text-xs sm:text-sm font-medium transition-colors ${
                currentStep === 1
                  ? 'border-[#241F1C] text-[#241F1C]'
                  : currentStep > 1
                  ? 'border-[#9E6D59] text-[#9E6D59]'
                  : 'border-[#EAE3DC] text-[#A89E96]'
              }`}
            >
              {t.booking.step1Tab}
            </button>
            <button
              onClick={() => selectedService && setCurrentStep(2)}
              disabled={!selectedService}
              className={`pb-3 border-b-2 text-xs sm:text-sm font-medium transition-colors ${
                currentStep === 2
                  ? 'border-[#241F1C] text-[#241F1C]'
                  : currentStep > 2
                  ? 'border-[#9E6D59] text-[#9E6D59]'
                  : 'border-[#EAE3DC] text-[#A89E96]'
              }`}
            >
              {t.booking.step2Tab}
            </button>
            <button
              onClick={() => selectedService && selectedSlot && setCurrentStep(3)}
              disabled={!selectedService || !selectedSlot}
              className={`pb-3 border-b-2 text-xs sm:text-sm font-medium transition-colors ${
                currentStep === 3
                  ? 'border-[#241F1C] text-[#241F1C]'
                  : 'border-[#EAE3DC] text-[#A89E96]'
              }`}
            >
              {t.booking.step3Tab}
            </button>
          </div>
        </div>

        {/* Main Booking Container */}
        <div className="bg-white rounded-3xl border border-[#E8DFD7] shadow-xl overflow-hidden p-6 sm:p-10">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: SERVICE SELECTION */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#F2EBE5]">
                <h3 className="font-serif text-xl sm:text-2xl text-[#241F1C]">
                  {t.booking.step1Title}
                </h3>
                <span className="text-xs text-[#726861]">{t.booking.step1Indicator}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeServices.map((service) => {
                  const isSelected = selectedService?.id === service.id;
                  const displayName = getServiceDisplayName(service);
                  const displayDesc = getServiceDisplayDesc(service);

                  return (
                    <div
                      key={service.id}
                      onClick={() => {
                        setSelectedService(service);
                        setSelectedSlot(null);
                      }}
                      className={`cursor-pointer p-5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#241F1C] bg-[#FAF3EE] shadow-md ring-1 ring-[#241F1C]'
                          : 'border-[#E8DFD7] bg-[#FAF8F5]/60 hover:border-[#D9A592] hover:bg-white'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-lg font-medium text-[#241F1C]">
                            {displayName}
                          </h4>
                          <span className="font-serif font-bold text-lg text-[#241F1C] tabular-nums shrink-0">
                            ${service.price}
                          </span>
                        </div>
                        <p className="text-xs text-[#6E635C] leading-relaxed line-clamp-2">
                          {displayDesc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#EAE3DC] flex items-center justify-between text-xs text-[#726861]">
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#9E6D59]" />
                          <span className="tabular-nums">{service.duration_minutes}</span> {t.services.mins}
                        </span>
                        {isSelected ? (
                          <span className="flex items-center gap-1 text-[#241F1C] font-semibold">
                            <Check className="w-4 h-4 text-[#9E6D59]" /> {language === 'my' ? 'ရွေးချယ်ထားသည်' : 'Selected'}
                          </span>
                        ) : (
                          <span className="text-[#9E6D59]">{language === 'my' ? 'ရွေးမည်' : 'Select'}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-6 border-t border-[#F2EBE5]">
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedService}
                  className="px-6 py-3 text-sm font-medium text-white bg-[#241F1C] hover:bg-[#3B2C24] disabled:opacity-40 transition-colors rounded-xl flex items-center gap-2 shadow-sm"
                >
                  <span>{t.booking.continueToTime}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DATE & TIME SELECTION */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#F2EBE5]">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#241F1C]">
                    {t.booking.step2Title}
                  </h3>
                  <p className="text-xs text-[#726861] mt-0.5">
                    {t.booking.serviceLabel} <span className="font-medium text-[#241F1C]">{selectedService ? getServiceDisplayName(selectedService) : ''}</span> ({selectedService?.duration_minutes} {t.services.mins} · ${selectedService?.price})
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-[#9E6D59] hover:underline"
                >
                  {t.booking.changeService}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Date Picker & Hours Info */}
                <div className="lg:col-span-5 space-y-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#726861]">
                    {t.booking.chooseDate}
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={tomorrowStr}
                      value={selectedDateStr}
                      onChange={(e) => {
                        setSelectedDateStr(e.target.value);
                        setSelectedSlot(null);
                      }}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD0C5] rounded-xl text-sm font-medium text-[#241F1C] focus:outline-none focus:ring-2 focus:ring-[#C69F77] focus:border-transparent transition-all shadow-xs"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF3EE] border border-[#EAE0D6] space-y-2 text-xs text-[#6E635C]">
                    <p className="font-medium text-[#241F1C] flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#9E6D59]" />
                      {t.booking.selectedDay}: {formattedSelectedDate}
                    </p>
                    <p>{t.booking.hoursNote}</p>
                    <p>{t.booking.noticeNote}</p>
                  </div>
                </div>

                {/* Right: Available Slots */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#726861]">
                      {formattedSelectedDate}
                    </label>
                    <span className="text-xs text-[#726861]">
                      {availableSlots.length} {t.booking.openingsCount}
                    </span>
                  </div>

                  {isDateBlocked ? (
                    <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-1">
                      <p className="text-sm font-medium text-amber-900">
                        {t.booking.dateUnavailableTitle}
                      </p>
                      <p className="text-xs text-amber-700">
                        {t.booking.dateUnavailableDesc}
                      </p>
                    </div>
                  ) : availableSlots.length === 0 ? (
                    <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-dashed border-[#DDD0C5] text-center space-y-2">
                      <Clock className="w-6 h-6 text-[#A89E96] mx-auto" />
                      <p className="text-sm font-medium text-[#241F1C]">{t.booking.noSlotsTitle}</p>
                      <p className="text-xs text-[#726861] max-w-xs mx-auto">
                        {t.booking.noSlotsDesc}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto pr-1">
                      {availableSlots.map((slot, index) => {
                        const isSelected = selectedSlot?.startTimeString === slot.startTimeString;
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSelectSlot(slot)}
                            className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                              isSelected
                                ? 'bg-[#241F1C] text-white border-[#241F1C] shadow-sm'
                                : 'bg-[#FAF8F5] text-[#241F1C] border-[#DDD0C5] hover:bg-white hover:border-[#D9A592]'
                            }`}
                          >
                            <span className="tabular-nums font-semibold">{slot.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {selectedSlot && (
                    <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                      <span>{t.booking.selectedTimeLabel}: <strong>{selectedSlot.label}</strong></span>
                      <Check className="w-4 h-4 text-emerald-600" />
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-[#F2EBE5]">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 text-xs font-medium text-[#726861] hover:text-[#241F1C] transition-colors"
                >
                  {t.booking.backToServices}
                </button>

                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={!selectedSlot}
                  className="px-6 py-3 text-sm font-medium text-white bg-[#241F1C] hover:bg-[#3B2C24] disabled:opacity-40 transition-colors rounded-xl flex items-center gap-2 shadow-sm"
                >
                  <span>{t.booking.continueToDetails}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CLIENT DETAILS & CONFIRMATION */}
          {currentStep === 3 && (
            <form onSubmit={handleSubmitBooking} className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#F2EBE5]">
                <h3 className="font-serif text-xl sm:text-2xl text-[#241F1C]">
                  {t.booking.step3Title}
                </h3>
                <span className="text-xs text-[#726861]">{t.booking.step3Indicator}</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form Inputs */}
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#241F1C] mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#9E6D59]" />
                      {t.booking.fullNameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t.booking.fullNamePlaceholder}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD0C5] rounded-xl text-sm text-[#241F1C] placeholder-[#A89E96] focus:outline-none focus:ring-2 focus:ring-[#C69F77] focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#241F1C] mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#9E6D59]" />
                        {t.booking.emailLabel}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="client@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD0C5] rounded-xl text-sm text-[#241F1C] placeholder-[#A89E96] focus:outline-none focus:ring-2 focus:ring-[#C69F77] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#241F1C] mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#9E6D59]" />
                        {t.booking.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+95 9..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD0C5] rounded-xl text-sm text-[#241F1C] placeholder-[#A89E96] focus:outline-none focus:ring-2 focus:ring-[#C69F77] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#241F1C] mb-1.5 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#9E6D59]" />
                      {t.booking.notesLabel}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={t.booking.notesPlaceholder}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD0C5] rounded-xl text-sm text-[#241F1C] placeholder-[#A89E96] focus:outline-none focus:ring-2 focus:ring-[#C69F77] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Live Appointment Summary Card */}
                <div className="lg:col-span-5">
                  <div className="p-6 rounded-2xl bg-[#FAF3EE] border border-[#EAE0D6] space-y-4">
                    <h4 className="font-serif text-lg font-medium text-[#241F1C] pb-2 border-b border-[#E8DFD7]">
                      {t.booking.summaryTitle}
                    </h4>

                    {selectedService && (
                      <div className="space-y-3 text-xs text-[#241F1C]">
                        <div className="flex items-center justify-between">
                          <span className="text-[#726861]">{t.booking.serviceLabel}</span>
                          <span className="font-semibold">{getServiceDisplayName(selectedService)}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[#726861]">{t.booking.durationLabel}</span>
                          <span className="tabular-nums">{selectedService.duration_minutes} {t.services.mins}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[#726861]">{t.booking.dateLabel}</span>
                          <span className="font-semibold">{formattedSelectedDate}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[#726861]">{t.booking.timeSlotLabel}</span>
                          <span className="font-semibold text-[#9E6D59]">{selectedSlot?.label}</span>
                        </div>

                        <div className="pt-3 border-t border-[#E8DFD7] flex items-center justify-between text-sm font-semibold">
                          <span>{t.booking.totalInvestment}</span>
                          <span className="font-serif text-lg tabular-nums">${selectedService.price}</span>
                        </div>
                      </div>
                    )}

                    <div className="pt-2 text-[11px] text-[#726861] leading-relaxed">
                      {t.booking.paymentNote}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-[#F2EBE5]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 text-xs font-medium text-[#726861] hover:text-[#241F1C] transition-colors"
                >
                  {t.booking.backToDateTime}
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 text-sm font-medium text-white bg-[#241F1C] hover:bg-[#3B2C24] disabled:opacity-50 transition-all duration-200 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>{t.booking.submitting}</span>
                  ) : (
                    <>
                      <span>{t.booking.confirmButton}</span>
                      <Check className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Success Modal */}
      <BookingSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        bookingDetails={confirmedBooking}
      />
    </section>
  );
};
