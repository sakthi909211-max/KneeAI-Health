import React, { useState } from 'react';
import { Language, AssessmentData, AssessmentResult, PatientProfile } from '../types';
import { translations } from '../data/translations';
import {
  X,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Apple,
  Dumbbell,
  Shield,
  FileText,
  Printer,
  RefreshCw,
  HelpCircle,
  User,
  Phone,
  Scale,
  Ruler,
  HeartPulse,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AssessmentModalProps {
  currentLanguage: Language;
  onClose: () => void;
  onSelectExercisesTab: () => void;
  patientProfile?: PatientProfile;
  onSavePatientProfile?: (profile: PatientProfile) => void;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  currentLanguage,
  onClose,
  onSelectExercisesTab,
  patientProfile,
  onSavePatientProfile,
}) => {
  const t = translations[currentLanguage];
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Patient Profile Intake State
  const [patientData, setPatientData] = useState<PatientProfile>(
    patientProfile || {
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
    }
  );

  // Form State
  const [painLevel, setPainLevel] = useState<number>(4);
  const [painLocations, setPainLocations] = useState<string[]>(['Anterior (Kneecap/Patella)']);
  const [injuryType, setInjuryType] = useState<string>('Gradual Ache / Cartilage Wear');
  const [duration, setDuration] = useState<string>('2 - 6 Weeks');
  const [symptoms, setSymptoms] = useState<string[]>(['Morning stiffness']);
  const [flexionDifficulty, setFlexionDifficulty] = useState<string>('Mild stiffness past 90 degrees');
  const [walkingCapacity, setWalkingCapacity] = useState<string>('15 - 30 minutes before discomfort');

  // Result state
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  // Calculated metrics
  const bmi =
    patientData.weightKg && patientData.heightCm
      ? Math.round((Number(patientData.weightKg) / Math.pow(Number(patientData.heightCm) / 100, 2)) * 10) / 10
      : 22.7;
  const jointLoadKg = patientData.weightKg ? Number(patientData.weightKg) * 4 : 256;

  const painLocationOptions = [
    'Anterior (Kneecap/Patella)',
    'Medial (Inner joint line)',
    'Lateral (Outer side)',
    'Posterior (Back of the knee/Popliteal)',
    'Diffuse (Generalized all over)',
  ];

  const symptomOptions = [
    { id: 'swelling', label: 'Visible Joint Swelling (Effusion / Fluid)' },
    { id: 'giving_way', label: 'Joint Giving Way / Buckling Instability' },
    { id: 'clicking', label: 'Clicking, Popping, or Grinding (Crepitus)' },
    { id: 'morning_stiffness', label: 'Morning Stiffness lasting >30 minutes' },
    { id: 'stairs_pain', label: 'Sharp pain while descending stairs' },
    { id: 'locking', label: 'Inability to fully straighten or bend (Locking)' },
  ];

  const handleToggleLocation = (loc: string) => {
    if (painLocations.includes(loc)) {
      setPainLocations(painLocations.filter((l) => l !== loc));
    } else {
      setPainLocations([...painLocations, loc]);
    }
  };

  const handleToggleSymptom = (sym: string) => {
    if (symptoms.includes(sym)) {
      setSymptoms(symptoms.filter((s) => s !== sym));
    } else {
      setSymptoms([...symptoms, sym]);
    }
  };

  const runClinicalAssessment = async () => {
    setIsLoading(true);

    if (onSavePatientProfile) {
      onSavePatientProfile(patientData);
    }

    const payload: AssessmentData = {
      patientProfile: patientData,
      painLevel,
      painLocation: painLocations,
      injuryType,
      duration,
      symptoms,
      flexionDifficulty,
      walkingCapacity,
      selectedLanguage: currentLanguage,
    };

    try {
      // Call backend API endpoint
      const response = await fetch('/api/assess-knee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setAssessmentResult(data.result);
      } else {
        // Fallback rule engine if server is unreachable
        generateLocalClinicalAssessment();
      }
    } catch (err) {
      generateLocalClinicalAssessment();
    } finally {
      setIsLoading(false);
      setStep(4);
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
      } catch (e) {}
    }
  };

  const generateLocalClinicalAssessment = () => {
    // Evidence-based physical therapy heuristic algorithm
    let calculatedScore = Math.max(20, 100 - painLevel * 7 - symptoms.length * 5);
    let status: AssessmentResult['status'] = 'Mild Strain';
    let urgency: AssessmentResult['urgencyLevel'] = 'Low';
    let phase = 2;

    if (painLevel >= 7 || symptoms.includes('Inability to fully straighten or bend (Locking)')) {
      status = 'Clinical Evaluation Recommended';
      urgency = 'High';
      phase = 1;
    } else if (painLevel >= 5 || symptoms.includes('Visible Joint Swelling (Effusion / Fluid)')) {
      status = 'Moderate Inflammation';
      urgency = 'Moderate';
      phase = 1;
    } else if (painLevel >= 3) {
      status = 'Significant Joint Stress';
      urgency = 'Moderate';
      phase = 2;
    } else {
      status = 'Mild Strain';
      urgency = 'Low';
      phase = 3;
    }

    setAssessmentResult({
      score: calculatedScore,
      status,
      summary: `Clinical evaluation prepared for patient ${patientData.name || 'Patient'} (${patientData.age || '—'} yrs, BMI: ${bmi} kg/m²). Based on reported ${painLevel}/10 pain in the ${patientData.affectedKnee} (${painLocations.join(', ')}) over ${duration}, the presentation indicates ${status.toLowerCase()}. With a 4:1 compression force of ~${jointLoadKg} kg per step, conservative joint offloading and targeted isometric stability are indicated.`,
      keyFindings: [
        `Patient: ${patientData.name || 'Patient'} | Age: ${patientData.age || '—'} | Mobile: ${patientData.mobileNumber || '—'}`,
        `Biometric Load: BMI ${bmi} kg/m² (~${jointLoadKg} kg kinetic compression per stride on ${patientData.affectedKnee}).`,
        `Joint irritation localized to ${painLocations[0] || 'patellofemoral region'}.`,
        symptoms.includes('Visible Joint Swelling (Effusion / Fluid)')
          ? 'Active joint effusion detected — limit deep weighted flexion.'
          : 'Low effusion — focus on progressive isometric quad loading.',
        `Optimal starting protocol: Rehabilitation Phase ${phase}.`,
      ],
      recommendedPhase: phase,
      nutritionAdvice: [
        'Prioritize 2.5g daily Omega-3 fatty acids (salmon, chia seeds, walnut oil) to downregulate inflammation.',
        'Target daily hydration of minimum 2.5 - 3.0L water to replenish synovial fluid cushioning.',
        'Incorporate 1/2 tsp ground turmeric with black pepper to downregulate NF-kB inflammatory cascades.',
      ],
      movementPrecautions: [
        'Avoid deep loaded squats beyond 90 degrees until terminal extension stiffness subsides.',
        'Wear supportive footwear with cushioned EVA midsole (avoid unsupportive flat slippers/heels).',
        'If sharp acute pain exceeds 5/10 during exercise, discontinue immediately and apply cryotherapy for 15 min.',
      ],
      suggestedExercises:
        phase === 1
          ? ['Supine Quad Sets', 'Straight Leg Raise (SLR)', 'Ankle Pumps with Elevation', 'Gentle Heel Slides']
          : phase === 2
          ? ['Seated Terminal Knee Extensions (TKE)', 'Glute Bridge Holds', 'Standing Calf Raises', 'Wall Sits (45°)']
          : ['Step-Ups on Low Box', 'Single-Leg Balance Stance', 'Mini Squats with Resistance Band', 'Stationary Cycling'],
      urgencyLevel: urgency,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-[#111111] rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#262626] overflow-hidden text-[#E5E5E5]"
        id="modal-clinical-assessment"
      >
        {/* Header */}
        <div className="bg-[#161616] px-6 py-5 border-b border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0D0D0D] border border-[#262626] text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-light tracking-tight font-editorial text-white">Clinical Knee AI Diagnostic</h3>
              <p className="text-xs text-[#888888] font-light">Evidence-based symptom analysis & customized rehabilitation prescription</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#888888] hover:text-white p-2 rounded-full hover:bg-[#262626] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="px-6 py-3 bg-[#0D0D0D] border-b border-[#262626] flex items-center justify-between text-xs font-light">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white uppercase tracking-wider text-[10px]">Step {step} of 3</span>
              <span className="text-[#444444]">•</span>
              <span className="text-[#888888] text-xs">
                {step === 1 && 'Patient Details (Name, Age, Height, Weight, Mobile)'}
                {step === 2 && 'Pain Intensity & Anatomical Location'}
                {step === 3 && 'Mechanism, Duration & Joint Symptoms'}
              </span>
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-6 h-1.5 rounded-full transition-all ${
                    step >= i ? 'bg-white' : 'bg-[#262626]'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="p-6 overflow-y-auto flex-1 text-sm space-y-6">
          {/* STEP 1: PATIENT DEMOGRAPHICS & INTAKE */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in" id="step-patient-details-intake">
              <div className="border-b border-[#262626] pb-3">
                <h4 className="font-light text-lg text-white font-editorial">
                  Patient Intake & Biometric Details
                </h4>
                <p className="text-xs text-[#888888] font-light mt-0.5">
                  Verify or enter your physical parameters for accurate kinetic force and rehabilitation calculations:
                </p>
              </div>

              {/* Live Biometric Telemetry Chip */}
              <div className="bg-[#161616] p-4 rounded-xl border border-[#262626] grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-[#0D0D0D] p-2.5 rounded-lg border border-[#262626]">
                  <span className="text-[9px] uppercase tracking-wider text-[#666666] font-bold block">Patient Name</span>
                  <span className="text-xs font-semibold text-white truncate block mt-0.5">{patientData.name || '—'}</span>
                </div>
                <div className="bg-[#0D0D0D] p-2.5 rounded-lg border border-[#262626]">
                  <span className="text-[9px] uppercase tracking-wider text-[#666666] font-bold block">Age / Gender</span>
                  <span className="text-xs font-semibold text-white block mt-0.5">{patientData.age ? `${patientData.age} yrs` : '—'}</span>
                </div>
                <div className="bg-[#0D0D0D] p-2.5 rounded-lg border border-[#262626]">
                  <span className="text-[9px] uppercase tracking-wider text-[#666666] font-bold block">Calculated BMI</span>
                  <span className="text-xs font-semibold text-white block mt-0.5">{bmi} kg/m²</span>
                </div>
                <div className="bg-[#0D0D0D] p-2.5 rounded-lg border border-[#262626]">
                  <span className="text-[9px] uppercase tracking-wider text-[#666666] font-bold block">Knee Force / Step</span>
                  <span className="text-xs font-semibold text-white block mt-0.5">~{jointLoadKg} kg</span>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#AAAAAA] font-medium block mb-1.5">
                    Patient Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={patientData.name}
                    onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                    placeholder="e.g., Eleanor Vance"
                    className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#262626] rounded-lg text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors text-xs"
                    id="modal-input-patient-name"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#AAAAAA] font-medium block mb-1.5">
                    Mobile Number <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={patientData.mobileNumber}
                    onChange={(e) => setPatientData({ ...patientData, mobileNumber: e.target.value })}
                    placeholder="e.g., +1 (555) 234-8901"
                    className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#262626] rounded-lg text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors text-xs"
                    id="modal-input-patient-mobile"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#AAAAAA] font-medium block mb-1.5">
                    Age (Years) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="120"
                    value={patientData.age}
                    onChange={(e) =>
                      setPatientData({
                        ...patientData,
                        age: e.target.value === '' ? '' : Number(e.target.value),
                      })
                    }
                    placeholder="e.g., 46"
                    className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#262626] rounded-lg text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors text-xs"
                    id="modal-input-patient-age"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#AAAAAA] font-medium block mb-1.5">
                    Height (cm) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="50"
                    max="250"
                    value={patientData.heightCm}
                    onChange={(e) =>
                      setPatientData({
                        ...patientData,
                        heightCm: e.target.value === '' ? '' : Number(e.target.value),
                      })
                    }
                    placeholder="e.g., 168"
                    className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#262626] rounded-lg text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors text-xs"
                    id="modal-input-patient-height"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#AAAAAA] font-medium block mb-1.5">
                    Weight (kg) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="20"
                    max="300"
                    value={patientData.weightKg}
                    onChange={(e) =>
                      setPatientData({
                        ...patientData,
                        weightKg: e.target.value === '' ? '' : Number(e.target.value),
                      })
                    }
                    placeholder="e.g., 64"
                    className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#262626] rounded-lg text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors text-xs"
                    id="modal-input-patient-weight"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#AAAAAA] font-medium block mb-1.5">
                  Affected Knee Joint
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Left Knee', 'Right Knee', 'Bilateral (Both Knees)'] as const).map((knee) => (
                    <button
                      key={knee}
                      type="button"
                      onClick={() => setPatientData({ ...patientData, affectedKnee: knee })}
                      className={`py-2.5 px-3 rounded-lg border text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                        patientData.affectedKnee === knee
                          ? 'bg-white text-black border-white shadow-sm'
                          : 'bg-[#161616] border-[#262626] text-[#888888] hover:text-white'
                      }`}
                    >
                      {knee}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PAIN LEVEL & REGION */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <label className="font-light text-lg text-white font-editorial block mb-1">
                  Current Pain Level (0 - 10 Visual Analog Scale)
                </label>
                <p className="text-xs text-[#888888] font-light mb-4">
                  0 = No pain at all, 10 = Severe, debilitating pain preventing any movement.
                </p>

                <div className="bg-[#161616] p-5 rounded-xl border border-[#262626] flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#666666] font-bold uppercase tracking-wider">Pain Rating</span>
                    <span className="text-2xl font-light px-4 py-1 rounded-xl border border-[#333333] bg-[#0D0D0D] text-white font-editorial">
                      {painLevel} / 10
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={painLevel}
                    onChange={(e) => setPainLevel(Number(e.target.value))}
                    className="w-full accent-white h-2 bg-[#262626] rounded-lg cursor-pointer"
                  />

                  <div className="flex justify-between text-[10px] text-[#666666] uppercase tracking-wider font-medium px-1">
                    <span>0: Pain Free</span>
                    <span>3: Mild Ache</span>
                    <span>6: Moderate Strain</span>
                    <span>10: Severe</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-light text-lg text-white font-editorial block mb-1">
                  Where is the pain primarily located?
                </label>
                <p className="text-xs text-[#888888] font-light mb-3">
                  Select all regions where you feel discomfort or tightness in your {patientData.affectedKnee}:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {painLocationOptions.map((loc) => {
                    const isSelected = painLocations.includes(loc);
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => handleToggleLocation(loc)}
                        className={`p-3.5 rounded-xl border text-left text-xs uppercase tracking-wider font-semibold flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white text-black border-white shadow-sm'
                            : 'bg-[#161616] border-[#262626] text-[#888888] hover:text-white hover:border-[#666666]'
                        }`}
                      >
                        <span>{loc}</span>
                        {isSelected ? (
                          <CheckCircle2 className="w-4 h-4 text-black" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-[#444444]"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: MECHANISM & SYMPTOMS */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <label className="font-light text-lg text-white font-editorial block mb-1">
                  What caused or triggered this knee discomfort?
                </label>
                <div className="space-y-2 mt-3">
                  {[
                    'Gradual Ache / Cartilage Wear (Osteoarthritis)',
                    'Sudden Twist / Pop during Sports or Activity (Ligament / Meniscus)',
                    'Repetitive Impact (Running / Jumping / Jumper\'s Knee)',
                    'Direct Impact Trauma / Fall',
                    'Post-Surgical Rehabilitation Follow-up',
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setInjuryType(type)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs uppercase tracking-wider font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        injuryType === type
                          ? 'bg-white text-black border-white shadow-sm'
                          : 'bg-[#161616] border-[#262626] text-[#888888] hover:text-white hover:border-[#666666]'
                      }`}
                    >
                      <span>{type}</span>
                      {injuryType === type && <CheckCircle2 className="w-4 h-4 text-black" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-light text-lg text-white font-editorial block mb-1">
                  Duration of Symptoms
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3">
                  {['< 48 Hours', '1 - 2 Weeks', '2 - 6 Weeks', '> 3 Months (Chronic)'].map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setDuration(dur)}
                      className={`p-3 rounded-xl border text-center text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                        duration === dur
                          ? 'bg-white text-black border-white shadow-sm'
                          : 'bg-[#161616] border-[#262626] text-[#888888] hover:text-white hover:border-[#666666]'
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-light text-lg text-white font-editorial block mb-1">
                  Specific Joint Symptoms (Check all that apply)
                </label>
                <div className="space-y-2 mt-3">
                  {symptomOptions.map((sym) => {
                    const isChecked = symptoms.includes(sym.label);
                    return (
                      <button
                        key={sym.id}
                        type="button"
                        onClick={() => handleToggleSymptom(sym.label)}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs uppercase tracking-wider font-semibold flex items-center justify-between transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-white text-black border-white shadow-sm'
                            : 'bg-[#161616] border-[#262626] text-[#888888] hover:text-white hover:border-[#666666]'
                        }`}
                      >
                        <span>{sym.label}</span>
                        {isChecked ? (
                          <CheckCircle2 className="w-4 h-4 text-black" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-[#444444]"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CLINICAL RESULTS SUMMARY */}
          {step === 4 && assessmentResult && (
            <div className="space-y-6 animate-in fade-in" id="assessment-report-container">
              {/* Patient Header Banner */}
              <div className="bg-[#161616] p-4 rounded-xl border border-[#262626] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0D0D0D] border border-[#262626] flex items-center justify-center text-white">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium font-editorial text-sm">
                      {patientData.name || 'Patient'}
                    </strong>
                    <span className="text-[#888888] text-[11px]">
                      {patientData.age} yrs • {patientData.heightCm} cm • {patientData.weightKg} kg (BMI: {bmi}) • {patientData.mobileNumber}
                    </span>
                  </div>
                </div>
                <div className="bg-[#0D0D0D] px-3 py-1.5 rounded-lg border border-[#262626] text-[10px] uppercase font-bold text-white tracking-wider">
                  Target: {patientData.affectedKnee}
                </div>
              </div>

              {/* Score Header Card */}
              <div className="bg-[#161616] border border-[#262626] text-white p-6 rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#888888] uppercase tracking-widest block mb-1">
                      KneeAI Clinical Evaluation Result
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-light text-white font-editorial tracking-tight">
                      {assessmentResult.status}
                    </h3>
                    <p className="text-[#888888] text-xs font-light mt-1">
                      Rehabilitation Recommendation: Phase {assessmentResult.recommendedPhase} Protocol
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-[#0D0D0D] px-5 py-3 rounded-xl border border-[#262626] self-start sm:self-auto">
                    <div className="text-right">
                      <span className="text-[9px] text-[#666666] uppercase font-bold tracking-widest block">Joint Health Index</span>
                      <span className="text-3xl font-light text-white font-editorial">{assessmentResult.score}/100</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#262626] text-xs text-[#888888] font-light leading-relaxed">
                  {assessmentResult.summary}
                </div>
              </div>

              {/* Key Diagnostic Findings */}
              <div className="bg-[#161616] border border-[#262626] rounded-xl p-5">
                <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider mb-3 font-editorial">
                  <Activity className="w-3.5 h-3.5 text-[#888888]" />
                  <span>Clinical Observations & Biometric Telemetry</span>
                </div>
                <ul className="space-y-2 text-xs text-[#E5E5E5] font-light">
                  {assessmentResult.keyFindings.map((finding, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#888888] shrink-0 mt-0.5" />
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prescribed Exercises & Nutrition Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Exercises */}
                <div className="bg-[#161616] border border-[#262626] rounded-xl p-5">
                  <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider mb-3 font-editorial">
                    <Dumbbell className="w-3.5 h-3.5 text-[#888888]" />
                    <span>Prescribed Daily Exercises</span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#E5E5E5] font-light">
                    {assessmentResult.suggestedExercises.map((ex, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-[#0D0D0D] p-2.5 rounded-lg border border-[#262626]">
                        <span className="w-4 h-4 rounded-full bg-white text-black text-[9px] flex items-center justify-center font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Nutrition */}
                <div className="bg-[#161616] border border-[#262626] rounded-xl p-5">
                  <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider mb-3 font-editorial">
                    <Apple className="w-3.5 h-3.5 text-[#888888]" />
                    <span>Anti-Inflammatory Nutrition</span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#E5E5E5] font-light">
                    {assessmentResult.nutritionAdvice.map((nut, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 bg-[#0D0D0D] p-2.5 rounded-lg border border-[#262626]">
                        <CheckCircle2 className="w-4 h-4 text-[#888888] shrink-0 mt-0.5" />
                        <span>{nut}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Movement Precautions */}
              <div className="bg-[#161616] border border-[#333333] rounded-xl p-4 text-xs text-[#888888] font-light flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-semibold block mb-1">Safety Precautions:</strong>
                  <ul className="space-y-1">
                    {assessmentResult.movementPrecautions.map((p, idx) => (
                      <li key={idx}>• {p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="bg-[#161616] px-6 py-4 border-t border-[#262626] flex items-center justify-between">
          {step > 1 && step < 4 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="border border-[#262626] hover:bg-[#222222] text-[#888888] hover:text-white font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-full flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 3 && (
            <button
              onClick={() => setStep(step + 1)}
              className="bg-white hover:bg-[#E5E5E5] text-black font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Continue</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          {step === 3 && (
            <button
              onClick={runClinicalAssessment}
              disabled={isLoading}
              className="bg-white hover:bg-[#E5E5E5] text-black font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing Biometrics with Clinical AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Clinical Roadmap</span>
                </>
              )}
            </button>
          )}

          {step === 4 && (
            <div className="flex gap-2 w-full justify-between items-center">
              <button
                onClick={() => {
                  window.print();
                }}
                className="border border-[#262626] hover:bg-[#222222] text-[#888888] hover:text-white font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-full flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onSelectExercisesTab();
                }}
                className="bg-white hover:bg-[#E5E5E5] text-black font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Dumbbell className="w-3.5 h-3.5" />
                <span>Start Prescribed Exercises</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
