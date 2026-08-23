import React, { useState } from 'react';
import { Language, PatientProfile } from '../types';
import { translations } from '../data/translations';
import {
  X,
  LifeBuoy,
  Phone,
  Mail,
  Calendar,
  AlertOctagon,
  HelpCircle,
  CheckCircle2,
  Send,
  ChevronDown,
  User,
} from 'lucide-react';

interface SupportModalProps {
  currentLanguage: Language;
  onClose: () => void;
  patientProfile?: PatientProfile;
}

export const SupportModal: React.FC<SupportModalProps> = ({ currentLanguage, onClose, patientProfile }) => {
  const t = translations[currentLanguage];
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [patientName, setPatientName] = useState(patientProfile?.name || '');
  const [patientMobile, setPatientMobile] = useState(patientProfile?.mobileNumber || '');
  const [patientEmail, setPatientEmail] = useState(patientProfile?.email || '');
  const [patientConcern, setPatientConcern] = useState('');

  const faqs = [
    {
      q: 'When should I seek immediate orthopedic medical attention?',
      a: 'Seek urgent evaluation if: you are unable to bear any weight on the leg, observe severe sudden knee swelling within 2 hours of trauma, experience a hot red joint accompanied by fever, or notice numbness/coldness in the foot.',
    },
    {
      q: 'How does Clinical AI calculate my joint recovery score and force load?',
      a: 'The KneeAI algorithm evaluates your self-reported Range of Motion (ROM), pain intensity (VAS 0-10), body mass index (4:1 joint compression multiplier), effusion symptoms, functional walking tolerance, and compliance with prescribed isometric/isotonic exercises.',
    },
    {
      q: 'Can physical therapy heal a meniscus tear without surgery?',
      a: 'Yes, conservative physical therapy focusing on quadriceps and hamstring strengthening is clinically proven to achieve outcomes equivalent to arthroscopic partial meniscectomy for many degenerative and stable tears.',
    },
    {
      q: 'Why are low-impact aquatic exercises recommended?',
      a: 'Water provides natural buoyancy that unloads up to 75-80% of your body weight while offering 12x the gentle fluid resistance of air, allowing muscle activation without articular joint compression.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-[#111111] rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#262626] overflow-hidden text-[#E5E5E5]"
        id="modal-support-specialist"
      >
        {/* Header */}
        <div className="bg-[#161616] px-6 py-5 border-b border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0D0D0D] border border-[#262626] text-white flex items-center justify-center">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-light tracking-tight font-editorial text-white">Clinical Support & Specialist Consult</h3>
              <p className="text-xs text-[#888888] font-light">Access licensed physical therapists, FAQs, and medical safety resources</p>
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
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs font-light text-[#E5E5E5]">
          {/* Medical Red-Flags Alert Box */}
          <div className="bg-rose-950/30 border border-rose-500/30 rounded-xl p-4 flex items-start gap-3 text-xs text-rose-300">
            <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-rose-200 font-semibold block mb-0.5">Clinical Safety Notice & Disclaimer:</strong>
              KneeAI Health is an evidence-based digital rehabilitation tool and does not replace emergency medical diagnosis. If you cannot bear weight or have severe acute trauma, please visit an urgent orthopedic care center immediately.
            </div>
          </div>

          {/* Contact Specialist Form */}
          <div className="bg-[#161616] border border-[#262626] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-white font-editorial">
                <Calendar className="w-4 h-4 text-[#888888]" />
                <span>Request Orthopedic Specialist Callback</span>
              </div>
              <span className="text-[10px] bg-[#0D0D0D] text-white border border-[#262626] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Response &lt; 4 hrs
              </span>
            </div>

            {formSubmitted ? (
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 text-center space-y-2">
                <CheckCircle2 className="w-7 h-7 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white font-editorial text-sm">Consultation Request Received!</h4>
                <p className="text-xs text-emerald-200 max-w-md mx-auto">
                  A licensed orthopedic physical therapist will review your clinical telemetry and contact <strong>{patientName || 'you'}</strong> at <strong>{patientMobile || patientEmail || 'your phone number'}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#888888] font-medium block mb-1">
                      Patient Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-3 py-2 bg-[#0D0D0D] border border-[#262626] rounded-lg text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#888888] font-medium block mb-1">
                      Mobile Number <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={patientMobile}
                      onChange={(e) => setPatientMobile(e.target.value)}
                      placeholder="e.g. +1 (555) 234-8901"
                      className="w-full px-3 py-2 bg-[#0D0D0D] border border-[#262626] rounded-lg text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#888888] font-medium block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      placeholder="e.g. eleanor@example.com"
                      className="w-full px-3 py-2 bg-[#0D0D0D] border border-[#262626] rounded-lg text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#888888] font-medium block mb-1">
                    Describe Knee Symptoms or Clinical Inquiries <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={patientConcern}
                    onChange={(e) => setPatientConcern(e.target.value)}
                    placeholder="e.g., Post-ACL reconstruction 6 weeks, struggling with terminal extension and lateral pain..."
                    className="w-full px-3 py-2 bg-[#0D0D0D] border border-[#262626] rounded-lg text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-white hover:bg-[#E5E5E5] text-black font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Frequently Asked Questions Accordion */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-white font-editorial">
              <HelpCircle className="w-4 h-4 text-[#888888]" />
              <span>Frequently Asked Clinical Questions</span>
            </div>

            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="border border-[#262626] rounded-xl overflow-hidden bg-[#161616]">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full px-4 py-3 text-left font-medium text-xs text-[#E5E5E5] flex items-center justify-between hover:bg-[#1A1A1A] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#888888] transition-transform ${
                          isOpen ? 'rotate-180 text-white' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-3.5 pt-1 text-xs text-[#AAAAAA] leading-relaxed border-t border-[#262626] bg-[#0D0D0D]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#161616] px-6 py-4 border-t border-[#262626] flex justify-end">
          <button
            onClick={onClose}
            className="border border-[#262626] hover:bg-[#222222] text-[#888888] hover:text-white px-6 py-2 rounded-full font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close Support
          </button>
        </div>
      </div>
    </div>
  );
};
