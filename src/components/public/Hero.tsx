import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { useLanguage } from '../../context/LanguageContext';
import { SALON_IMAGES } from '../../lib/images';
import { ArrowDown, Clock, MapPin, Phone, Star } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  const { businessSettings } = useSalon();
  const { t, language } = useLanguage();

  return (
    <section id="home" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Desktop Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8">
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#9E6D59] font-medium">
              <span>{t.hero.kicker}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#241F1C] tracking-tight leading-[1.18]" style={{ textWrap: 'balance' }}>
              {t.hero.headline}
            </h1>

            <p className="text-base sm:text-lg text-[#6E635C] leading-relaxed max-w-xl">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onBookClick}
                className="px-7 py-3.5 text-sm font-medium text-white bg-[#241F1C] hover:bg-[#3B2C24] transition-all duration-200 rounded-md shadow-md hover:shadow-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C69F77]"
              >
                {t.hero.scheduleVisit}
              </button>

              <a
                href="#services"
                className="px-6 py-3.5 text-sm font-medium text-[#241F1C] bg-[#EFE3DA]/80 hover:bg-[#EAE0D6] border border-[#DDD0C5] transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C69F77]"
              >
                {t.hero.exploreServices}
              </a>
            </div>

            {/* Quiet testimonial / accreditation */}
            <div className="pt-4 border-t border-[#EAE3DC] flex items-center gap-4">
              <div className="flex items-center text-[#C69F77]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs text-[#726861] tracking-wide">
                {t.hero.ratingText}
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#E8DFD7] aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] bg-[#EAE0D6]">
              <img
                src={SALON_IMAGES.hero}
                alt="Glow and Glam luxury beauty salon interior with arched golden vanity mirrors and serene boucle seating"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#FAF8F5]/90 backdrop-blur-md border border-white/60 shadow-md flex items-center justify-between text-xs text-[#241F1C]">
                <div>
                  <p className="font-serif font-medium text-sm text-[#241F1C]">
                    {t.hero.suiteTitle}
                  </p>
                  <p className="text-[#726861] text-xs">
                    {t.hero.suiteSubtitle}
                  </p>
                </div>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#9E6D59]">
                  {t.hero.reserveNow}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Proof & Info Strip below hero */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-xl bg-white/70 backdrop-blur-sm border border-[#EAE3DC] shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#FAF3EE] border border-[#EAE0D6] flex items-center justify-center text-[#9E6D59] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#726861] uppercase tracking-wider font-medium">{t.hero.locationLabel}</p>
              <p className="text-sm font-semibold text-[#241F1C] truncate">{language === 'my' ? 'အမှတ် ၄၄၊ ရတနာ့ဂူဘုရားလမ်း၊ အမရပူရ' : (businessSettings.business_address || 'No 44, Yadanagu Pagoda Road, Amarapura')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#FAF3EE] border border-[#EAE0D6] flex items-center justify-center text-[#9E6D59] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#726861] uppercase tracking-wider font-medium">{t.hero.hoursLabel}</p>
              <p className="text-sm font-semibold text-[#241F1C] truncate">{t.hero.hoursValue}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#FAF3EE] border border-[#EAE0D6] flex items-center justify-center text-[#9E6D59] shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#726861] uppercase tracking-wider font-medium">{t.hero.phoneLabel}</p>
              <p className="text-sm font-semibold text-[#241F1C] truncate">{businessSettings.business_phone || '+95 9 789 223 344'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#FAF3EE] border border-[#EAE0D6] flex items-center justify-center text-[#9E6D59] shrink-0">
              <ArrowDown className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#726861] uppercase tracking-wider font-medium">{t.hero.bookingLabel}</p>
              <p className="text-sm font-semibold text-[#241F1C] truncate">{t.hero.bookingValue}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
