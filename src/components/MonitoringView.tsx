import React, { useState } from 'react';
import { Language, KneeAnatomyPart } from '../types';
import { translations, kneeAnatomyParts } from '../data/translations';
import {
  Activity,
  Flame,
  ChevronRight,
  Info,
  Sparkles,
  Sliders,
} from 'lucide-react';

interface MonitoringViewProps {
  currentLanguage: Language;
  onOpenAssessment: () => void;
  onSelectExercisesTab: () => void;
}

export const MonitoringView: React.FC<MonitoringViewProps> = ({
  currentLanguage,
  onOpenAssessment,
  onSelectExercisesTab,
}) => {
  const t = translations[currentLanguage];

  // Interactive joint simulation state
  const [currentFlexion, setCurrentFlexion] = useState<number>(118);
  const [currentExtension, setCurrentExtension] = useState<number>(2);
  const [selectedPart, setSelectedPart] = useState<KneeAnatomyPart>(kneeAnatomyParts[0]);

  // Compute calculated biomechanical indices
  const maxTargetFlexion = 135;
  const flexionPercentage = Math.min(100, Math.round((currentFlexion / maxTargetFlexion) * 100));
  const jointHealthIndex = Math.min(100, Math.round(70 + (currentFlexion / 135) * 20 - currentExtension * 3));

  // Weekly compliance days
  const weekDays = [
    { day: 'Mon', completed: true, rom: '112°' },
    { day: 'Tue', completed: true, rom: '114°' },
    { day: 'Wed', completed: true, rom: '115°' },
    { day: 'Thu', completed: true, rom: '116°' },
    { day: 'Fri', completed: true, rom: '118°' },
    { day: 'Sat', completed: true, rom: '118°' },
    { day: 'Sun', completed: false, rom: 'Pending' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 md:py-16 space-y-10" id="monitoring-view">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-main)] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-[var(--bg-elevated)] border border-[var(--border-main)] text-[var(--text-secondary)] px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-semibold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <Activity className="w-3 h-3 text-[var(--text-secondary)]" />
            <span>Clinical Telemetry Stream • Live</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-[var(--text-primary)] tracking-tighter font-editorial">
            {t.monitoring.title}
          </h1>
          <p className="text-sm text-[var(--text-secondary)] font-light mt-1 max-w-2xl">
            {t.monitoring.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={onOpenAssessment}
            className="bg-[var(--accent-btn)] text-[var(--accent-btn-text)] hover:opacity-90 font-semibold text-xs uppercase tracking-widest px-5 py-2.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-btn-text)]" />
            <span>Calibrate AI Baseline</span>
          </button>
        </div>
      </div>

      {/* Primary Telemetry Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Range of Motion (ROM) Flexion Dial */}
        <div className="bg-[var(--bg-surface)] rounded-2xl p-6 border border-[var(--border-main)] flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                Range of Motion (ROM)
              </span>
              <span className="bg-[var(--bg-elevated)] text-[var(--text-primary)] text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold border border-[var(--border-main)]">
                Functional Progress
              </span>
            </div>

            <div className="flex items-center justify-center my-4 relative">
              {/* Radial Progress Graphic */}
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="var(--bg-subtle)"
                    strokeWidth="8"
                  />
                  {/* Active Arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="var(--text-primary)"
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 * (1 - (currentFlexion / 140))}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />
                </svg>

                {/* Inner Readout */}
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-light text-[var(--text-primary)] tracking-tight font-editorial">{currentFlexion}°</span>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-medium">Flexion Angle</span>
                  <span className="text-[10px] text-[var(--text-secondary)] font-medium mt-0.5">
                    {flexionPercentage}% of normal
                  </span>
                </div>
              </div>
            </div>

            {/* Extension deficit info */}
            <div className="grid grid-cols-2 gap-2 text-center pt-3 border-t border-[var(--border-main)]">
              <div className="bg-[var(--bg-elevated)] border border-[var(--border-main)] p-2.5 rounded-xl">
                <span className="text-[9px] text-[var(--text-muted)] block uppercase font-bold tracking-wider">Extension Lag</span>
                <span className="text-base font-bold text-[var(--text-primary)]">{currentExtension}°</span>
                <span className="text-[9px] text-[var(--text-muted)] block">Target: 0°</span>
              </div>
              <div className="bg-[var(--bg-elevated)] border border-[var(--border-main)] p-2.5 rounded-xl">
                <span className="text-[9px] text-[var(--text-muted)] block uppercase font-bold tracking-wider">Target Flexion</span>
                <span className="text-base font-bold text-[var(--text-primary)]">135°</span>
                <span className="text-[9px] text-emerald-400 font-medium block">+6° this week</span>
              </div>
            </div>
          </div>

          {/* Interactive ROM Simulator Slider */}
          <div className="mt-4 pt-3 border-t border-[var(--border-main)]">
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] mb-1.5">
              <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider">
                <Sliders className="w-3 h-3" />
                <span>Simulate Joint Bend</span>
              </span>
              <span className="font-bold text-[var(--text-primary)]">{currentFlexion}°</span>
            </div>
            <input
              type="range"
              min="30"
              max="140"
              value={currentFlexion}
              onChange={(e) => setCurrentFlexion(Number(e.target.value))}
              className="w-full accent-[var(--text-primary)] h-1.5 bg-[var(--border-main)] rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* 2. Joint Health Index & Compliance */}
        <div className="bg-[var(--bg-surface)] rounded-2xl p-6 border border-[var(--border-main)] flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                Joint Recovery Score
              </span>
              <span className="bg-[var(--bg-elevated)] text-[var(--text-primary)] text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold border border-[var(--border-main)]">
                Level 2 Phase
              </span>
            </div>

            <div className="flex items-baseline gap-2 my-2">
              <span className="text-4xl font-light text-[var(--text-primary)] tracking-tight font-editorial">{jointHealthIndex}</span>
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">/ 100 Pts</span>
            </div>

            <p className="text-xs text-[var(--text-secondary)] font-light mb-4 leading-relaxed">
              Composite score combining active Range of Motion, quad activation compliance, and reported joint swelling.
            </p>

            {/* 7-Day Streak Timeline */}
            <div className="bg-[var(--bg-elevated)] p-3.5 rounded-xl border border-[var(--border-main)] mb-4">
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)] mb-2.5">
                <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>6-Day Rehab Streak</span>
                </span>
                <span className="text-[var(--text-muted)] text-[10px]">85% Target</span>
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {weekDays.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-center py-2 rounded-lg text-[9px] uppercase tracking-wider ${
                      item.completed
                        ? 'bg-[var(--accent-btn)] text-[var(--accent-btn-text)] font-bold border border-[var(--accent-btn)]'
                        : 'bg-[var(--bg-primary)] text-[var(--text-muted)] border border-dashed border-[var(--border-main)]'
                    }`}
                  >
                    <span>{item.day}</span>
                    <span className="mt-1 font-semibold">{item.completed ? '✓' : '•'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={onSelectExercisesTab}
            className="w-full bg-[var(--accent-btn)] text-[var(--accent-btn-text)] hover:opacity-90 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>Complete Today’s Exercises</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3. Joint Load & Biomechanical Warnings */}
        <div className="bg-[var(--bg-surface)] rounded-2xl p-6 border border-[var(--border-main)] flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                Dynamic Load Telemetry
              </span>
              <span className="bg-[var(--bg-elevated)] text-[var(--text-primary)] text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold border border-[var(--border-main)]">
                Safe Envelope
              </span>
            </div>

            <div className="space-y-3.5">
              <div className="p-3.5 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-main)]">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-xs text-[var(--text-primary)]">Patellofemoral Pressure</span>
                  <span className="font-bold text-[var(--text-primary)]">1.4 MPa</span>
                </div>
                <div className="w-full bg-[var(--border-main)] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[var(--text-primary)] h-full rounded-full w-2/5"></div>
                </div>
                <span className="text-[10px] text-[var(--text-muted)] mt-1 block">Within healthy cartilage tolerance threshold</span>
              </div>

              <div className="p-3.5 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-main)]">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-xs text-[var(--text-primary)]">ACL Shear Force Estimate</span>
                  <span className="font-bold text-emerald-400">12% Max (Low)</span>
                </div>
                <div className="w-full bg-[var(--border-main)] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full w-1/6"></div>
                </div>
                <span className="text-[10px] text-[var(--text-muted)] mt-1 block">Rotational stabilizing torque is optimal</span>
              </div>

              <div className="p-3.5 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-main)] flex items-start gap-2.5">
                <Info className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0 mt-0.5" />
                <p className="text-[11px] text-[var(--text-secondary)] font-light leading-relaxed">
                  Avoid deep loaded squats beyond 90° until your quadriceps strength index matches 90% of the opposite limb.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border-main)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
            <span>Last Sensor Sync: 2m ago</span>
            <span className="text-[var(--text-primary)] font-medium">Continuous BLE</span>
          </div>
        </div>
      </div>

      {/* Interactive 3D Knee Anatomy Explorer */}
      <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-main)] p-6 sm:p-8 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest block mb-1">
              3D Interactive Biomechanics
            </span>
            <h2 className="text-2xl font-light text-[var(--text-primary)] tracking-tighter font-editorial">
              {t.monitoring.anatomicalExplorer}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] font-light mt-0.5">
              Click on any knee ligament, cartilage, or bone component to inspect its clinical function and targeted rehab guidelines.
            </p>
          </div>

          {/* Quick Filter Badges */}
          <div className="flex flex-wrap gap-1.5">
            {kneeAnatomyParts.map((part) => (
              <button
                key={part.id}
                onClick={() => setSelectedPart(part)}
                className={`px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  selectedPart.id === part.id
                    ? 'bg-[var(--accent-btn)] text-[var(--accent-btn-text)] shadow-sm'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)]'
                }`}
              >
                {part.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Stylized Visual Anatomical Knee Canvas / Map */}
          <div className="lg:col-span-6 relative bg-[var(--bg-primary)] border border-[var(--border-main)] rounded-2xl p-6 min-h-[380px] flex items-center justify-center text-[var(--text-primary)] overflow-hidden transition-colors">
            {/* Background Editorial Grid lines */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Stylized Vector Knee Wireframe */}
            <svg
              viewBox="0 0 300 360"
              className="w-full max-w-[260px] h-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            >
              {/* Femur Bone (Thigh) */}
              <path
                d="M 110,20 L 190,20 L 180,90 Q 210,130 195,160 Q 150,170 105,160 Q 90,130 120,90 Z"
                fill="var(--bg-elevated)"
                stroke="var(--border-subtle)"
                strokeWidth="2"
              />

              {/* Tibia & Fibula (Shin) */}
              <path
                d="M 100,195 Q 150,190 200,195 L 185,340 L 115,340 Z"
                fill="var(--bg-elevated)"
                stroke="var(--border-subtle)"
                strokeWidth="2"
              />
              <path
                d="M 205,210 L 220,330"
                stroke="var(--border-main)"
                strokeWidth="3"
                strokeDasharray="4 4"
              />

              {/* Meniscus Pads (C-shaped shock absorbers) */}
              <path
                d="M 105,178 Q 150,185 195,178 Q 150,170 105,178"
                fill="var(--bg-subtle)"
                stroke="var(--text-secondary)"
                strokeWidth="2"
              />

              {/* Cruciate Ligaments (ACL & PCL crossing) */}
              <line x1="130" y1="145" x2="170" y2="190" stroke="var(--text-primary)" strokeWidth="4" strokeLinecap="round" />
              <line x1="170" y1="145" x2="130" y2="190" stroke="var(--text-secondary)" strokeWidth="4" strokeLinecap="round" />

              {/* Collateral Ligaments (MCL & LCL) */}
              <path d="M 98,125 Q 92,175 98,215" fill="none" stroke="var(--text-muted)" strokeWidth="4" strokeLinecap="round" />
              <path d="M 202,125 Q 208,175 202,215" fill="none" stroke="var(--text-muted)" strokeWidth="4" strokeLinecap="round" />

              {/* Patella (Kneecap) */}
              <ellipse
                cx="150"
                cy="145"
                rx="28"
                ry="22"
                fill={selectedPart.id === 'patella' ? 'var(--text-primary)' : 'var(--bg-subtle)'}
                stroke="var(--border-subtle)"
                strokeWidth="2"
                className="transition-colors cursor-pointer"
                onClick={() => setSelectedPart(kneeAnatomyParts[0])}
              />
            </svg>

            {/* Clickable anatomical node pins */}
            {kneeAnatomyParts.map((part) => {
              const isSelected = selectedPart.id === part.id;
              return (
                <button
                  key={part.id}
                  style={{ top: `${part.coords.y}%`, left: `${part.coords.x}%` }}
                  onClick={() => setSelectedPart(part)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all duration-300 z-10 flex items-center justify-center cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--accent-btn)] text-[var(--accent-btn-text)] ring-4 ring-white/30 scale-125'
                      : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:bg-[var(--accent-btn)] hover:text-[var(--accent-btn-text)] hover:scale-110'
                  }`}
                  title={part.name}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                </button>
              );
            })}

            <div className="absolute bottom-3 left-4 text-[9px] uppercase tracking-widest text-[var(--text-muted)]">
              Schematic Anterior View • Interactive Nodes Active
            </div>
          </div>

          {/* Selected Part Clinical Detail Panel */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="border-b border-[var(--border-main)] pb-4">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest block">
                {selectedPart.medicalName}
              </span>
              <h3 className="text-2xl font-light text-[var(--text-primary)] tracking-tight font-editorial mt-0.5">
                {selectedPart.name}
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[var(--bg-elevated)] p-3.5 rounded-xl border border-[var(--border-main)]">
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                  Primary Biomechanical Function
                </span>
                <p className="text-[var(--text-primary)] font-light leading-relaxed">{selectedPart.role}</p>
              </div>

              <div className="bg-[var(--bg-elevated)] p-3.5 rounded-xl border border-[var(--border-main)]">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  Clinical Risk & Tear Vulnerability
                </span>
                <p className="text-[var(--text-secondary)] font-light leading-relaxed">{selectedPart.injuryRisk}</p>
              </div>

              <div className="bg-[var(--bg-elevated)] p-3.5 rounded-xl border border-[var(--border-main)]">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  Physical Therapy Protocol
                </span>
                <p className="text-[var(--text-secondary)] font-light leading-relaxed">{selectedPart.rehabTip}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onSelectExercisesTab}
                className="bg-[var(--accent-btn)] hover:opacity-90 text-[var(--accent-btn-text)] font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Prescribed Exercises for {selectedPart.name.split(' ')[0]}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
