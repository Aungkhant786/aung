import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { LanguageToggle } from '../common/LanguageToggle';

interface NavbarProps {
  onOpenAdmin: () => void;
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onBookClick }) => {
  const { businessSettings, isAdmin } = useSalon();
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3DC] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6 sm:gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#home"
          className="group flex items-center gap-2.5 text-[#241F1C] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C69F77] rounded"
        >
          <span className="w-8 h-8 rounded-full bg-[#EFE3DA] flex items-center justify-center text-[#9E6D59] group-hover:bg-[#E8D4C8] transition-colors">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="font-serif text-lg sm:text-2xl font-medium tracking-tight">
            {businessSettings.business_name || 'Glow & Glam Beauty Salon & Spa'}
          </span>
        </a>

        {/* Zone 2: Clean 4-5 Navigation Links (single line, no pill enclosures) */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#726861]">
          <a
            href="#services"
            className="hover:text-[#241F1C] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#D9A592]"
          >
            {t.nav.services}
          </a>
          <a
            href="#about"
            className="hover:text-[#241F1C] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#D9A592]"
          >
            {t.nav.about}
          </a>
          <a
            href="#experience"
            className="hover:text-[#241F1C] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#D9A592]"
          >
            {t.nav.experience}
          </a>
          <a
            href="#contact"
            className="hover:text-[#241F1C] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#D9A592]"
          >
            {t.nav.contact}
          </a>
        </nav>

        {/* Zone 3: Language Switcher + Primary Action + Discreet Admin Link */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Language Switcher Button (Myanmar / English) */}
          <LanguageToggle />

          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 text-xs text-[#726861] hover:text-[#241F1C] transition-colors px-2 py-1.5 rounded hover:bg-[#EFE3DA]/60 focus-visible:ring-2 focus-visible:ring-[#C69F77]"
            title={isAdmin ? t.nav.adminDashboard : t.nav.adminPortal}
          >
            <ShieldCheck className="w-4 h-4 text-[#9E6D59]" />
            <span className="hidden xl:inline">{isAdmin ? t.nav.adminDashboard : t.nav.adminPortal}</span>
          </button>

          <button
            onClick={onBookClick}
            className="px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#241F1C] hover:bg-[#3B2C24] transition-all duration-200 rounded-md shadow-sm hover:shadow active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C69F77]"
          >
            {t.nav.bookNow}
          </button>
        </div>
      </div>
    </header>
  );
};
