import React from 'react';
import { Service } from '../../types';
import { useSalon } from '../../context/SalonContext';
import { useLanguage } from '../../context/LanguageContext';
import { CheckCircle2, Calendar, Clock, MapPin, Phone, User, Mail, Sparkles, X } from 'lucide-react';

interface BookingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    fullName: string;
    email: string;
    phone: string;
    date: string;
    slotLabel: string;
    notes?: string;
    service: Service;
  } | null;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  isOpen,
  onClose,
  bookingDetails,
}) => {
  const { businessSettings } = useSalon();
  const { t, language } = useLanguage();

  if (!isOpen || !bookingDetails) return null;

  // Format date nicely
  const [year, month, day] = bookingDetails.date.split('-').map(Number);
  const formattedDate = new Date(year, month - 1, day).toLocaleDateString(language === 'my' ? 'my-MM' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const tr = t.services.serviceNames[bookingDetails.service.name];
  const serviceDisplayName = (language === 'my' && tr) ? tr.name : bookingDetails.service.name;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl border border-[#EAE3DC] shadow-2xl overflow-hidden p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#726861] hover:text-[#241F1C] hover:bg-[#EFE3DA] rounded-full transition-colors"
          aria-label="Close confirmation"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#FAF3EE] border-2 border-[#D9A592] mx-auto flex items-center justify-center text-[#9E6D59] shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <p className="text-xs font-semibold tracking-widest uppercase text-[#9E6D59]">
            {t.successModal.kicker}
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#241F1C]">
            {t.successModal.headline}
          </h3>
          <p className="text-xs sm:text-sm text-[#726861] max-w-md mx-auto">
            {t.successModal.subtitle}
          </p>
        </div>

        {/* Appointment Card Summary */}
        <div className="mt-6 rounded-2xl bg-white border border-[#E8DFD7] p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#F2EBE5]">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#9E6D59] font-medium">{t.successModal.selectedService}</span>
              <h4 className="font-serif text-lg font-medium text-[#241F1C]">{serviceDisplayName}</h4>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#726861]">{bookingDetails.service.duration_minutes} {t.services.mins}</span>
              <p className="font-serif text-lg font-semibold text-[#241F1C] tabular-nums">${bookingDetails.service.price}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#241F1C]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#9E6D59] shrink-0" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#9E6D59] shrink-0" />
              <span>{bookingDetails.slotLabel}</span>
            </div>

            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#9E6D59] shrink-0" />
              <span>{bookingDetails.fullName}</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#9E6D59] shrink-0" />
              <span>{bookingDetails.phone}</span>
            </div>

            <div className="flex items-center gap-2 sm:col-span-2">
              <Mail className="w-4 h-4 text-[#9E6D59] shrink-0" />
              <span className="truncate">{bookingDetails.email}</span>
            </div>

            {bookingDetails.notes && (
              <div className="sm:col-span-2 pt-2 border-t border-[#F2EBE5] text-[11px] text-[#726861]">
                <span className="font-medium text-[#241F1C]">{t.successModal.specialNotes}: </span>
                <span>{bookingDetails.notes}</span>
              </div>
            )}
          </div>
        </div>

        {/* Salon Location & WhatsApp info */}
        <div className="mt-4 p-4 rounded-xl bg-[#FAF3EE] border border-[#EAE0D6] flex items-center justify-between text-xs">
          <div className="space-y-0.5">
            <p className="font-medium text-[#241F1C] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#9E6D59]" />
              {businessSettings.business_name || 'Yarpyae Beauty Salon'}
            </p>
            <p className="text-[#726861]">
              {language === 'my' ? 'အမှတ် ၄၄၊ ရတနာ့ဂူဘုရားလမ်း၊ အမရပူရ' : (businessSettings.business_address || 'No 44, Yadanagu Pagoda Road, Amarapura')} · {businessSettings.business_phone}
            </p>
          </div>
          <Sparkles className="w-5 h-5 text-[#C69F77] shrink-0" />
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onClose}
            className="w-full py-3 text-sm font-medium text-white bg-[#241F1C] hover:bg-[#3B2C24] transition-colors rounded-xl shadow-md text-center"
          >
            {t.successModal.doneButton}
          </button>
        </div>
      </div>
    </div>
  );
};
