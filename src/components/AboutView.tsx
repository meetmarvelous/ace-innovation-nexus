import React, { useState, useCallback } from 'react';
import { teamMembers } from '../data';
import { TeamMember } from '../types';
import { Target, Lightbulb, Compass, Award, User, ChevronRight, MessageSquareCode } from 'lucide-react';
import KineticText from './KineticText';

export default function AboutView() {
  const [activeLeader, setActiveLeader] = useState<TeamMember | null>(teamMembers[0]);

  const triggerHaptic = useCallback((pattern: number | number[] = 15) => {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(pattern); } catch { /* silent */ }
    }
  }, []);

  const stats = [
    { value: "100%", label: "Remote-First Delivery Strategy" },
    { value: "4.9/5", label: "Client Sourcing Satisfaction" },
    { value: "$12M+", label: "Total Client Conversion Volume" },
    { value: "3+", label: "Operational Hub Networks" }
  ];

  const valueTenets = [
    {
      title: "Pragmatic Precision",
      icon: Target,
      desc: "We do not sell abstract vanity impressions. Every line of React code, pixel of packaging design, and semantic keyword cluster must maps directly to quantifiable client business scale."
    },
    {
      title: "Radical Directness",
      icon: Lightbulb,
      desc: "If your current paid conversion infrastructure contains leakage (such as inflated cost-per-clicks or high hydration load times), we present analytical diagnostics directly rather than sugar-coating performance reports."
    },
    {
      title: "Architectural Focus",
      icon: Compass,
      desc: "Our designs and technical backends are engineered for long-term endurance, delivering lightning-fast indexable rendering, minimal framework payloads, and highly visible digital assets."
    }
  ];

  return (
    <div className="w-full">
      
      {/* LANDING SECTION */}
      <section className="relative py-16 lg:py-20 cosmic-section star-field" style={{ borderBottom: '1px solid rgba(139, 92, 246, 0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center max-w-3xl relative z-10">
          <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">Our Founding Manifesto</span>
          <div className="mt-4">
            <KineticText
              text="Architects of"
              as="h1"
              variant="reveal"
              className="text-4xl font-black tracking-tight text-white sm:text-5xl font-display leading-[1.1] inline"
              delay={0.2}
            />
            {' '}
            <KineticText
              text="Digital Growth"
              as="span"
              variant="shimmer"
              className="text-4xl font-black tracking-tight sm:text-5xl font-display leading-[1.1]"
              delay={0.8}
            />
          </div>
          <p className="mt-5 text-lg text-slate-400 leading-relaxed font-sans" style={{ animation: 'fade-in-up 0.8s ease 1s forwards', opacity: 0 }}>
            Ace Innovation Nexus is more than a creative shop. We are systematic operators working across engineering, branding, content, and search loops. Yes, we build fast websites—but more importantly, we construct client market leadership.
          </p>
        </div>
      </section>

      {/* CORE TIMELINE STORY GRID */}
      <section className="relative py-20 lg:py-24 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center relative z-10">
          
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase font-mono tracking-widest block gradient-text">Building the Bridge</span>
            <h2 className="text-2xl font-black text-white sm:text-3xl font-display leading-tight">
              Bridging local brilliance with hyper-performing international channels.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              Our history began with a straightforward observation: regional brands and outstanding public upsellers (such as HP LIFE) create exceptional value but often lack the specialized performance platforms to scale on search models and capture wider trust. 
            </p>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              We assembled a cross-functional squad of technical frontend engineers, semantic SEO managers, and visual consumer branding specialists. By replacing manual workflows with optimized headless setups, geofenced campaigns, and automated WhatsApp funnels, we turned standard websites into high-conversion machinery.
            </p>
            <div className="pt-4 grid grid-cols-2 gap-4">
              <div style={{ borderLeft: '2px solid var(--cosmic-accent)' }} className="pl-4">
                <span className="text-xs font-bold uppercase text-slate-500 font-mono">ESTABLISHED IN</span>
                <p className="text-lg font-bold text-white font-display">Sub-Saharan Africa</p>
              </div>
              <div style={{ borderLeft: '2px solid var(--cosmic-cyan)' }} className="pl-4">
                <span className="text-xs font-bold uppercase text-slate-500 font-mono">RELIABLE STABILITY</span>
                <p className="text-lg font-bold text-white font-display">94% Client Retention</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-1 rounded-2xl animate-glow opacity-30"
              style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.2))' }}
            />
            <div className="relative rounded-2xl p-2 cosmic-card">
              <img
                src="/images/team-characters.png"
                alt="Ace Innovation Nexus Team"
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </div>

        </div>
      </section>

      {/* CORE CORPORATE VALUES */}
      <section className="relative py-20 lg:py-24 cosmic-section star-field" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)', borderBottom: '1px solid rgba(139, 92, 246, 0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">Our Core Commitments</span>
            <h2 className="text-3xl font-black text-white font-display">The Non-Negotiables</h2>
            <p className="text-sm text-slate-400">We run our agency operations with strict adherence to quantitative value metrics.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {valueTenets.map((tenet, idx) => {
              const Icon = tenet.icon;
              return (
                <div key={idx} className="rounded-2xl p-6 sm:p-8 flex flex-col justify-between cosmic-card tilt-3d perspective-container">
                  <div className="space-y-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    <h3 className="text-lg font-bold text-white font-display">{tenet.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-sans">{tenet.desc}</p>
                  </div>
                  <div className="mt-8 pt-4 flex items-center justify-between text-[11px] font-bold font-mono" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)' }}>
                    <span className="text-slate-600">RULE {idx + 1} OF 3</span>
                    <span className="text-emerald-400">VERIFIED • OK</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* INTERACTIVE SHOCK TEAM SECTION */}
      <section className="relative py-20 lg:py-24 max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 relative z-10">
          <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">Interactive Panel</span>
          <h2 className="text-3xl font-black text-white font-display">Meet the Growth Architects</h2>
          <p className="text-sm text-slate-400">Select a manager card below to load their specialized growth narrative and individual credentials in the diagnostic reader panel.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch relative z-10">
          
          {/* Leaders Carousel Selection (left list) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {teamMembers.map((member) => {
              const isSelected = activeLeader?.id === member.id;
              return (
                <div
                  key={member.id}
                  onClick={() => { triggerHaptic(10); setActiveLeader(member); }}
                  className={`group cursor-pointer rounded-2xl p-4.5 transition-all flex items-center gap-4 haptic-press ${
                    isSelected
                      ? 'cosmic-card'
                      : 'border border-purple-500/10 hover:border-purple-500/25'
                  }`}
                  style={isSelected ? { borderColor: 'rgba(139, 92, 246, 0.35)', boxShadow: 'var(--glow-purple)' } : { background: 'rgba(15, 15, 30, 0.4)' }}
                >
                  <img
                    referrerPolicy="no-referrer"
                    src={member.avatar}
                    alt={member.name}
                    className="h-16 w-16 rounded-xl object-cover border border-purple-500/20 opacity-85"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white font-display group-hover:text-purple-300 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium font-sans mt-0.5">{member.role}</p>
                    <span className="inline-block rounded-md px-2 py-0.5 text-[9px] font-bold text-cyan-300 tracking-wider font-mono border border-cyan-500/20 mt-1.5" style={{ background: 'rgba(6, 182, 212, 0.1)' }}>
                      {member.department.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Diagnostic Active Reader Panel (right viewport) */}
          <div className="lg:col-span-5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between" style={{ background: 'rgba(6, 182, 212, 0.03)', border: '1px dashed rgba(6, 182, 212, 0.15)' }}>
            {activeLeader ? (
              <div className="space-y-6">
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest font-mono gradient-text">Active Architect Diagnostics</span>
                    <h3 className="text-xl font-bold text-white font-display mt-1">{activeLeader.name}</h3>
                    <p className="text-xs text-purple-400 font-mono mt-0.5 uppercase tracking-wide">{activeLeader.role}</p>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <User className="h-3.5 w-3.5 text-purple-300" />
                  </div>
                </div>

                <div className="cosmic-card p-4.5 rounded-xl text-sm italic text-slate-300 relative">
                  <span className="absolute -top-3 left-4 px-2 py-0.5 text-[8px] font-bold tracking-widest font-mono uppercase rounded rounded-bl-none" style={{ background: 'linear-gradient(135deg, var(--cosmic-accent), var(--cosmic-cyan))', color: 'white' }}>Manifesto Statement</span>
                  <p className="mt-1 font-sans">
                    "{activeLeader.bio}"
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-500 font-mono block uppercase">Operational Strengths</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLeader.department === 'Leadership' && ['Global Strategy', 'Venture Capital Coordination', 'Corporate Development'].map(t => (
                      <span key={t} className="rounded-md border border-purple-500/15 px-2 py-1 font-medium text-slate-300" style={{ background: 'rgba(15, 15, 30, 0.6)' }}>{t}</span>
                    ))}
                    {activeLeader.department === 'Creative & Brand' && ['Visual Packaging Redesign', '3D Media Production', 'Interactive Social Filters'].map(t => (
                      <span key={t} className="rounded-md border border-purple-500/15 px-2 py-1 font-medium text-slate-300" style={{ background: 'rgba(15, 15, 30, 0.6)' }}>{t}</span>
                    ))}
                    {activeLeader.department === 'Marketing & SEO' && ['Semantic Topic Clustering', 'Heuristic Auditing', 'Organics Acquisition'].map(t => (
                      <span key={t} className="rounded-md border border-purple-500/15 px-2 py-1 font-medium text-slate-300" style={{ background: 'rgba(15, 15, 30, 0.6)' }}>{t}</span>
                    ))}
                    {activeLeader.department === 'Tech & Product' && ['React / Headless PWAs', 'Secured Express Frameworks', 'Low-Latency Cache Design'].map(t => (
                      <span key={t} className="rounded-md border border-purple-500/15 px-2 py-1 font-medium text-slate-300" style={{ background: 'rgba(15, 15, 30, 0.6)' }}>{t}</span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between font-mono text-[10px]" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)' }}>
                  <span className="text-slate-600">RECORD_ID: {activeLeader.id.toUpperCase()}</span>
                  <span className="text-emerald-400 font-bold uppercase">● SECURE ADVISOR</span>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center text-slate-500">
                <User className="h-8 w-8 text-slate-600 stroke-dasharray animate-pulse" />
                <p className="text-xs font-semibold mt-2">Select an advisor on the left to read their bio pipeline.</p>
              </div>
            )}
          </div>

        </div>

      </section>

      {/* CORE STATS EMBASSY BANNER */}
      <section className="relative py-14" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(15, 15, 30, 0.95) 50%, rgba(6, 182, 212, 0.08) 100%)', borderTop: '1px solid rgba(139, 92, 246, 0.15)' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            {stats.map((st, idx) => (
              <div key={idx}>
                <div className="text-3xl font-black font-display gradient-text">{st.value}</div>
                <div className="text-[10px] uppercase font-bold text-slate-500 mt-1.5 font-mono tracking-widest">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
