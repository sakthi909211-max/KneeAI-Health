import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { X, Apple, CheckCircle2, AlertTriangle, Droplets, Fish, Sparkles, Utensils, Heart } from 'lucide-react';

interface NutritionModalProps {
  currentLanguage: Language;
  onClose: () => void;
}

export const NutritionModal: React.FC<NutritionModalProps> = ({ currentLanguage, onClose }) => {
  const t = translations[currentLanguage];
  const [selectedCategory, setSelectedCategory] = useState<'superfoods' | 'avoid' | 'mealplan'>('superfoods');

  const superfoods = [
    {
      title: 'Wild-Caught Salmon & Mackerel (Omega-3 EPA/DHA)',
      benefit: 'Significantly lowers production of inflammatory prostaglandins (PGE2) and cartilage-degrading cytokines in synovial fluid.',
      dosage: '3 servings weekly (150g per serving)',
      icon: 'fish',
    },
    {
      title: 'Dark Blueberries & Blackberries (Anthocyanins)',
      benefit: 'High antioxidant capacity protects chondrocytes (cartilage cells) from oxidative stress and accelerated wear.',
      dosage: '1 cup fresh or frozen daily',
      icon: 'sparkles',
    },
    {
      title: 'Spinach, Kale & Bok Choy (Vitamin K & Magnesium)',
      benefit: 'Crucial for bone density surrounding the subchondral knee plate and essential for cartilage mineralization control.',
      dosage: '2 generous cups daily in salads or steamed',
      icon: 'leaf',
    },
    {
      title: 'Raw Walnuts & Chia Seeds (ALA Plant Omegas)',
      benefit: 'Provides alpha-linolenic acid supporting cell membrane resilience and joint lubrication.',
      dosage: '30g (a small handful) daily',
      icon: 'heart',
    },
    {
      title: 'Turmeric + Black Pepper (Curcumin + Piperine)',
      benefit: 'Curcumin blocks NF-kB inflammatory cascade; piperine enhances absorption by 2000%. Proven in trials to match mild NSAID pain relief.',
      dosage: '500-1000mg standardized extract with meals',
      icon: 'sparkles',
    },
  ];

  const foodsToAvoid = [
    {
      item: 'High-Fructose Corn Syrup & Refined Sugars',
      reason: 'Triggers systemic AGEs (Advanced Glycation End-products) that stiffen collagen in knee tendons and ligaments.',
    },
    {
      item: 'Deep-Fried Foods & Trans Fats',
      reason: 'Elevates C-reactive protein (CRP) and accelerates synovial membrane swelling.',
    },
    {
      item: 'Excess Sodium / Highly Processed Snacks',
      reason: 'Causes fluid retention that can exacerbate localized joint effusion (water on the knee).',
    },
    {
      item: 'Excess Alcohol & Saturated Fats',
      reason: 'Disrupts natural muscle recovery pathways and suppresses deep-stage cellular cartilage repair during sleep.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-[#111111] rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#262626] overflow-hidden text-[#E5E5E5]"
        id="modal-nutrition-guide"
      >
        {/* Header */}
        <div className="bg-[#161616] px-6 py-5 border-b border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0D0D0D] border border-[#262626] text-white flex items-center justify-center">
              <Apple className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-light tracking-tight font-editorial text-white">Clinical Nutrition Protocol</h3>
              <p className="text-xs text-[#888888] font-light">Evidence-based joint healing & anti-inflammatory dietary roadmap</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#888888] hover:text-white p-2 rounded-full hover:bg-[#262626] transition-colors cursor-pointer"
            id="btn-close-nutrition-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-[#262626] px-6 bg-[#0D0D0D] overflow-x-auto">
          <button
            onClick={() => setSelectedCategory('superfoods')}
            className={`py-3 px-4 font-semibold text-xs uppercase tracking-wider border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === 'superfoods'
                ? 'border-white text-white'
                : 'border-transparent text-[#888888] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Anti-Inflammatory Superfoods</span>
          </button>
          <button
            onClick={() => setSelectedCategory('avoid')}
            className={`py-3 px-4 font-semibold text-xs uppercase tracking-wider border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === 'avoid'
                ? 'border-white text-white'
                : 'border-transparent text-[#888888] hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Foods to Avoid</span>
          </button>
          <button
            onClick={() => setSelectedCategory('mealplan')}
            className={`py-3 px-4 font-semibold text-xs uppercase tracking-wider border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === 'mealplan'
                ? 'border-white text-white'
                : 'border-transparent text-[#888888] hover:text-white'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Sample 3-Day Plan</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {selectedCategory === 'superfoods' && (
            <div className="space-y-4">
              <div className="bg-[#161616] p-4 rounded-xl border border-[#262626] text-xs text-[#E5E5E5] flex items-center gap-3">
                <Droplets className="w-5 h-5 text-[#888888] shrink-0" />
                <div className="font-light">
                  <strong className="text-white font-semibold">Hydration Milestone:</strong> Ensure minimum 2.5 - 3.0 liters of water daily. Synovial fluid in the knee joint is 80% water and requires hydration to cushion impact.
                </div>
              </div>

              {superfoods.map((food, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-[#262626] bg-[#161616] hover:border-[#666666] transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-white text-sm font-editorial tracking-wide">{food.title}</h4>
                    <span className="text-[10px] uppercase tracking-wider bg-[#0D0D0D] text-[#888888] border border-[#262626] px-2.5 py-0.5 rounded-full font-semibold shrink-0">
                      {food.dosage}
                    </span>
                  </div>
                  <p className="text-xs text-[#888888] font-light mt-1.5 leading-relaxed">{food.benefit}</p>
                </div>
              ))}
            </div>
          )}

          {selectedCategory === 'avoid' && (
            <div className="space-y-4">
              <p className="text-xs text-[#888888] font-light">
                These foods provoke systemic biochemical inflammation, promoting swelling inside the joint capsule and slowing down collagen synthesis.
              </p>
              {foodsToAvoid.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-rose-900/40 bg-rose-950/20 flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-rose-200 text-xs uppercase tracking-wider">{item.item}</h4>
                    <p className="text-xs text-rose-300/80 mt-1 font-light">{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedCategory === 'mealplan' && (
            <div className="space-y-4 text-xs font-light">
              <div className="border border-[#262626] bg-[#161616] rounded-xl p-4">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest block mb-2 font-editorial">Day 1: Joint Recovery Baseline</span>
                <p className="text-[#E5E5E5]"><strong className="text-white font-semibold">Breakfast:</strong> Steel-cut oatmeal topped with crushed walnuts, chia seeds, and fresh blueberries.</p>
                <p className="text-[#E5E5E5] mt-1.5"><strong className="text-white font-semibold">Lunch:</strong> Mediterranean salad with grilled salmon, avocado, baby spinach, and extra virgin olive oil vinaigrette.</p>
                <p className="text-[#E5E5E5] mt-1.5"><strong className="text-white font-semibold">Dinner:</strong> Turmeric-ginger chicken broth with steamed bok choy, carrots, and quinoa.</p>
              </div>

              <div className="border border-[#262626] bg-[#161616] rounded-xl p-4">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest block mb-2 font-editorial">Day 2: Collagen Synthesis Focus</span>
                <p className="text-[#E5E5E5]"><strong className="text-white font-semibold">Breakfast:</strong> Greek yogurt with raspberries, flaxseeds, and a sprinkle of cinnamon.</p>
                <p className="text-[#E5E5E5] mt-1.5"><strong className="text-white font-semibold">Lunch:</strong> Quinoa bowl with pan-seared mackerel, steamed broccoli, edamame, and tahini dressing.</p>
                <p className="text-[#E5E5E5] mt-1.5"><strong className="text-white font-semibold">Dinner:</strong> Grass-fed beef or lentil soup with bone broth, sweet potato, and dark leafy greens.</p>
              </div>

              <div className="border border-[#262626] bg-[#161616] rounded-xl p-4">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest block mb-2 font-editorial">Day 3: Mobility & Fluid Balance</span>
                <p className="text-[#E5E5E5]"><strong className="text-white font-semibold">Breakfast:</strong> Green smoothie with kale, cucumber, green apple, chia seeds, and plant protein.</p>
                <p className="text-[#E5E5E5] mt-1.5"><strong className="text-white font-semibold">Lunch:</strong> Wild tuna steak salad with mixed greens, walnuts, and lemon-herb olive oil.</p>
                <p className="text-[#E5E5E5] mt-1.5"><strong className="text-white font-semibold">Dinner:</strong> Baked cod with roasted turmeric cauliflower and garlic asparagus.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#161616] px-6 py-4 border-t border-[#262626] flex justify-end">
          <button
            onClick={onClose}
            className="bg-white hover:bg-[#E5E5E5] text-black px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Understood & Close
          </button>
        </div>
      </div>
    </div>
  );
};
