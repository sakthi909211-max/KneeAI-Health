import React, { useState, useEffect } from 'react';
import { Language, ExerciseItem } from '../types';
import { translations } from '../data/translations';
import { rehabilitationExercises } from '../data/exercisesData';
import {
  Dumbbell,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExercisesViewProps {
  currentLanguage: Language;
  onOpenAssessment: () => void;
}

export const ExercisesView: React.FC<ExercisesViewProps> = ({ currentLanguage, onOpenAssessment }) => {
  const t = translations[currentLanguage];
  const [selectedPhase, setSelectedPhase] = useState<number | 'all'>('all');
  const [activeExercise, setActiveExercise] = useState<ExerciseItem | null>(null);

  // Active workout trainer states
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isActiveTimer, setIsActiveTimer] = useState<boolean>(false);
  const [currentSet, setCurrentSet] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const filteredExercises =
    selectedPhase === 'all'
      ? rehabilitationExercises
      : rehabilitationExercises.filter((ex) => ex.phase === selectedPhase);

  // Timer loop
  useEffect(() => {
    let interval: any = null;
    if (isActiveTimer && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((sec) => sec - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isActiveTimer) {
      setIsActiveTimer(false);
      // If reached 0 and sets remain, prompt next set
      if (activeExercise && currentSet < activeExercise.sets) {
        setCurrentSet((prev) => prev + 1);
        setTimerSeconds(activeExercise.durationSeconds);
      } else {
        setIsCompleted(true);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch (e) {
          // ignore in environments without canvas
        }
      }
    }
    return () => clearInterval(interval);
  }, [isActiveTimer, timerSeconds, currentSet, activeExercise]);

  const handleStartWorkout = (exercise: ExerciseItem) => {
    setActiveExercise(exercise);
    setTimerSeconds(exercise.durationSeconds);
    setCurrentSet(1);
    setIsActiveTimer(true);
    setIsCompleted(false);
  };

  const handleResetTrainer = () => {
    if (activeExercise) {
      setTimerSeconds(activeExercise.durationSeconds);
      setCurrentSet(1);
      setIsActiveTimer(false);
      setIsCompleted(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 md:py-16 space-y-10" id="exercises-view">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-main)] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-[var(--bg-elevated)] border border-[var(--border-main)] text-[var(--text-secondary)] px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-semibold mb-2">
            <Dumbbell className="w-3 h-3 text-[var(--text-secondary)]" />
            <span>Clinical Physiotherapy Regimen</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-[var(--text-primary)] tracking-tighter font-editorial">
            {t.exercisesTab.title}
          </h1>
          <p className="text-sm text-[var(--text-secondary)] font-light mt-1 max-w-2xl">
            {t.exercisesTab.subtitle}
          </p>
        </div>

        <button
          onClick={onOpenAssessment}
          className="bg-[var(--accent-btn)] text-[var(--accent-btn-text)] hover:opacity-90 font-semibold text-xs uppercase tracking-widest px-5 py-2.5 rounded-full transition-all flex items-center gap-1.5 self-start md:self-auto cursor-pointer shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[var(--accent-btn-text)]" />
          <span>Personalize for My Pain Level</span>
        </button>
      </div>

      {/* Phase Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedPhase('all')}
          className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
            selectedPhase === 'all'
              ? 'bg-[var(--accent-btn)] text-[var(--accent-btn-text)] shadow-sm'
              : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-main)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]'
          }`}
        >
          All Protocols ({rehabilitationExercises.length})
        </button>
        <button
          onClick={() => setSelectedPhase(1)}
          className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
            selectedPhase === 1
              ? 'bg-[var(--accent-btn)] text-[var(--accent-btn-text)] shadow-sm'
              : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-main)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]'
          }`}
        >
          {t.exercisesTab.phase1}
        </button>
        <button
          onClick={() => setSelectedPhase(2)}
          className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
            selectedPhase === 2
              ? 'bg-[var(--accent-btn)] text-[var(--accent-btn-text)] shadow-sm'
              : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-main)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]'
          }`}
        >
          {t.exercisesTab.phase2}
        </button>
        <button
          onClick={() => setSelectedPhase(3)}
          className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
            selectedPhase === 3
              ? 'bg-[var(--accent-btn)] text-[var(--accent-btn-text)] shadow-sm'
              : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-main)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]'
          }`}
        >
          {t.exercisesTab.phase3}
        </button>
      </div>

      {/* Interactive Guided Workout Trainer Drawer/Modal if active */}
      {activeExercise && (
        <div className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl p-6 sm:p-8 text-[var(--text-primary)] shadow-2xl animate-in fade-in zoom-in-95 transition-colors">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                Active Guided Routine • {activeExercise.phaseLabel}
              </span>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight font-editorial text-[var(--text-primary)]">{activeExercise.name}</h2>
              <p className="text-[var(--text-secondary)] text-xs font-light max-w-xl">{activeExercise.description}</p>
            </div>

            {/* Timer & Set HUD */}
            <div className="flex items-center gap-6 bg-[var(--bg-elevated)] px-6 py-4 rounded-xl border border-[var(--border-main)]">
              <div className="text-center">
                <span className="text-[9px] text-[var(--text-muted)] uppercase font-bold tracking-widest block">Set Progress</span>
                <span className="text-2xl font-bold text-[var(--text-primary)] font-editorial">
                  {currentSet} / {activeExercise.sets}
                </span>
              </div>

              <div className="h-10 w-px bg-[var(--border-main)]"></div>

              <div className="text-center">
                <span className="text-[9px] text-[var(--text-muted)] uppercase font-bold tracking-widest block">Hold Timer</span>
                <span className="text-3xl font-light text-[var(--text-primary)] font-editorial">{timerSeconds}s</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsActiveTimer(!isActiveTimer)}
                  className="w-10 h-10 rounded-full bg-[var(--accent-btn)] text-[var(--accent-btn-text)] hover:opacity-90 flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-sm"
                >
                  {isActiveTimer ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={handleResetTrainer}
                  className="w-9 h-9 rounded-full bg-[var(--bg-primary)] hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Completion Celebration banner */}
          {isCompleted && (
            <div className="mt-6 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="font-bold text-[var(--text-primary)] block text-sm">Routine Successfully Completed!</span>
                  <span className="text-xs text-[var(--text-secondary)]">Joint compliance credit logged to your weekly tracker.</span>
                </div>
              </div>
              <button
                onClick={() => setActiveExercise(null)}
                className="bg-[var(--accent-btn)] text-[var(--accent-btn-text)] font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full hover:opacity-90 cursor-pointer"
              >
                Close Session
              </button>
            </div>
          )}
        </div>
      )}

      {/* Exercises Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <div
            key={exercise.id}
            id={`exercise-card-${exercise.id}`}
            className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)] p-6 flex flex-col justify-between transition-all group"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-main)] px-2.5 py-0.5 rounded-full">
                  Phase {exercise.phase}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--text-muted)]">
                  {exercise.difficulty}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-editorial tracking-wide mb-2">
                {exercise.name}
              </h3>

              <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed mb-4">
                {exercise.description}
              </p>

              {/* Target Muscles */}
              <div className="mb-4">
                <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider block mb-1.5">
                  Target Muscle Group
                </span>
                <div className="flex flex-wrap gap-1">
                  {exercise.targetMuscles.map((muscle, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] uppercase tracking-wider bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-main)] px-2 py-0.5 rounded font-medium"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Instructions Summary */}
              <div className="space-y-1.5 mb-4 text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] border border-[var(--border-main)] p-3 rounded-xl">
                <span className="font-semibold text-[var(--text-primary)] block mb-1 text-[11px]">Key Movement Cue:</span>
                <p className="line-clamp-2 font-light text-[11px]">{exercise.instructions[2] || exercise.instructions[0]}</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[var(--border-main)] flex items-center justify-between">
              <div className="text-xs">
                <span className="text-[var(--text-muted)] block text-[9px] uppercase tracking-wider">Prescribed</span>
                <span className="font-bold text-[var(--text-primary)] text-xs">{exercise.reps}</span>
              </div>

              <button
                onClick={() => handleStartWorkout(exercise)}
                className="bg-[var(--accent-btn)] text-[var(--accent-btn-text)] hover:opacity-90 font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full transition-colors flex items-center gap-1 cursor-pointer shadow-sm"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Start Trainer</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
