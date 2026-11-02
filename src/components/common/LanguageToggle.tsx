import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  variant?: 'navbar' | 'compact' | 'footer' | 'admin';
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ variant = 'navbar' }) => {
  const { language, setLanguage } = useLanguage();

  if (variant === 'admin') {
    return (
      <div className="inline-flex items-center p-0.5 rounded-lg bg-[#342D28] border border-white/10 text-xs">
        <button
          onClick={() => setLanguage('en')}
          className={`px-2.5 py-1 rounded-md font-medium transition-all ${
            language === 'en'
              ? 'bg-[#FAF8F5] text-[#241F1C] shadow-xs'
              : 'text-[#D1C7BD] hover:text-white'
          }`}
        >
          ENG
        </button>
        <button
          onClick={() => setLanguage('my')}
          className={`px-2.5 py-1 rounded-md font-medium transition-all ${
            language === 'my'
              ? 'bg-[#FAF8F5] text-[#241F1C] shadow-xs'
              : 'text-[#D1C7BD] hover:text-white'
          }`}
        >
          မြန်မာ
        </button>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 bg-[#EFE3DA]/60 hover:bg-[#EAE0D6] border border-[#DDD0C5] p-1 rounded-full text-xs transition-colors">
      <div className="pl-1.5 text-[#9E6D59]">
        <Globe className="w-3.5 h-3.5" />
      </div>

      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
            language === 'en'
              ? 'bg-[#241F1C] text-white shadow-xs'
              : 'text-[#726861] hover:text-[#241F1C]'
          }`}
          aria-label="Switch to English"
        >
          ENG
        </button>

        <button
          type="button"
          onClick={() => setLanguage('my')}
          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
            language === 'my'
              ? 'bg-[#241F1C] text-white shadow-xs'
              : 'text-[#726861] hover:text-[#241F1C]'
          }`}
          aria-label="မြန်မာဘာသာသို့ ပြောင်းရန်"
        >
          မြန်မာ
        </button>
      </div>
    </div>
  );
};
