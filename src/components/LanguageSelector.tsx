import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Languages, CheckCircle2 } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const t = translations[currentLanguage];

  const languageCards: {
    code: Language;
    name: string;
    script: string;
    description: string;
  }[] = [
    {
      code: 'ta',
      name: 'Tamil',
      script: 'தமிழ்',
      description: 'முழங்கால் நலவாழ்வு வழிகாட்டி',
    },
    {
      code: 'hi',
      name: 'Hindi',
      script: 'हिन्दी',
      description: 'घुटना पुनर्वास और कल्याण गाइड',
    },
    {
      code: 'te',
      name: 'Telugu',
      script: 'తెలుగు',
      description: 'మోకాలి సంరక్షణ మార్గదర్శిని',
    },
    {
      code: 'fr',
      name: 'French',
      script: 'Français',
      description: 'Guide clinique et rééducation',
    },
    {
      code: 'en',
      name: 'English',
      script: 'English (US)',
      description: 'Clinical guidelines and exercises',
    },
  ];

  return (
    <section className="bg-[var(--bg-primary)] w-full py-12 md:py-16 border-y border-[var(--border-main)] transition-colors duration-300" id="language-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-2 mb-10 text-center">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[var(--text-muted)]">
            Multilingual Protocols / Vol. 01
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-light text-[var(--text-primary)] tracking-tighter font-editorial">
            {t.languageSection.title}
          </h2>
          <p className="text-sm text-[var(--text-secondary)] font-light max-w-2xl leading-relaxed">
            {t.languageSection.description}
          </p>
        </div>

        {/* Language Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
          {languageCards.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                id={`btn-select-lang-${lang.code}`}
                className={`relative bg-[var(--bg-surface)] border rounded-xl p-5 flex flex-col items-center justify-center gap-2 transition-all duration-200 group text-center cursor-pointer ${
                  isSelected
                    ? 'border-[var(--text-primary)] bg-[var(--bg-elevated)] ring-1 ring-[var(--text-primary)]'
                    : 'border-[var(--border-main)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)]'
                }`}
              >
                {/* Active check icon badge */}
                {isSelected && (
                  <span className="absolute top-2.5 right-2.5 text-[var(--text-primary)]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                )}

                {/* Translate icon */}
                <div
                  className={`w-10 h-10 rounded-full border border-[var(--border-main)] flex items-center justify-center transition-transform group-hover:scale-105 ${
                    isSelected ? 'bg-[var(--accent-btn)] text-[var(--accent-btn-text)]' : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)]'
                  }`}
                >
                  <Languages className="w-4 h-4" />
                </div>

                {/* Language Name */}
                <span className="font-semibold text-xs sm:text-sm text-[var(--text-primary)] mt-1 uppercase tracking-wider">
                  {lang.name}
                </span>

                {/* Native Script */}
                <span className="text-[11px] font-normal text-[var(--text-secondary)]">
                  {lang.script}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
