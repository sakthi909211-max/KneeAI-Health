export type Language = 'en' | 'ta' | 'hi' | 'te' | 'fr';

export type ThemeMode = 'mineral-slate' | 'obsidian-titanium' | 'sapphire-midnight' | 'nordic-alabaster';

export type ActiveTab = 'wellness' | 'monitoring' | 'exercises' | 'assessment' | 'support';

export interface TranslationContent {
  brandName: string;
  nav: {
    monitoring: string;
    wellnessGuide: string;
    exercises: string;
    support: string;
    getStarted: string;
    assessment: string;
  };
  hero: {
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    startAssessment: string;
    learnMore: string;
    liveBadge: string;
  };
  languageSection: {
    title: string;
    description: string;
    languages: {
      tamil: string;
      hindi: string;
      telugu: string;
      french: string;
      english: string;
    };
  };
  wellness: {
    title: string;
    description: string;
    whatToEat: {
      title: string;
      desc: string;
      points: string[];
    };
    whatToDo: {
      title: string;
      desc: string;
      points: string[];
    };
    exercises: {
      title: string;
      desc: string;
      points: string[];
    };
  };
  monitoring: {
    title: string;
    subtitle: string;
    romTitle: string;
    flexion: string;
    extension: string;
    jointLoad: string;
    complianceStreak: string;
    recoveryScore: string;
    anatomicalExplorer: string;
  };
  exercisesTab: {
    title: string;
    subtitle: string;
    phase1: string;
    phase2: string;
    phase3: string;
    startWorkout: string;
    targetMuscle: string;
    reps: string;
  };
  footer: {
    privacy: string;
    terms: string;
    disclaimer: string;
    contact: string;
    copyright: string;
  };
}

export interface KneeAnatomyPart {
  id: string;
  name: string;
  medicalName: string;
  role: string;
  injuryRisk: string;
  rehabTip: string;
  coords: { x: number; y: number };
}

export interface ExerciseItem {
  id: string;
  name: string;
  phase: 1 | 2 | 3;
  phaseLabel: string;
  category: 'Strengthening' | 'Mobility' | 'Low-Impact' | 'Stability';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationSeconds: number;
  sets: number;
  reps: string;
  targetMuscles: string[];
  description: string;
  instructions: string[];
  precautions: string[];
  icon: string;
}

export interface PatientProfile {
  name: string;
  age: number | '';
  gender: 'Female' | 'Male' | 'Other' | 'Prefer not to say';
  heightCm: number | '';
  weightKg: number | '';
  mobileNumber: string;
  email?: string;
  bloodGroup?: string;
  affectedKnee: 'Left Knee' | 'Right Knee' | 'Bilateral (Both Knees)';
  activityLevel: 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active';
  lastUpdated?: string;
}

export interface AssessmentData {
  patientProfile?: PatientProfile;
  painLevel: number;
  painLocation: string[];
  injuryType: string;
  duration: string;
  symptoms: string[];
  flexionDifficulty: string;
  walkingCapacity: string;
  selectedLanguage: Language;
}

export interface AssessmentResult {
  score: number;
  status: 'Mild Strain' | 'Moderate Inflammation' | 'Significant Joint Stress' | 'Clinical Evaluation Recommended';
  summary: string;
  keyFindings: string[];
  recommendedPhase: number;
  nutritionAdvice: string[];
  movementPrecautions: string[];
  suggestedExercises: string[];
  urgencyLevel: 'Low' | 'Moderate' | 'High';
}
