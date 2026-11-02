import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { useLanguage } from '../../context/LanguageContext';
import { getServiceImage, getServiceFallbackImage } from '../../lib/images';
import { Service } from '../../types';
import { Clock, Check } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceToBook: (service: Service) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const { activeServices } = useSalon();
  const { t, language } = useLanguage();

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F6F1EC] border-t border-b border-[#EAE3DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
          <p className="text-xs uppercase tracking-widest text-[#9E6D59] font-medium">
            {t.services.kicker}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#241F1C] tracking-tight" style={{ textWrap: 'balance' }}>
            {t.services.headline}
          </h2>
          <p className="text-sm sm:text-base text-[#6E635C] leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid (3 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeServices.map((service) => {
            const imageUrl = getServiceImage(service.name);
            const fallbackUrl = getServiceFallbackImage(service.name);

            // Check if there is a Myanmar translation for this service
            const translatedInfo = t.services.serviceNames[service.name];
            const displayName = (language === 'my' && translatedInfo) ? translatedInfo.name : service.name;
            const displayDesc = (language === 'my' && translatedInfo)
              ? translatedInfo.description
              : (service.description || t.services.customServiceFallback);

            return (
              <div
                key={service.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E8DFD7] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Visual Header */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF3EE]">
                  <img
                    src={imageUrl}
                    alt={displayName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== fallbackUrl) {
                        target.src = fallbackUrl;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Clean unboxed duration & price overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs drop-shadow-md">
                    <span className="flex items-center gap-1 font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="tabular-nums">{service.duration_minutes}</span> {t.services.mins}
                    </span>
                    <span className="font-serif text-lg font-semibold tabular-nums bg-[#241F1C]/80 backdrop-blur-sm px-2.5 py-0.5 rounded">
                      ${service.price}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-medium text-[#241F1C] group-hover:text-[#9E6D59] transition-colors">
                      {displayName}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E635C] leading-relaxed line-clamp-3">
                      {displayDesc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#F2EBE5] flex items-center justify-between">
                    <span className="text-xs text-[#726861] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-[#9E6D59]" />
                      {t.services.dedicatedSession}
                    </span>

                    <button
                      onClick={() => onSelectServiceToBook(service)}
                      className="px-4 py-2 text-xs font-semibold text-[#241F1C] hover:text-white bg-[#FAF8F5] hover:bg-[#241F1C] border border-[#DDD0C5] hover:border-[#241F1C] transition-all rounded-md shadow-xs active:scale-95"
                    >
                      {t.services.selectBook}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
