import React, { useState } from 'react';
import { PatientProfile } from '../types';
import {
  X,
  User,
  Phone,
  Scale,
  Ruler,
  Activity,
  HeartPulse,
  Save,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  Layers,
} from 'lucide-react';

interface PatientProfileModalProps {
  profile: PatientProfile;
  onSaveProfile: (updatedProfile: PatientProfile) => void;
  onClose: () => void;
  onOpenAssessment?: () => void;
}

export const PatientProfileModal: React.FC<PatientProfileModalProps> = ({
  profile,
  onSaveProfile,
  onClose,
  onOpenAssessment,
}) => {
  const [formData, setFormData] = useState<PatientProfile>({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const calculateBmi = (weightKg: number | '', heightCm: number | '') => {
    if (!weightKg || !heightCm || heightCm <= 0) return null;
    const heightM = Number(heightCm) / 100;
    const bmi = Number(weightKg) / (heightM * heightM);
    return Math.round(bmi * 10) / 10;
  };

  const bmi = calculateBmi(formData.weightKg, formData.heightCm);

  const getBmiCategory = (val: number | null) => {
    if (!val) return { label: 'Awaiting Metrics', color: 'text-[#888888] border-[#333333]' };
    if (val < 18.5) return { label: 'Underweight', color: 'text-cyan-400 border-cyan-500/30' };
    if (val < 25) return { label: 'Optimal / Normal', color: 'text-emerald-400 border-emerald-500/30' };
    if (val < 30) return { label: 'Overweight', color: 'text-amber-400 border-amber-500/30' };
    return { label: 'High Joint Load Class', color: 'text-rose-400 border-rose-500/30' };
  };

  const bmiCategory = getBmiCategory(bmi);

  // Biomechanical 4:1 Knee Compression Force
  const kneeLoadPerStepKg = formData.weightKg ? Number(formData.weightKg) * 4 : null;
  const dailyStrideLoadTons = kneeLoadPerStepKg ? Math.round((kneeLoadPerStepKg * 3000) / 1000) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: PatientProfile = {
      ...formData,
      lastUpdated: new Date().toISOString(),
    };
    onSaveProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-[#111111] rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#262626] overflow-hidden text-[#E5E5E5]"
        id="modal-patient-profile-entry"
      >
        {/* Header */}
        <div className="bg-[#161616] px-6 py-5 border-b border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0D0D0D] border border-[#262626] text-white flex items-center justify-center shadow-inner">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-light tracking-tight font-editorial text-white">
                Patient Demographics & Medical Profile
              </h3>
              <p className="text-xs text-[#888888] font-light">
                Entry details for biometric telemetry, biomechanical joint load, and personalized AI rehabilitation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#888888] hover:text-white p-2 rounded-full hover:bg-[#262626] transition-colors cursor-pointer"
            id="btn-close-patient-profile"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs font-light">
          {/* Biomechanical Telemetry Banner */}
          <div className="bg-[#161616] rounded-xl p-5 border border-[#262626]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest font-editorial">
                <HeartPulse className="w-4 h-4 text-[#888888]" />
                <span>Live Biomechanical Joint Analysis</span>
              </div>
              <span
                className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full border bg-[#0D0D0D] ${bmiCategory.color}`}
              >
                {bmiCategory.label}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#0D0D0D] rounded-xl border border-[#262626]">
                <span className="text-[10px] text-[#666666] uppercase tracking-wider font-bold block mb-1">
                  Body Mass Index (BMI)
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-light text-white font-editorial">
                    {bmi ? `${bmi} kg/m²` : '—'}
                  </span>
                </div>
                <span className="text-[10px] text-[#888888] block mt-1 font-light">
                  Standard clinical index (18.5 - 24.9 optimal)
                </span>
              </div>

              <div className="p-3 bg-[#0D0D0D] rounded-xl border border-[#262626]">
                <span className="text-[10px] text-[#666666] uppercase tracking-wider font-bold block mb-1">
                  Knee Load / Step
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-light text-white font-editorial">
                    {kneeLoadPerStepKg ? `${kneeLoadPerStepKg} kg` : '—'}
                  </span>
                </div>
                <span className="text-[10px] text-[#888888] block mt-1 font-light">
                  4:1 patellofemoral compressive force
                </span>
              </div>

              <div className="p-3 bg-[#0D0D0D] rounded-xl border border-[#262626]">
                <span className="text-[10px] text-[#666666] uppercase tracking-wider font-bold block mb-1">
                  3,000 Step Daily Impact
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-light text-white font-editorial">
                    {dailyStrideLoadTons ? `~${dailyStrideLoadTons} Tons` : '—'}
                  </span>
                </div>
                <span className="text-[10px] text-[#888888] block mt-1 font-light">
                  Cumulative kinetic compression on cartilage
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} id="form-patient-entry" className="space-y-5">
            {/* Primary Details Row */}
            <div className="border border-[#262626] bg-[#161616] rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider font-editorial border-b border-[#262626] pb-3">
                <FileText className="w-4 h-4 text-[#888888]" />
                <span>1. Patient Primary Identity & Contact Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#AAAAAA] font-medium block mb-1.5">
                    Patient Full Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Eleanor Vance"
                      className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#262626] rounded-lg text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors"
                      id="input-patient-name"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#AAAAAA] font-medium block mb-1.5">
                    Mobile Number <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      placeholder="e.g., +1 (555) 019-2834"
                      className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#262626] rounded-lg text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors"
                      id="input-patient-mobile"
                    />
                  </div>
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
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        age: e.target.value === '' ? '' : Number(e.target.value),
                      })
                    }
                    placeholder="e.g., 46"
                    className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#262626] rounded-lg text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors"
                    id="input-patient-age"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#AAAAAA] font-medium block mb-1.5">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gender: e.target.value as PatientProfile['gender'],
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#262626] rounded-lg text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                    id="select-patient-gender"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#AAAAAA] font-medium block mb-1.5">
                    Blood Group (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.bloodGroup || ''}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    placeholder="e.g., O+, A+, B+"
                    className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#262626] rounded-lg text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors"
                    id="input-patient-bloodgroup"
                  />
                </div>
              </div>
            </div>

            {/* Anthropometric & Biometric Row */}
            <div className="border border-[#262626] bg-[#161616] rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider font-editorial border-b border-[#262626] pb-3">
                <Scale className="w-4 h-4 text-[#888888]" />
                <span>2. Anthropometric Measurements (Height & Weight)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#AAAAAA] font-medium">
                      Height (in Centimeters) <span className="text-rose-400">*</span>
                    </label>
                    {formData.heightCm && (
                      <span className="text-[10px] text-[#888888]">
                        ≈ {Math.floor(Number(formData.heightCm) / 30.48)} ft{' '}
                        {Math.round((Number(formData.heightCm) % 30.48) / 2.54)} in
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min="50"
                      max="250"
                      value={formData.heightCm}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          heightCm: e.target.value === '' ? '' : Number(e.target.value),
                        })
                      }
                      placeholder="e.g., 172"
                      className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#262626] rounded-lg text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors"
                      id="input-patient-height"
                    />
                    <span className="absolute right-3 top-2.5 text-[#666666] text-xs">cm</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#AAAAAA] font-medium">
                      Weight (in Kilograms) <span className="text-rose-400">*</span>
                    </label>
                    {formData.weightKg && (
                      <span className="text-[10px] text-[#888888]">
                        ≈ {Math.round(Number(formData.weightKg) * 2.20462)} lbs
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min="20"
                      max="300"
                      value={formData.weightKg}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          weightKg: e.target.value === '' ? '' : Number(e.target.value),
                        })
                      }
                      placeholder="e.g., 68"
                      className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#262626] rounded-lg text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors"
                      id="input-patient-weight"
                    />
                    <span className="absolute right-3 top-2.5 text-[#666666] text-xs">kg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Affected Knee & Activity Level */}
            <div className="border border-[#262626] bg-[#161616] rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider font-editorial border-b border-[#262626] pb-3">
                <Layers className="w-4 h-4 text-[#888888]" />
                <span>3. Joint Condition & Baseline Mobility</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#AAAAAA] font-medium block mb-1.5">
                    Affected Knee Joint
                  </label>
                  <select
                    value={formData.affectedKnee}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        affectedKnee: e.target.value as PatientProfile['affectedKnee'],
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#262626] rounded-lg text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                    id="select-patient-knee"
                  >
                    <option value="Left Knee">Left Knee</option>
                    <option value="Right Knee">Right Knee</option>
                    <option value="Bilateral (Both Knees)">Bilateral (Both Knees)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#AAAAAA] font-medium block mb-1.5">
                    Daily Physical Activity Level
                  </label>
                  <select
                    value={formData.activityLevel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        activityLevel: e.target.value as PatientProfile['activityLevel'],
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#262626] rounded-lg text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                    id="select-patient-activity"
                  >
                    <option value="Sedentary">Sedentary (Desk job, minimal walking)</option>
                    <option value="Lightly Active">Lightly Active (1-3 walks / week)</option>
                    <option value="Moderately Active">Moderately Active (Regular exercise)</option>
                    <option value="Very Active">Very Active (Heavy athletic training / labor)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#AAAAAA] font-medium block mb-1.5">
                  Email Address for Clinical Summaries (Optional)
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g., eleanor.vance@clinical.org"
                  className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#262626] rounded-lg text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors"
                  id="input-patient-email"
                />
              </div>
            </div>

            {/* Notification alert on save */}
            {savedSuccess && (
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3.5 text-emerald-200 flex items-center gap-3 animate-in fade-in duration-150">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Patient record and telemetry benchmarks successfully updated!</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="text-[11px] text-[#666666]">
                {formData.lastUpdated ? (
                  <span>Last synced: {new Date(formData.lastUpdated).toLocaleDateString()}</span>
                ) : (
                  <span>Stored securely in local clinical session</span>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 sm:w-auto border border-[#262626] hover:bg-[#222222] text-[#888888] hover:text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="btn-save-patient-profile"
                  className="w-1/2 sm:w-auto bg-white hover:bg-[#E5E5E5] text-black font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Save className="w-4 h-4 text-black" />
                  <span>Save Record</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
