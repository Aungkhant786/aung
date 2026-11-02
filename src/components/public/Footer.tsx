import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Phone, Mail, Clock, Sparkles, ShieldCheck } from 'lucide-react';
import { LanguageToggle } from '../common/LanguageToggle';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { businessSettings } = useSalon();
  const { t, language } = useLanguage();

  return (
    <footer id="contact" className="bg-[#241F1C] text-[#FAF8F5] pt-16 pb-12 border-t border-[#3B2C24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#3B2C24] flex items-center justify-center text-[#D9A592]">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="font-serif text-xl sm:text-2xl font-medium tracking-tight">
                {businessSettings.business_name || 'Glow & Glam Beauty Salon & Spa'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A89E96] leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-2 text-xs text-[#D9A592] hover:text-white transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{t.footer.adminLink}</span>
              </button>

              <div className="scale-90 origin-left">
                <LanguageToggle />
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D9A592] font-semibold">
              {t.footer.scheduleTitle}
            </h4>
            <div className="space-y-2 text-xs text-[#D1C7BD]">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#D9A592] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">{t.footer.monSat}</p>
                  <p className="text-[#A89E96]">{t.footer.monSatHours}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-[#D9A592] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">{t.footer.sun}</p>
                  <p className="text-[#A89E96]">{t.footer.sunHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D9A592] font-semibold">
              {t.footer.contactTitle}
            </h4>
            <div className="space-y-2.5 text-xs text-[#D1C7BD]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D9A592] shrink-0 mt-0.5" />
                <span>{language === 'my' ? 'အမှတ် ၄၄၊ ရတနာ့ဂူဘုရားလမ်း၊ အမရပူရ' : (businessSettings.business_address || 'No 44, Yadanagu Pagoda Road, Amarapura')}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D9A592] shrink-0" />
                <span>{businessSettings.business_phone || '+95 9 789 223 344'} {t.footer.callAndWhatsapp}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D9A592] shrink-0" />
                <span>{businessSettings.business_email || 'hello@yarpyaebeautysalon.com'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7E75]">
          <p>© {new Date().getFullYear()} {businessSettings.business_name || 'Yarpyae Beauty Salon'}. {t.footer.rightsReserved}</p>
          <div className="flex items-center gap-6">
            <span>{t.footer.byAppointment}</span>
            <span aria-hidden="true">·</span>
            <span>{language === 'my' ? 'အမရပူရ' : 'Amarapura'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
