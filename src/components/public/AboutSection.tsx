import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { useLanguage } from '../../context/LanguageContext';
import { SALON_IMAGES } from '../../lib/images';
import { ShieldCheck, Heart, Sparkles, Feather } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { businessSettings } = useSalon();
  const { t, language } = useLanguage();

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual Container */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#E8DFD7] shadow-xl aspect-[4/3] bg-[#EAE0D6]">
              <img
                src={SALON_IMAGES.about}
                alt="Glow and Glam Beauty Salon reception lounge with natural travertine counter and warm minimalist arches"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#EAE3DC] shadow-sm">
                <p className="font-serif text-sm font-semibold text-[#241F1C]">
                  {businessSettings.business_name || 'Glow & Glam Beauty Salon & Spa'}
                </p>
                <p className="text-xs text-[#726861] mt-0.5">
                  {language === 'my' ? 'စမ်းချောင်းမြို့နယ်၏ အေးချမ်းသော အချက်အချာနေရာတွင် တည်ရှိပါသည်။' : 'Located in the tranquil center of Sanchaung, Yangon.'}
                </p>
              </div>
            </div>

            {/* Subtle decorative architectural stamp */}
            <div className="hidden sm:block absolute -top-5 -left-5 p-4 rounded-xl bg-[#FAF3EE] border border-[#E8DFD7] shadow-md max-w-[200px]">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#9E6D59]">
                <Sparkles className="w-4 h-4" />
                <span>{t.about.stampTitle}</span>
              </div>
              <p className="text-[11px] text-[#726861] mt-1">
                {t.about.stampDesc}
              </p>
            </div>
          </div>

          {/* Right Text Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-[#9E6D59] font-medium">
                {t.about.kicker}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#241F1C] tracking-tight leading-tight" style={{ textWrap: 'balance' }}>
                {t.about.headline}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#6E635C] leading-relaxed">
              {t.about.p1}
            </p>

            <p className="text-sm sm:text-base text-[#6E635C] leading-relaxed">
              {t.about.p2}
            </p>

            {/* 4 Pillars of Excellence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F6F1EC] border border-[#EAE3DC]">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#9E6D59] shrink-0 shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#241F1C]">{t.about.pillar1Title}</h4>
                  <p className="text-[11px] text-[#726861] mt-0.5">{t.about.pillar1Desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F6F1EC] border border-[#EAE3DC]">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#9E6D59] shrink-0 shadow-xs">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#241F1C]">{t.about.pillar2Title}</h4>
                  <p className="text-[11px] text-[#726861] mt-0.5">{t.about.pillar2Desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F6F1EC] border border-[#EAE3DC]">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#9E6D59] shrink-0 shadow-xs">
                  <Feather className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#241F1C]">{t.about.pillar3Title}</h4>
                  <p className="text-[11px] text-[#726861] mt-0.5">{t.about.pillar3Desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F6F1EC] border border-[#EAE3DC]">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#9E6D59] shrink-0 shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#241F1C]">{t.about.pillar4Title}</h4>
                  <p className="text-[11px] text-[#726861] mt-0.5">{t.about.pillar4Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
