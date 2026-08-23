import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { X, Footprints, Scale, Shield, Moon, Flame, Snowflake, Award, Check } from 'lucide-react';

interface HabitsModalProps {
  currentLanguage: Language;
  onClose: () => void;
}

export const HabitsModal: React.FC<HabitsModalProps> = ({ currentLanguage, onClose }) => {
  const t = translations[currentLanguage];
  const [weightKg, setWeightKg] = useState<number>(75);

  // 1 kg of body weight reduction = 4 kg reduction in joint impact per step!
  const jointLoadReliefKg = (5 * 4).toFixed(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-[#111111] rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#262626] overflow-hidden text-[#E5E5E5]"
        id="modal-habits-guide"
      >
        {/* Header */}
        <div className="bg-[#161616] px-6 py-5 border-b border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0D0D0D] border border-[#262626] text-white flex items-center justify-center">
              <Footprints className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-light tracking-tight font-editorial text-white">Clinical Lifestyle & Ergonomics</h3>
              <p className="text-xs text-[#888888] font-light">Evidence-backed daily habits to minimize joint stress and accelerate tissue healing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#888888] hover:text-white p-2 rounded-full hover:bg-[#262626] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-[#E5E5E5]">
          {/* 1. Weight Load Multiplier Calculator */}
          <div className="bg-[#161616] rounded-xl p-5 border border-[#262626]">
            <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider mb-2 font-editorial">
              <Scale className="w-4 h-4 text-[#888888]" />
              <span>Biomechanical 4:1 Knee Load Multiplier</span>
            </div>
            <p className="text-xs text-[#888888] font-light leading-relaxed mb-4">
              With every step, each kilogram of body weight exerts roughly <strong className="text-white">4 kg of mechanical compression</strong> across the patellofemoral and tibiofemoral compartments. Losing just 5 kg offloads <strong className="text-white">20 kg of force</strong> with every single stride!
            </p>
            <div className="bg-[#0D0D0D] rounded-xl p-3.5 border border-[#262626] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#666666] uppercase tracking-wider font-bold block">5 kg Weight Offload</span>
                <span className="text-base font-light text-white font-editorial">~48,000 kg less force</span>
                <span className="text-[10px] text-[#666666] block font-light">over a standard 2,400-step walk</span>
              </div>
              <div className="text-right">
                <span className="inline-block bg-white text-black font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                  4x Kinetic Relief
                </span>
              </div>
            </div>
          </div>

          {/* 2. Footwear & Orthotic Guidelines */}
          <div className="border border-[#262626] bg-[#161616] rounded-xl p-5">
            <div className="flex items-center gap-2 font-bold text-white text-sm uppercase tracking-wider mb-3 font-editorial">
              <Shield className="w-4 h-4 text-[#888888]" />
              <span>Supportive Footwear & Orthotics</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#0D0D0D] rounded-xl border border-[#262626] text-[#E5E5E5] font-light">
                <strong className="text-white font-semibold block mb-1">Recommended Features:</strong>
                <ul className="space-y-1 text-[#888888]">
                  <li>• Moderate heel-to-toe drop (8-10mm)</li>
                  <li>• Structured medial arch support</li>
                  <li>• Cushioned EVA midsole shock absorption</li>
                </ul>
              </div>
              <div className="p-3 bg-rose-950/20 rounded-xl border border-rose-900/40 text-rose-200 font-light">
                <strong className="text-rose-100 font-semibold block mb-1">Footwear to Avoid:</strong>
                <ul className="space-y-1 text-rose-300/80">
                  <li>• Flat flip-flops / unsupportive sliders</li>
                  <li>• High heels exceeding 1.5 inches (+26% pressure)</li>
                  <li>• Worn out running shoes (&gt;500 miles)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Cryotherapy vs Thermotherapy (Ice vs Heat) */}
          <div className="border border-[#262626] bg-[#161616] rounded-xl p-5">
            <div className="flex items-center gap-2 font-bold text-white text-sm uppercase tracking-wider mb-3 font-editorial">
              <div className="flex gap-1">
                <Snowflake className="w-3.5 h-3.5 text-cyan-400" />
                <Flame className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span>Thermal Management Protocol</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light">
              <div className="p-3 bg-[#0D0D0D] rounded-xl border border-[#262626]">
                <div className="flex items-center gap-1.5 font-bold text-cyan-300 mb-1 uppercase tracking-wider text-[11px]">
                  <Snowflake className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Ice (Cryotherapy)</span>
                </div>
                <p className="text-[#888888]">
                  <strong className="text-white">When:</strong> After workouts, acute flare-ups, or visible swelling.
                </p>
                <p className="text-[#888888] mt-1">
                  <strong className="text-white">Duration:</strong> 15-20 minutes wrapped in a damp towel. Never apply ice directly to bare skin.
                </p>
              </div>

              <div className="p-3 bg-[#0D0D0D] rounded-xl border border-[#262626]">
                <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1 uppercase tracking-wider text-[11px]">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Heat (Thermotherapy)</span>
                </div>
                <p className="text-[#888888]">
                  <strong className="text-white">When:</strong> Morning stiffness, chronic osteoarthritis tightness, before gentle stretching.
                </p>
                <p className="text-[#888888] mt-1">
                  <strong className="text-white">Duration:</strong> 15 minutes of moist heat to dilate vessels and loosen tendons.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Sleep Alignment & Pillow Positioning */}
          <div className="border border-[#262626] bg-[#161616] rounded-xl p-5">
            <div className="flex items-center gap-2 font-bold text-white text-sm uppercase tracking-wider mb-2 font-editorial">
              <Moon className="w-4 h-4 text-[#888888]" />
              <span>Nocturnal Joint Alignment</span>
            </div>
            <p className="text-xs text-[#888888] font-light mb-3">
              Poor sleeping alignment places torsion on the meniscus and collateral ligaments for 7-8 hours.
            </p>
            <div className="space-y-2 text-xs font-light">
              <div className="flex items-start gap-2.5 bg-[#0D0D0D] border border-[#262626] p-3 rounded-lg">
                <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span className="text-[#888888]"><strong className="text-white font-medium">Side Sleepers:</strong> Place a contour pillow between your knees to maintain neutral hip-knee-ankle alignment and eliminate inward rotational torque.</span>
              </div>
              <div className="flex items-start gap-2.5 bg-[#0D0D0D] border border-[#262626] p-3 rounded-lg">
                <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span className="text-[#888888]"><strong className="text-white font-medium">Back Sleepers:</strong> Place a small bolster under your knees/calves to preserve a comfortable 10-15° resting flexion without locking out the joint.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#161616] px-6 py-4 border-t border-[#262626] flex justify-end">
          <button
            onClick={onClose}
            className="bg-white hover:bg-[#E5E5E5] text-black px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
