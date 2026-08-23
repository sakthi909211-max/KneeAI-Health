import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Sparkles, ShieldCheck, Activity, ChevronRight, Info } from 'lucide-react';

interface HeroSectionProps {
  currentLanguage: Language;
  onStartAssessment: () => void;
  onLearnMore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLanguage,
  onStartAssessment,
  onLearnMore,
}) => {
  const t = translations[currentLanguage];
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Hotspots simulating clinical AI detection tags on the 3D model
  const anatomicalMarkers = [
    { id: 'femur', label: 'Femoral Condyle', status: 'Healthy Cartilage (3.4mm)', top: '32%', left: '50%' },
    { id: 'patella', label: 'Patellar Tracking', status: 'Optimal Congruence', top: '42%', left: '50%' },
    { id: 'acl', label: 'ACL Integrity', status: 'Low Strain (<15%)', top: '50%', left: '46%' },
    { id: 'meniscus', label: 'Medial Meniscus', status: 'Shock Buffer Intact', top: '56%', left: '42%' },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 md:py-20" id="hero-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Text Content */}
        <div className="flex flex-col gap-6">
          {/* Clinical Badge */}
          <div className="inline-flex items-center gap-2 self-start bg-[var(--bg-elevated)] border border-[var(--border-main)] px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-semibold text-[var(--text-primary)] transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <Activity className="w-3 h-3 text-[var(--text-secondary)]" />
            <span>{t.hero.liveBadge}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-normal text-[var(--text-primary)] leading-[1.12] tracking-tighter font-editorial transition-colors">
            {t.hero.titlePrefix}
            <br />
            <span className="font-serif-editorial italic font-normal text-[var(--text-secondary)]">{t.hero.titleHighlight}</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl font-light leading-relaxed transition-colors">
            {t.hero.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onStartAssessment}
              id="btn-hero-start-assessment"
              className="bg-[var(--accent-btn)] text-[var(--accent-btn-text)] hover:opacity-90 font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[var(--accent-btn-text)]" />
              <span>{t.hero.startAssessment}</span>
            </button>

            <button
              onClick={onLearnMore}
              id="btn-hero-learn-more"
              className="border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-primary)] font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer bg-[var(--bg-elevated)]"
            >
              <span>{t.hero.learnMore}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-[var(--border-main)] text-[10px] uppercase tracking-widest font-medium text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
              <span>Real-time ROM</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
              <span>Clinical Backed</span>
            </div>
          </div>
        </div>

        {/* 3D Clinical Monitor Display */}
        <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden border border-[var(--border-main)] bg-[var(--bg-surface)] shadow-2xl group transition-colors">
          <img
            alt="Clinical AI interface showing 3D knee model and analysis tools in a modern medical setting."
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-90 transition-transform duration-700 group-hover:scale-102"
            src="https://lh3.googleusercontent.com/aida/AEtjO1VdZmYL4qTLwXCKzBYfwBqSmUYDH-enQhG47x8Ibxm-YGpqyiBLzYVaxNEQIwvk5VsRjWakNMVx1bfdXO3d4sDXmktoODZKjTI2j55920ccpSyGALNMxGT747BVoQ2M6wN35I7reqRZDqvci3GKCKuW6fcq-iALIGoFPm5Rm8s6ibQrZaac5If4ySxfncsJLSEYhZwu0u59ZjFWH0J0TmIAqVAHl_sA-ryQQZY8Qkqbm4YufXnlHAoVDV51"
            referrerPolicy="no-referrer"
          />

          {/* Live Overlay Badge on monitor */}
          <div className="absolute top-4 left-4 bg-[var(--bg-primary)]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[var(--border-main)] shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--text-primary)] animate-pulse"></span>
            <span className="text-[10px] font-bold text-[var(--text-primary)] tracking-widest uppercase">
              3D AI Joint Tracking
            </span>
          </div>

          {/* Interactive Marker Hotspots on the monitor */}
          {anatomicalMarkers.map((marker) => (
            <div
              key={marker.id}
              style={{ top: marker.top, left: marker.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
              onMouseEnter={() => setActiveTooltip(marker.id)}
              onMouseLeave={() => setActiveTooltip(null)}
              onClick={() => setActiveTooltip(activeTooltip === marker.id ? null : marker.id)}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-6 h-6 rounded-full bg-[var(--text-primary)]/20 animate-ping"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-[var(--accent-btn)] border-2 border-[var(--bg-primary)] shadow-md"></span>
              </div>

              {/* Popover Tooltip */}
              {activeTooltip === marker.id && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-48 bg-[var(--bg-surface)] text-[var(--text-primary)] text-xs rounded-xl p-3 shadow-2xl border border-[var(--border-main)] z-30 animate-in fade-in zoom-in-95 pointer-events-none">
                  <p className="font-bold text-[var(--text-primary)] uppercase tracking-wider text-[11px]">{marker.label}</p>
                  <p className="text-[var(--text-secondary)] text-[11px] mt-0.5">{marker.status}</p>
                </div>
              )}
            </div>
          ))}

          {/* Bottom Telemetry Bar */}
          <div className="absolute bottom-4 inset-x-4 bg-[var(--bg-primary)]/90 backdrop-blur-md rounded-xl p-3.5 border border-[var(--border-main)] shadow-lg flex justify-between items-center text-xs">
            <div>
              <span className="text-[var(--text-muted)] block text-[9px] font-bold uppercase tracking-widest">Real-Time Joint Angle</span>
              <span className="text-[var(--text-primary)] font-bold text-sm">118° Active Flexion</span>
            </div>
            <div className="h-6 w-px bg-[var(--border-main)]"></div>
            <div>
              <span className="text-[var(--text-muted)] block text-[9px] font-bold uppercase tracking-widest">Meniscal Load</span>
              <span className="text-emerald-400 font-bold text-sm">1.8 kPa (Optimal)</span>
            </div>
            <div className="h-6 w-px bg-[var(--border-main)]"></div>
            <button
              onClick={onStartAssessment}
              className="bg-[var(--accent-btn)] hover:opacity-90 text-[var(--accent-btn-text)] px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Run Diagnostic
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
