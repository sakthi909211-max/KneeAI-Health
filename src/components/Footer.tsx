import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  currentLanguage: Language;
  onOpenSupport: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLanguage, onOpenSupport }) => {
  const t = translations[currentLanguage];

  return (
    <footer className="bg-[var(--bg-surface)] w-full mt-auto border-t border-[var(--border-main)] transition-colors duration-300" id="main-footer">
      <div className="flex flex-col items-center py-10 sm:py-12 px-4 sm:px-8 w-full gap-6 max-w-7xl mx-auto text-center">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border border-[var(--border-main)] rounded-full flex items-center justify-center text-[8px] font-bold text-[var(--text-primary)] bg-[var(--bg-elevated)]">
            AI
          </div>
          <span className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight font-editorial">
            {t.brandName.toUpperCase()}
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
          <button
            onClick={onOpenSupport}
            className="hover:text-[var(--text-primary)] transition-colors duration-200 cursor-pointer"
            id="footer-link-privacy"
          >
            {t.footer.privacy}
          </button>
          <button
            onClick={onOpenSupport}
            className="hover:text-[var(--text-primary)] transition-colors duration-200 cursor-pointer"
            id="footer-link-terms"
          >
            {t.footer.terms}
          </button>
          <button
            onClick={onOpenSupport}
            className="hover:text-[var(--text-primary)] transition-colors duration-200 cursor-pointer"
            id="footer-link-disclaimer"
          >
            {t.footer.disclaimer}
          </button>
          <button
            onClick={onOpenSupport}
            className="hover:text-[var(--text-primary)] transition-colors duration-200 cursor-pointer text-[var(--text-primary)]"
            id="footer-link-contact"
          >
            {t.footer.contact}
          </button>
        </nav>

        {/* Copyright */}
        <div className="text-xs text-[var(--text-muted)] max-w-xl font-light">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
};
