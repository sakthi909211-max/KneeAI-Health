import React, { useState, useEffect } from 'react';
import { Language, ActiveTab, PatientProfile, ThemeMode } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LanguageSelector } from './components/LanguageSelector';
import { WellnessGuide } from './components/WellnessGuide';
import { MonitoringView } from './components/MonitoringView';
import { ExercisesView } from './components/ExercisesView';
import { AssessmentModal } from './components/AssessmentModal';
import { SupportModal } from './components/SupportModal';
import { PatientProfileModal } from './components/PatientProfileModal';
import { Footer } from './components/Footer';

const INITIAL_PROFILE: PatientProfile = {
  name: 'Eleanor Vance',
  age: 46,
  gender: 'Female',
  heightCm: 168,
  weightKg: 64,
  mobileNumber: '+1 (555) 234-8901',
  email: 'eleanor.vance@example.com',
  bloodGroup: 'O+',
  affectedKnee: 'Right Knee',
  activityLevel: 'Lightly Active',
};

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<ActiveTab>('wellness');
  const [isAssessmentOpen, setIsAssessmentOpen] = useState<boolean>(false);
  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Creative Theme State with persistence
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('kneeai_theme') as ThemeMode;
      if (
        saved &&
        ['mineral-slate', 'obsidian-titanium', 'sapphire-midnight', 'nordic-alabaster'].includes(saved)
      ) {
        return saved;
      }
    } catch (e) {}
    return 'mineral-slate';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    try {
      localStorage.setItem('kneeai_theme', currentTheme);
    } catch (e) {}
  }, [currentTheme]);

  // Patient Profile state with localStorage persistence
  const [patientProfile, setPatientProfile] = useState<PatientProfile>(() => {
    try {
      const saved = localStorage.getItem('kneeai_patient_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return INITIAL_PROFILE;
  });

  const handleSaveProfile = (updated: PatientProfile) => {
    setPatientProfile(updated);
    try {
      localStorage.setItem('kneeai_patient_profile', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const handleStartAssessment = () => {
    setIsAssessmentOpen(true);
  };

  const handleLearnMore = () => {
    setActiveTab('wellness');
    const el = document.getElementById('wellness-guide-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      data-theme={currentTheme}
      className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col font-sans selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)] transition-colors duration-300"
    >
      {/* Top App Bar Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'support') {
            setIsSupportOpen(true);
          } else {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenAssessment={handleStartAssessment}
        onOpenSupport={() => setIsSupportOpen(true)}
        patientProfile={patientProfile}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Wellness Guide Screen (Exact replica of user screenshot + rich interactive extensions) */}
        {activeTab === 'wellness' && (
          <div>
            <HeroSection
              currentLanguage={currentLanguage}
              onStartAssessment={handleStartAssessment}
              onLearnMore={handleLearnMore}
            />

            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />

            <WellnessGuide
              currentLanguage={currentLanguage}
              onSelectExercisesTab={() => {
                setActiveTab('exercises');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAssessment={handleStartAssessment}
            />
          </div>
        )}

        {/* Monitoring & Telemetry Screen */}
        {activeTab === 'monitoring' && (
          <div>
            <MonitoringView
              currentLanguage={currentLanguage}
              onOpenAssessment={handleStartAssessment}
              onSelectExercisesTab={() => {
                setActiveTab('exercises');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </div>
        )}

        {/* Exercises & Rehabilitation Regimen Screen */}
        {activeTab === 'exercises' && (
          <div>
            <ExercisesView
              currentLanguage={currentLanguage}
              onOpenAssessment={handleStartAssessment}
            />

            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        currentLanguage={currentLanguage}
        onOpenSupport={() => setIsSupportOpen(true)}
      />

      {/* Patient Profile & Biometrics Modal */}
      {isProfileOpen && (
        <PatientProfileModal
          profile={patientProfile}
          onSaveProfile={handleSaveProfile}
          onClose={() => setIsProfileOpen(false)}
          onOpenAssessment={() => {
            setIsProfileOpen(false);
            setIsAssessmentOpen(true);
          }}
        />
      )}

      {/* Clinical AI Assessment Modal */}
      {isAssessmentOpen && (
        <AssessmentModal
          currentLanguage={currentLanguage}
          patientProfile={patientProfile}
          onSavePatientProfile={handleSaveProfile}
          onClose={() => setIsAssessmentOpen(false)}
          onSelectExercisesTab={() => {
            setIsAssessmentOpen(false);
            setActiveTab('exercises');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Support & Clinical Consult Modal */}
      {isSupportOpen && (
        <SupportModal
          currentLanguage={currentLanguage}
          patientProfile={patientProfile}
          onClose={() => setIsSupportOpen(false)}
        />
      )}
    </div>
  );
}
