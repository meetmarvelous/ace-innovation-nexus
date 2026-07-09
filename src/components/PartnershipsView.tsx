import React, { useState, useCallback } from 'react';
import { partnerTiers, regionPartners } from '../data';
import { RegionPartner } from '../types';
import { Network, Globe, CheckCircle2, ChevronRight, Sparkles, Send, ThumbsUp } from 'lucide-react';
import KineticText from './KineticText';

export default function PartnershipsView() {
  const [activePartner, setActivePartner] = useState<RegionPartner | null>(
    regionPartners.find(r => r.country === 'Nigeria') || regionPartners[0]
  );

  const triggerHaptic = useCallback((pattern: number | number[] = 15) => {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(pattern); } catch { /* silent */ }
    }
  }, []);

  // Partnership form states
  const [candidateOrg, setCandidateOrg] = useState('');
  const [candidateContact, setCandidateContact] = useState('');
  const [candidateType, setCandidateType] = useState('Tech & Development Partners');
  const [collaborationProposal, setCollaborationProposal] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateOrg || !candidateContact) return alert("Please fill in your organization name and email address.");
    
    triggerHaptic([20, 40, 20]);
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSuccess(true);
      triggerHaptic([30, 60, 30, 60, 30]);
    }, 1500);
  };

  const handleResetForm = () => {
    triggerHaptic(10);
    setCandidateOrg('');
    setCandidateContact('');
    setCollaborationProposal('');
    setFormSuccess(false);
  };

  return (
    <div className="w-full">
      
      {/* PARTNERSHIPS INTRO HERO */}
      <section className="relative py-16 lg:py-20 cosmic-section star-field" style={{ borderBottom: '1px solid rgba(139, 92, 246, 0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center max-w-3xl relative z-10">
          <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">Partnerships</span>
          <KineticText
            text="Let's Work Together"
            as="h1"
            variant="reveal"
            className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl font-display leading-[1.1]"
            delay={0.2}
          />
          <p className="mt-5 text-lg text-slate-400 leading-relaxed font-sans" style={{ animation: 'fade-in-up 0.8s ease 0.8s forwards', opacity: 0 }}>
            We partner with businesses, agencies, and organizations across Nigeria and beyond. Whether you need a reliable digital partner or want to collaborate on a project, we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* WHERE WE ARE */}
      <section className="relative py-20 lg:py-24 max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16 relative z-10">
          <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">Our Location</span>
          <h2 className="text-3xl font-black text-white font-display">Where We Are</h2>
          <p className="text-sm text-slate-400">Click the map point to see details about our office.</p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-stretch relative z-10">
          
          {/* Map area (left) */}
          <div className="lg:col-span-7 relative min-h-[380px] rounded-3xl overflow-hidden p-6 flex flex-col justify-between" style={{ background: 'linear-gradient(145deg, rgba(10, 10, 20, 0.95), rgba(15, 15, 40, 0.9))', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
            
            {/* Background subtle starry grids */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-purple-600/5 to-transparent pointer-events-none" />

            <div className="relative flex justify-between items-center z-10">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">OFFICE LOCATION</span>
              <div className="flex gap-1.5 items-center border px-2.5 py-1 rounded-full" style={{ background: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-semibold text-emerald-300 font-mono">OPEN FOR BUSINESS</span>
              </div>
            </div>

            {/* World map with node */}
            <div className="relative w-full h-[260px] my-auto">
              {regionPartners.map((node) => {
                const isActive = activePartner?.id === node.id;
                return (
                  <button
                    key={node.id}
                    id={`map-node-${node.id}`}
                    onClick={() => { triggerHaptic(15); setActivePartner(node); }}
                    style={{ top: node.latLng.top, left: node.latLng.left }}
                    className="absolute group -translate-x-1/2 -translate-y-1/2 focus:outline-none haptic-press"
                    title={`Office: ${node.country}`}
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Radiating pulse */}
                      <span className={`absolute inline-flex h-12 w-12 rounded-full opacity-60 transition-transform ${
                        isActive ? 'bg-purple-500/30 scale-102 animate-ping' : 'bg-slate-700/0 hover:scale-105'
                      }`} />
                      <span className={`absolute inline-flex h-7 w-7 rounded-full opacity-40 transition-transform ${
                        isActive ? 'bg-purple-500/50 animate-pulse' : 'bg-slate-700/20 group-hover:bg-purple-700/40'
                      }`} />
                      
                      {/* Center point */}
                      <div className={`relative h-4 w-4 rounded-full border-2 transition-all shadow-sm ${
                        isActive ? 'bg-white border-purple-500' : 'bg-slate-700 border-slate-600 group-hover:bg-slate-200'
                      }`} style={isActive ? { boxShadow: 'var(--glow-purple)' } : {}} />

                      {/* Label */}
                      <span className="absolute left-6 text-[10px] font-bold tracking-wider text-slate-300 px-2 py-0.5 rounded shadow-lg opacity-85 pointer-events-none uppercase whitespace-nowrap font-mono max-w-xs block glass-panel">
                        {node.country}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="relative text-left z-10 flex items-center gap-3 p-3 rounded-2xl glass-panel">
              <Globe className="h-5 w-5 text-purple-400 shrink-0" />
              <p className="text-[10px] sm:text-xs text-slate-400 font-sans tracking-wide">
                We're based in Nigeria but work with clients across Africa, Europe, and North America.
              </p>
            </div>

          </div>

          {/* Office detail (right) */}
          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative" style={{ background: 'rgba(6, 182, 212, 0.03)', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
            {activePartner ? (
              <div className="space-y-6 text-left">
                
                <div className="flex gap-4 items-center pb-5" style={{ borderBottom: '1px solid rgba(139, 92, 246, 0.15)' }}>
                  <div className="h-14 w-14 rounded-2xl p-2 border border-purple-500/20 flex items-center justify-center overflow-hidden" style={{ background: 'rgba(15, 15, 30, 0.6)' }}>
                    <img
                      referrerPolicy="no-referrer"
                      src={activePartner.logo}
                      alt={activePartner.country}
                      className="max-h-full max-w-full object-contain opacity-80"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 font-mono tracking-wider block uppercase">Office Location</span>
                    <h3 className="text-lg font-black text-white font-display leading-tight">{activePartner.name}</h3>
                    <span className="inline-block rounded border px-2.5 py-0.5 text-[9px] font-bold text-purple-300 tracking-wide font-mono mt-1.5 uppercase" style={{ background: 'rgba(139, 92, 246, 0.1)', borderColor: 'rgba(139, 92, 246, 0.2)' }}>
                      {activePartner.scale}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 font-mono block uppercase">About This Office</span>
                  <p className="text-sm text-slate-400 leading-relaxed font-sans">{activePartner.details}</p>
                </div>

                <div className="pt-5 space-y-3 text-xs" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)' }}>
                  <span className="font-bold text-slate-500 font-mono block uppercase">WHAT WE DO HERE</span>
                  <div className="flex items-center gap-2 text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Work with clients across Nigeria and internationally</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Marketing, content, photo, video & development</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center text-slate-500">
                <Network className="h-10 w-10 text-slate-600 stroke-dasharray animate-pulse" />
                <p className="text-xs font-semibold mt-2">Click a point on the map to see office details.</p>
              </div>
            )}

            <div className="mt-8 pt-5 flex items-center justify-between text-[11px] font-medium font-mono" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)' }}>
              <span className="text-slate-600">ACE INNOVATION NEXUS</span>
              <span className="text-purple-400 font-bold">NIGERIA 🇳🇬</span>
            </div>
          </div>

        </div>

      </section>

      {/* PARTNERSHIP OPTIONS */}
      <section className="relative py-20 lg:py-24 cosmic-section star-field" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)', borderBottom: '1px solid rgba(139, 92, 246, 0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">How We Partner</span>
            <h2 className="text-3xl font-black text-white font-display">Ways to Work With Us</h2>
            <p className="text-sm text-slate-400">We have three main ways we partner with other businesses and organizations.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {partnerTiers.map((tier) => (
              <div
                key={tier.id}
                className="group rounded-3xl p-6 sm:p-8 flex flex-col justify-between cosmic-card tilt-3d perspective-container relative"
              >
                <div className="space-y-5">
                  <div className="flex justify-between items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                      <Sparkles className="h-5 w-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white font-display leading-tight">{tier.name}</h3>
                    <p className="text-xs text-cyan-400 font-bold font-sans mt-1">{tier.tagline}</p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans mt-3">{tier.description}</p>

                  <div className="space-y-2 pt-4 text-xs" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)' }}>
                    <span className="font-bold text-slate-500 font-mono block uppercase">What You Get</span>
                    {tier.benefits.map((benefit, i) => (
                      <div key={i} className="flex gap-2 text-slate-400 leading-snug">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 flex items-center justify-between text-[11px] font-mono" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)' }}>
                  <span className="text-slate-600">FOR: {tier.targetAudience.toUpperCase()}</span>
                  <ChevronRight className="h-4 w-4 text-slate-600" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PARTNERSHIP FORM */}
      <section className="relative py-20 lg:py-24 max-w-4xl mx-auto px-6 sm:px-8 text-left">
        <div className="rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden cosmic-card" style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.1), 0 25px 50px rgba(0,0,0,0.3)' }}>
          
          <div className="absolute -right-12 -bottom-12 h-32 w-32 rounded-full pointer-events-none" style={{ background: 'rgba(139, 92, 246, 0.05)' }} />

          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold tracking-widest uppercase font-mono block gradient-text">Get In Touch</span>
            <h2 className="text-2xl font-black text-white mt-1.5 font-display">Start a Conversation</h2>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Interested in partnering with us? Fill in the form below and we'll get back to you within a few days.
            </p>
          </div>

          <div className="mt-8 pt-8 relative z-10" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.15)' }}>
            {formSuccess ? (
              <div className="rounded-2xl border p-6 text-center space-y-4" style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.15)', animation: 'fade-in-up 0.3s ease forwards' }}>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <ThumbsUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">Message Sent!</h3>
                  <p className="text-xs text-slate-400 mt-1.5 max-w-md mx-auto">
                    Thanks for reaching out! We've received your message and will get back to you within 2-3 business days.
                  </p>
                </div>
                <div className="rounded-xl p-4 text-left text-xs text-slate-300 max-w-sm mx-auto font-mono space-y-1 shadow-sm" style={{ background: 'rgba(15, 15, 30, 0.6)', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
                  <div><span className="text-slate-500">ORGANIZATION:</span> {candidateOrg}</div>
                  <div><span className="text-slate-500">PARTNERSHIP TYPE:</span> {candidateType}</div>
                  <div><span className="text-slate-500">STATUS:</span> <span className="text-emerald-400 font-bold">RECEIVED ✓</span></div>
                </div>
                <button
                  id="reset-part-form-btn"
                  onClick={handleResetForm}
                  className="rounded-lg border border-purple-500/20 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-purple-500/10 transition-colors haptic-press"
                  style={{ background: 'rgba(15, 15, 30, 0.6)' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitProposal} className="space-y-6">
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  
                  <div>
                    <label className="text-xs font-bold text-purple-300/80 uppercase tracking-wider font-mono">Organization Name</label>
                    <input
                      required
                      type="text"
                      className="mt-2 w-full rounded-xl px-4 py-3.5 text-sm cosmic-input"
                      placeholder="e.g. Your Company Name"
                      value={candidateOrg}
                      onChange={(e) => setCandidateOrg(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-purple-300/80 uppercase tracking-wider font-mono">Email Address</label>
                    <input
                      required
                      type="email"
                      className="mt-2 w-full rounded-xl px-4 py-3.5 text-sm cosmic-input"
                      placeholder="e.g. hello@company.com"
                      value={candidateContact}
                      onChange={(e) => setCandidateContact(e.target.value)}
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  
                  <div>
                    <label className="text-xs font-bold text-purple-300/80 uppercase tracking-wider font-mono">Type of Partnership</label>
                    <select
                      className="mt-2 w-full rounded-xl px-4 py-3.5 text-sm cosmic-select"
                      value={candidateType}
                      onChange={(e) => setCandidateType(e.target.value)}
                    >
                      <option>Business Consulting</option>
                      <option>Tech & Development Partners</option>
                      <option>Training & Education Partners</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-purple-300/80 uppercase tracking-wider font-mono">When Would You Like to Start?</label>
                    <select className="mt-2 w-full rounded-xl px-4 py-3.5 text-sm cosmic-select">
                      <option>As soon as possible</option>
                      <option>In the next 1-3 months</option>
                      <option>I'm flexible</option>
                    </select>
                  </div>

                </div>

                <div>
                  <label className="text-xs font-bold text-purple-300/80 uppercase tracking-wider font-mono">Tell Us More (Optional)</label>
                  <textarea
                    rows={4}
                    className="mt-2 w-full rounded-xl px-4 py-3.5 text-sm cosmic-input"
                    placeholder="Tell us a bit about what you're looking for..."
                    value={collaborationProposal}
                    onChange={(e) => setCollaborationProposal(e.target.value)}
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    id="submit-proposal-form-btn"
                    disabled={formLoading}
                    type="submit"
                    className="group flex items-center justify-center gap-1.5 rounded-xl px-5 py-3.5 text-sm font-semibold text-white transition-all neon-btn haptic-press"
                  >
                    {formLoading ? 'Sending...' : 'Send Message'}
                    <Send className="h-4 w-4" />
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
