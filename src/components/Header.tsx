import React, { useState } from 'react';
import { Language, ActiveTab, PatientProfile, ThemeMode } from '../types';
import { translations } from '../data/translations';
import {
  Globe,
  User,
  Menu,
  X,
  Activity,
  BookOpen,
  Dumbbell,
  LifeBuoy,
  Sparkles,
  Check,
  Palette,
  SunMedium,
  Moon,
  Compass,
} from 'lucide-react';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenAssessment: () => void;
  onOpenSupport: () => void;
  patientProfile?: PatientProfile;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  currentTheme,
  onThemeChange,
  activeTab,
  onSelectTab,
  onOpenAssessment,
  onOpenSupport,
  patientProfile,
  onOpenProfile,
}) => {
  const t = translations[currentLanguage];
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languagesList: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'fr', label: 'French', native: 'Français' },
  ];

  const themesList: {
    id: ThemeMode;
    name: string;
    label: string;
    swatchBg: string;
    swatchAccent: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'mineral-slate',
      name: 'Mineral Slate',
      label: 'Nordic Biometrics (Sage & Slate)',
      swatchBg: '#070B0E',
      swatchAccent: '#14B8A6',
      icon: <Compass className="w-3.5 h-3.5" />,
    },
    {
      id: 'obsidian-titanium',
      name: 'Obsidian Lux',
      label: 'Editorial Carbon & Titanium',
      swatchBg: '#09090B',
      swatchAccent: '#FFFFFF',
      icon: <Moon className="w-3.5 h-3.5" />,
    },
    {
      id: 'sapphire-midnight',
      name: 'Sapphire Deep',
      label: 'Surgical Polar Cyan & Deep Sea',
      swatchBg: '#060B12',
      swatchAccent: '#38BDF8',
      icon: <Sparkles className="w-3.5 h-3.5" />,
    },
    {
      id: 'nordic-alabaster',
      name: 'Nordic Alabaster',
      label: 'Clinical Daylight Porcelain',
      swatchBg: '#F4F6F9',
      swatchAccent: '#0F172A',
      icon: <SunMedium className="w-3.5 h-3.5" />,
    },
  ];

  const handleTabClick = (tab: ActiveTab) => {
    onSelectTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-[var(--bg-primary)]/90 border-b border-[var(--border-main)] sticky top-0 z-50 backdrop-blur-md transition-colors duration-300">
      <div className="flex justify-between items-center w-full px-4 sm:px-8 max-w-7xl mx-auto h-20">
        {/* Brand Logo */}
        <button
          onClick={() => onSelectTab('wellness')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          id="btn-brand-logo"
        >
          <div className="w-9 h-9 border border-[var(--border-main)] rounded-full flex items-center justify-center text-[10px] font-bold text-[var(--text-primary)] bg-[var(--bg-elevated)] group-hover:border-[var(--text-primary)] transition-all">
            AI
          </div>
          <div>
            <span className="text-xl font-bold text-[var(--text-primary)] tracking-tighter block font-editorial">
              {t.brandName.toUpperCase()}
            </span>
            <span className="text-[9px] uppercase font-medium text-[var(--text-muted)] tracking-[0.25em] block -mt-0.5">
              Clinical Archive / Vol. 01
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 h-full items-center">
          <button
            onClick={() => handleTabClick('monitoring')}
            id="nav-monitoring"
            className={`transition-all flex items-center h-full px-1 text-[11px] uppercase tracking-[0.2em] font-medium relative ${
              activeTab === 'monitoring'
                ? 'text-[var(--text-primary)] font-bold border-b-2 border-[var(--text-primary)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Activity className="w-3.5 h-3.5 mr-1.5 opacity-70" />
            {t.nav.monitoring}
          </button>

          <button
            onClick={() => handleTabClick('wellness')}
            id="nav-wellness"
            className={`transition-all flex items-center h-full px-1 text-[11px] uppercase tracking-[0.2em] font-medium relative ${
              activeTab === 'wellness'
                ? 'text-[var(--text-primary)] font-bold border-b-2 border-[var(--text-primary)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 mr-1.5 opacity-70" />
            {t.nav.wellnessGuide}
          </button>

          <button
            onClick={() => handleTabClick('exercises')}
            id="nav-exercises"
            className={`transition-all flex items-center h-full px-1 text-[11px] uppercase tracking-[0.2em] font-medium relative ${
              activeTab === 'exercises'
                ? 'text-[var(--text-primary)] font-bold border-b-2 border-[var(--text-primary)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5 mr-1.5 opacity-70" />
            {t.nav.exercises}
          </button>

          <button
            onClick={() => handleTabClick('support')}
            id="nav-support"
            className={`transition-all flex items-center h-full px-1 text-[11px] uppercase tracking-[0.2em] font-medium relative ${
              activeTab === 'support'
                ? 'text-[var(--text-primary)] font-bold border-b-2 border-[var(--text-primary)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <LifeBuoy className="w-3.5 h-3.5 mr-1.5 opacity-70" />
            {t.nav.support}
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Creative Theme Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsThemeMenuOpen(!isThemeMenuOpen);
                setIsLangMenuOpen(false);
              }}
              id="btn-theme-selector"
              aria-label="Select Creative Theme & Palette"
              title="Creative Themes & Color Palettes"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] border border-[var(--border-main)] transition-all flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full relative cursor-pointer"
            >
              <Palette className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              <span
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-[var(--bg-primary)]"
                style={{
                  backgroundColor:
                    currentTheme === 'mineral-slate'
                      ? '#14B8A6'
                      : currentTheme === 'sapphire-midnight'
                      ? '#38BDF8'
                      : currentTheme === 'nordic-alabaster'
                      ? '#0F172A'
                      : '#FFFFFF',
                }}
              ></span>
            </button>

            {isThemeMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-[var(--bg-surface)] rounded-xl shadow-2xl border border-[var(--border-main)] py-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-left"
                id="theme-dropdown-menu"
              >
                <div className="px-4 py-2 border-b border-[var(--border-main)] flex items-center justify-between text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-widest">
                  <span>Color Theme & Palette</span>
                  <Palette className="w-3.5 h-3.5 opacity-70" />
                </div>
                <div className="p-1 space-y-1">
                  {themesList.map((thm) => {
                    const isSelected = currentTheme === thm.id;
                    return (
                      <button
                        key={thm.id}
                        onClick={() => {
                          onThemeChange(thm.id);
                          setIsThemeMenuOpen(false);
                        }}
                        id={`theme-opt-${thm.id}`}
                        className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold border border-[var(--border-main)]'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {/* Mini Dual Color Swatch */}
                          <div
                            className="w-4 h-4 rounded-full border border-[var(--border-subtle)] flex items-center justify-center overflow-hidden shrink-0 shadow-inner"
                            style={{ backgroundColor: thm.swatchBg }}
                          >
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: thm.swatchAccent }}
                            ></div>
                          </div>
                          <div>
                            <span className="text-xs font-semibold block leading-snug">{thm.name}</span>
                            <span className="text-[10px] text-[var(--text-muted)] font-normal block leading-none mt-0.5">
                              {thm.label}
                            </span>
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[var(--text-primary)] shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsLangMenuOpen(!isLangMenuOpen);
                setIsThemeMenuOpen(false);
              }}
              id="btn-language-selector"
              aria-label="Select Language"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] border border-[var(--border-main)] transition-colors flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full relative cursor-pointer"
            >
              <Globe className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              <span className="absolute -bottom-1 -right-1 bg-[var(--accent-btn)] text-[var(--accent-btn-text)] text-[8px] font-bold px-1 rounded-full uppercase tracking-tight shadow-sm">
                {currentLanguage}
              </span>
            </button>

            {isLangMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-52 bg-[var(--bg-surface)] rounded-xl shadow-2xl border border-[var(--border-main)] py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                id="lang-dropdown-menu"
              >
                <div className="px-4 py-2 border-b border-[var(--border-main)] text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-widest">
                  Language / Idiom
                </div>
                {languagesList.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    id={`lang-opt-${lang.code}`}
                    className={`w-full text-left px-4 py-2.5 flex items-center justify-between text-xs transition-colors cursor-pointer ${
                      currentLanguage === lang.code
                        ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <span>{lang.native}</span>
                    {currentLanguage === lang.code && (
                      <Check className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Patient Profile / Medical Record Trigger */}
          <button
            onClick={onOpenProfile}
            id="btn-profile"
            aria-label="Patient Profile & Biometrics"
            title="Patient Profile & Biometrics"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] border border-[var(--border-main)] transition-all flex items-center gap-2 h-9 sm:h-10 px-2.5 sm:px-3 rounded-full cursor-pointer group"
          >
            <div className="w-5 h-5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] group-hover:border-[var(--text-primary)] transition-colors">
              <User className="w-3 h-3" />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-[10px] font-bold text-[var(--text-primary)] tracking-wider uppercase leading-none">
                {patientProfile?.name ? patientProfile.name.split(' ')[0] : 'Patient'}
              </span>
              <span className="text-[8px] text-[var(--text-muted)] tracking-tight leading-none mt-0.5">
                {patientProfile?.age ? `${patientProfile.age}y` : 'Intake'} • {patientProfile?.weightKg ? `${patientProfile.weightKg}kg` : 'Bio'}
              </span>
            </div>
          </button>

          {/* Get Started / Assessment CTA */}
          <button
            onClick={onOpenAssessment}
            id="btn-get-started"
            className="bg-[var(--accent-btn)] text-[var(--accent-btn-text)] hover:opacity-90 font-semibold text-xs uppercase tracking-widest px-4 sm:px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-btn-text)]" />
            <span>{t.nav.getStarted}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            id="btn-mobile-menu-toggle"
            aria-label="Open Navigation Menu"
            className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)] p-2 rounded-full cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-primary)] border-b border-[var(--border-main)] px-6 py-4 space-y-2">
          {/* Patient Profile Mobile Card */}
          <button
            onClick={() => {
              onOpenProfile();
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left py-2.5 px-3 rounded-lg text-xs uppercase tracking-widest flex items-center justify-between bg-[var(--bg-elevated)] border border-[var(--border-main)] text-[var(--text-primary)] font-bold cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[var(--text-muted)]" />
              <span>{patientProfile?.name || 'Patient Profile & Biometrics'}</span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)] font-light">
              {patientProfile?.age ? `${patientProfile.age}y / ${patientProfile.weightKg}kg` : 'Edit'}
            </span>
          </button>

          {/* Mobile Theme Selector Strip */}
          <div className="py-2 border-y border-[var(--border-main)]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)] block mb-2">
              Theme Palette
            </span>
            <div className="grid grid-cols-2 gap-2">
              {themesList.map((thm) => (
                <button
                  key={thm.id}
                  onClick={() => onThemeChange(thm.id)}
                  className={`px-3 py-2 rounded-lg text-[11px] font-semibold flex items-center gap-2 border cursor-pointer ${
                    currentTheme === thm.id
                      ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)]'
                      : 'border-[var(--border-main)] text-[var(--text-secondary)]'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: thm.swatchAccent }}
                  ></span>
                  <span>{thm.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleTabClick('monitoring')}
            className={`w-full text-left py-2.5 px-3 rounded-lg text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer ${
              activeTab === 'monitoring'
                ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold'
                : 'text-[var(--text-secondary)]'
            }`}
          >
            <Activity className="w-4 h-4" />
            {t.nav.monitoring}
          </button>
          <button
            onClick={() => handleTabClick('wellness')}
            className={`w-full text-left py-2.5 px-3 rounded-lg text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer ${
              activeTab === 'wellness'
                ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold'
                : 'text-[var(--text-secondary)]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            {t.nav.wellnessGuide}
          </button>
          <button
            onClick={() => handleTabClick('exercises')}
            className={`w-full text-left py-2.5 px-3 rounded-lg text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer ${
              activeTab === 'exercises'
                ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold'
                : 'text-[var(--text-secondary)]'
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            {t.nav.exercises}
          </button>
          <button
            onClick={() => handleTabClick('support')}
            className={`w-full text-left py-2.5 px-3 rounded-lg text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer ${
              activeTab === 'support'
                ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold'
                : 'text-[var(--text-secondary)]'
            }`}
          >
            <LifeBuoy className="w-4 h-4" />
            {t.nav.support}
          </button>
        </div>
      )}
    </header>
  );
};
