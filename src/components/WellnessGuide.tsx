import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import {
  Apple,
  Footprints,
  Dumbbell,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  HeartPulse,
} from 'lucide-react';
import { NutritionModal } from './NutritionModal';
import { HabitsModal } from './HabitsModal';

interface WellnessGuideProps {
  currentLanguage: Language;
  onSelectExercisesTab: () => void;
  onOpenAssessment: () => void;
}

export const WellnessGuide: React.FC<WellnessGuideProps> = ({
  currentLanguage,
  onSelectExercisesTab,
  onOpenAssessment,
}) => {
  const t = translations[currentLanguage];
  const [isNutritionOpen, setIsNutritionOpen] = useState(false);
  const [isHabitsOpen, setIsHabitsOpen] = useState(false);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-20" id="wellness-guide-section">
      {/* Section Header */}
      <div className="flex flex-col gap-3 mb-12">
        <div className="inline-flex items-center gap-2 self-start bg-[var(--bg-elevated)] border border-[var(--border-main)] px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-semibold text-[var(--text-primary)] transition-colors">
          <HeartPulse className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
          <span>Clinical Lifestyle Protocol</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-light text-[var(--text-primary)] tracking-tighter font-editorial transition-colors">
          {t.wellness.title}
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-3xl font-light leading-relaxed transition-colors">
          {t.wellness.description}
        </p>
      </div>

      {/* 3 Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* What to Eat Card */}
        <div
          id="card-what-to-eat"
          className="bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)] rounded-xl p-6 sm:p-7 flex flex-col justify-between h-full transition-all group"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full border border-[var(--border-main)] bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-primary)] group-hover:border-[var(--text-primary)] transition-colors">
                <Apple className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-editorial tracking-wider uppercase">
                {t.wellness.whatToEat.title}
              </h3>
            </div>

            <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed mb-6">
              {t.wellness.whatToEat.desc}
            </p>

            <ul className="flex flex-col gap-3.5 mb-6">
              {t.wellness.whatToEat.points.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5 text-[var(--text-primary)] text-xs font-normal">
                  <CheckCircle2 className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-[var(--border-main)] flex items-center justify-between">
            <button
              onClick={() => setIsNutritionOpen(true)}
              id="btn-view-nutrition-guide"
              className="text-[var(--text-primary)] hover:opacity-80 font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform cursor-pointer"
            >
              <span>Explore Diet Plan</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[9px] uppercase tracking-widest bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-main)] px-2.5 py-0.5 rounded font-medium">Dietary Care</span>
          </div>
        </div>

        {/* What to Do Card */}
        <div
          id="card-what-to-do"
          className="bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)] rounded-xl p-6 sm:p-7 flex flex-col justify-between h-full transition-all group"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full border border-[var(--border-main)] bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-primary)] group-hover:border-[var(--text-primary)] transition-colors">
                <Footprints className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-editorial tracking-wider uppercase">
                {t.wellness.whatToDo.title}
              </h3>
            </div>

            <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed mb-6">
              {t.wellness.whatToDo.desc}
            </p>

            <ul className="flex flex-col gap-3.5 mb-6">
              {t.wellness.whatToDo.points.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5 text-[var(--text-primary)] text-xs font-normal">
                  <CheckCircle2 className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-[var(--border-main)] flex items-center justify-between">
            <button
              onClick={() => setIsHabitsOpen(true)}
              id="btn-view-habits-guide"
              className="text-[var(--text-primary)] hover:opacity-80 font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform cursor-pointer"
            >
              <span>Joint Ergonomics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[9px] uppercase tracking-widest bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-main)] px-2.5 py-0.5 rounded font-medium">Ergonomics</span>
          </div>
        </div>

        {/* Exercises Card */}
        <div
          id="card-exercises"
          className="bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)] rounded-xl p-6 sm:p-7 flex flex-col justify-between h-full transition-all group"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full border border-[var(--border-main)] bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-primary)] group-hover:border-[var(--text-primary)] transition-colors">
                <Dumbbell className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-editorial tracking-wider uppercase">
                {t.wellness.exercises.title}
              </h3>
            </div>

            <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed mb-6">
              {t.wellness.exercises.desc}
            </p>

            <ul className="flex flex-col gap-3.5 mb-6">
              {t.wellness.exercises.points.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5 text-[var(--text-primary)] text-xs font-normal">
                  <CheckCircle2 className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-[var(--border-main)] flex items-center justify-between">
            <button
              onClick={onSelectExercisesTab}
              id="btn-launch-exercises-tab"
              className="text-[var(--text-primary)] hover:opacity-80 font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform cursor-pointer"
            >
              <span>Launch Routines</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[9px] uppercase tracking-widest bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-main)] px-2.5 py-0.5 rounded font-medium">Physical Therapy</span>
          </div>
        </div>
      </div>

      {/* Clinical AI Assessment Banner */}
      <div className="mt-12 bg-[var(--bg-elevated)] border border-[var(--border-main)] rounded-2xl p-6 sm:p-8 text-[var(--text-primary)] flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-[var(--accent-btn)] text-[var(--accent-btn-text)] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            <span>AI Diagnostic Engine</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-light tracking-tighter font-editorial">
            Unsure which protocol fits your knee status?
          </h3>
          <p className="text-[var(--text-secondary)] text-xs sm:text-sm font-light max-w-xl">
            Complete our 2-minute clinical symptom assessment to receive a customized physical therapy roadmap and Range of Motion plan.
          </p>
        </div>
        <button
          onClick={onOpenAssessment}
          id="btn-banner-start-assessment"
          className="bg-[var(--accent-btn)] text-[var(--accent-btn-text)] hover:opacity-90 font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all active:scale-95 whitespace-nowrap cursor-pointer shadow-sm"
        >
          Start Evaluation
        </button>
      </div>

      {/* Modals */}
      {isNutritionOpen && (
        <NutritionModal
          currentLanguage={currentLanguage}
          onClose={() => setIsNutritionOpen(false)}
        />
      )}

      {isHabitsOpen && (
        <HabitsModal
          currentLanguage={currentLanguage}
          onClose={() => setIsHabitsOpen(false)}
        />
      )}
    </section>
  );
};
