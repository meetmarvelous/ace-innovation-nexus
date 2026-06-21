import React, { useState, useCallback } from 'react';
import { ArrowUpRight, CheckCircle2, TrendingUp, Users, Target, Laptop, ChevronRight, Zap } from 'lucide-react';
import { caseStudies, staticInsights } from '../data';
import KineticText from './KineticText';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  openContactModal: () => void;
}

export default function HomeView({ setCurrentTab, openContactModal }: HomeViewProps) {
  // Calculator States
  const [sector, setSector] = useState<'FMCG' | 'Fintech' | 'Edtech' | 'Ecommerce'>('FMCG');
  const [traffic, setTraffic] = useState<number>(10000);
  const [leadSource, setLeadSource] = useState<'SEO' | 'Branding' | 'Product'>('SEO');

  const triggerHaptic = useCallback((pattern: number | number[] = 15) => {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(pattern); } catch { /* silent */ }
    }
  }, []);

  // Calculates estimated returns based on parameters selected
  const getGrowthEstimates = () => {
    let multiplier = 2.4;
    let conversionRate = 0.025;
    
    if (sector === 'Fintech') {
      multiplier = 3.6;
      conversionRate = 0.018;
    } else if (sector === 'Edtech') {
      multiplier = 4.1;
      conversionRate = 0.035;
    } else if (sector === 'Ecommerce') {
      multiplier = 2.9;
      conversionRate = 0.022;
    }

    if (leadSource === 'Branding') {
      conversionRate += 0.012;
    } else if (leadSource === 'Product') {
      conversionRate += 0.008;
    } else {
      multiplier += 0.5;
    }

    const estimatedTraffic = Math.round(traffic * multiplier);
    const estimatedLeads = Math.round(estimatedTraffic * conversionRate);
    const costReduction = sector === 'Fintech' ? '45%' : '35%';

    return {
      estimatedTraffic,
      estimatedLeads,
      costReduction
    };
  };

  const estimates = getGrowthEstimates();

  return (
    <div className="w-full">
      
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden py-20 lg:py-28 star-field cosmic-section">
        {/* Decorative cosmic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-purple-300 border border-purple-500/25" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                <Zap className="h-3.5 w-3.5 fill-purple-400 text-purple-400" />
                Africa's Premier Digital Agency
              </span>

              <div className="perspective-container">
                <KineticText
                  text="Helping Brands"
                  as="h1"
                  variant="reveal"
                  className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl font-display leading-[1.1]"
                  delay={0.2}
                />
                <KineticText
                  text="Grow, Connect & Scale"
                  as="h1"
                  variant="shimmer"
                  className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl font-display leading-[1.1] mt-1"
                  delay={0.8}
                />
              </div>

              <p className="max-w-xl text-lg text-slate-400 leading-relaxed font-sans" style={{ animation: 'fade-in-up 0.8s ease 1s forwards', opacity: 0 }}>
                A full-service digital, media & creative partner delivering architectural precision across Marketing, Branding, Content, Training and Tech high-performance development. Built to accelerate market leadership.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4" style={{ animation: 'fade-in-up 0.8s ease 1.2s forwards', opacity: 0 }}>
                <button
                  id="hero-cta-contact"
                  onClick={() => { triggerHaptic(25); openContactModal(); }}
                  className="group flex items-center justify-center gap-1.5 rounded-xl px-6 py-4 text-sm font-bold text-white shadow-md neon-btn haptic-press"
                >
                  Schedule Strategy Audit
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <button
                  id="hero-cta-work"
                  onClick={() => {
                    triggerHaptic(15);
                    setCurrentTab('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center gap-1 rounded-xl border border-purple-500/25 bg-purple-500/5 px-6 py-4 text-sm font-bold text-purple-300 hover:bg-purple-500/10 hover:border-purple-500/40 transition-all haptic-press"
                >
                  Explore Our Impact
                </button>
              </div>

              {/* Trust Metric list */}
              <div className="grid grid-cols-2 gap-6 pt-10" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.15)', animation: 'fade-in-up 0.8s ease 1.4s forwards', opacity: 0 }}>
                <div>
                  <div className="text-2xl font-black text-white font-display text-glow-purple">94%+</div>
                  <div className="text-xs text-slate-500 font-medium font-sans uppercase tracking-wider mt-1">Client Retention Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-black font-display gradient-text">$12M+</div>
                  <div className="text-xs text-slate-500 font-medium font-sans uppercase tracking-wider mt-1">Client Transaction Volume</div>
                </div>
              </div>

            </div>

            {/* Right Media Wrapper — 3D Character */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Cosmic glow behind character */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-80 h-80 rounded-full animate-glow"
                  style={{
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 70%)',
                  }}
                />
              </div>
              {/* Orbital ring */}
              <div
                className="absolute w-72 h-72 rounded-full border border-purple-500/10"
                style={{ animation: 'cosmic-rotate 30s linear infinite' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400/50" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400/50" />
              </div>
              <div
                className="relative animate-float"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.2))',
                  animation: 'float 5s ease-in-out infinite, fade-in-up 1s ease 0.5s forwards',
                  opacity: 0,
                }}
              >
                <img
                  src="/images/hero-character.png"
                  alt="Tega - Founder & Chief Growth Architect"
                  className="w-full max-w-md h-auto object-contain rounded-2xl"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE BRAND ACCELERATOR ENGINE */}
      <section className="relative py-20 lg:py-24 cosmic-section" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)', borderBottom: '1px solid rgba(139, 92, 246, 0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">Simulate Capital Efficiency</span>
            <KineticText
              text="Brand Growth Estimation Engine"
              as="h2"
              variant="reveal"
              className="text-3xl font-black tracking-tight text-white sm:text-4xl font-display"
              delay={0.1}
              stagger={0.02}
            />
            <p className="text-base text-slate-400 font-sans">
              Adjust parameters below representing your brand segments and current inbound reach. Observe estimated organic metrics generated by our proven full-service architectural benchmarks.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
            
            {/* Control Panel (left) */}
            <div className="lg:col-span-6 rounded-2xl p-6 sm:p-8 flex flex-col justify-between cosmic-card" style={{ background: 'rgba(15, 15, 30, 0.6)', backdropFilter: 'blur(10px)' }}>
              <div className="space-y-6">
                
                {/* 1. Sector Target Selection */}
                <div>
                  <label className="text-xs font-bold text-purple-300/80 uppercase tracking-wider font-mono">Business Segment</label>
                  <div className="grid grid-cols-2 gap-3 mt-2.5">
                    {[
                      { id: 'FMCG', label: 'FMCG Retail' },
                      { id: 'Fintech', label: 'FinTech Banking' },
                      { id: 'Edtech', label: 'Edtech & Training' },
                      { id: 'Ecommerce', label: 'E-Commerce' }
                    ].map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => { triggerHaptic(10); setSector(sec.id as any); }}
                        className={`rounded-xl px-4 py-3 text-xs font-semibold border transition-all text-center haptic-press ${
                          sector === sec.id
                            ? 'bg-purple-500/15 border-purple-500/40 text-purple-300 shadow-sm'
                            : 'bg-white/3 border-purple-500/10 text-slate-400 hover:bg-purple-500/5 hover:text-slate-200'
                        }`}
                      >
                        {sec.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Monthly Audience Slider */}
                <div>
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-purple-300/80 uppercase tracking-wider font-mono">Current Monthly Reach</label>
                    <span className="text-sm font-bold text-white font-mono">{traffic.toLocaleString()} Visitors</span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="100000"
                    step="2000"
                    value={traffic}
                    onChange={(e) => { triggerHaptic(5); setTraffic(Number(e.target.value)); }}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer mt-3"
                    style={{ background: 'linear-gradient(90deg, var(--cosmic-accent), var(--cosmic-cyan))', accentColor: 'var(--cosmic-accent)' }}
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-bold tracking-wide mt-2">
                    <span>2k MIN</span>
                    <span>50k MID</span>
                    <span>100k MAX</span>
                  </div>
                </div>

                {/* 3. Primary Value Driver Selector */}
                <div>
                  <label className="text-xs font-bold text-purple-300/80 uppercase tracking-wider font-mono">Growth Lever Focus</label>
                  <div className="grid grid-cols-3 gap-2.5 mt-2.5">
                    {[
                      { id: 'SEO', icon: TrendingUp, label: 'SEO Clusters' },
                      { id: 'Branding', icon: Target, label: 'Video Branding' },
                      { id: 'Product', icon: Laptop, label: 'High-Perf Tech' }
                    ].map((driver) => {
                      const Icon = driver.icon;
                      return (
                        <button
                          key={driver.id}
                          onClick={() => { triggerHaptic(10); setLeadSource(driver.id as any); }}
                          className={`rounded-xl p-3 border text-center transition-all flex flex-col items-center gap-1.5 haptic-press ${
                            leadSource === driver.id
                              ? 'bg-purple-500/15 border-purple-500/40 text-purple-300 shadow-sm'
                              : 'bg-white/3 border-purple-500/10 text-slate-400 hover:bg-purple-500/5 hover:text-cyan-300'
                          }`}
                        >
                          <Icon className="h-4.5 w-4.5" />
                          <span className="text-[10px] font-bold tracking-tight">{driver.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              <div className="pt-8 mt-8" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.15)' }}>
                <button
                  id="calc-consultation-btn"
                  onClick={() => { triggerHaptic(25); openContactModal(); }}
                  className="w-full rounded-xl py-3.5 text-center text-xs font-bold text-white transition-all neon-btn haptic-press"
                >
                  Lock In Personalized Growth Brief
                </button>
              </div>

            </div>

            {/* Live Outputs Plot (right) */}
            <div className="lg:col-span-6 rounded-2xl border border-cyan-500/15 p-6 sm:p-8 flex flex-col justify-between" style={{ background: 'rgba(6, 182, 212, 0.03)' }}>
              <div>
                <span className="text-[10px] font-bold uppercase font-mono tracking-widest block mb-4 gradient-text">Interactive Calculation Output</span>
                
                <div className="space-y-6">
                  
                  {/* Est Traffic Output */}
                  <div className="cosmic-card rounded-xl p-5">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-sans block">Estimated Monthly Organic Reach</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-black text-white font-display text-glow-cyan">
                        {estimates.estimatedTraffic.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold font-mono tracking-wide gradient-text">
                        (+{(Math.round((estimates.estimatedTraffic / traffic) * 100) - 100)}% Lift)
                      </span>
                    </div>
                  </div>

                  {/* Est Leads Output */}
                  <div className="cosmic-card rounded-xl p-5">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-sans block">Target Monthly Business Inquiries</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-black text-white font-display text-glow-purple">
                        {estimates.estimatedLeads.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-purple-400 font-mono tracking-wide">Qualified Leads / Mo</span>
                    </div>
                  </div>

                  {/* Estimated Cost Reduction */}
                  <div className="cosmic-card rounded-xl p-5">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-sans block">Targeted CPA (Cost Per Acquisition) Decline</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-black text-emerald-400 font-display" style={{ textShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}>
                        -{estimates.costReduction}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">Ad Spending Efficiency</span>
                    </div>
                  </div>

                </div>

              </div>

              <div className="mt-8 cosmic-card p-4 rounded-xl text-xs text-slate-400 flex gap-3 leading-relaxed items-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                <p>This estimate assumes organic clusters matching HP LIFE adoption curves and Checkers digital engagement baselines.</p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: IMPACT & CASE STUDIES SNAPSHOT */}
      <section className="relative py-20 lg:py-24 cosmic-section star-field">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10" style={{ borderBottom: '1px solid rgba(139, 92, 246, 0.15)' }}>
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">Our Impact in Action</span>
              <KineticText
                text="Featured Growth Operations"
                as="h2"
                variant="reveal"
                className="text-3xl font-black tracking-tight text-white sm:text-4xl font-display"
                delay={0.1}
                stagger={0.02}
              />
            </div>
            <button
              id="home-view-all-projects"
              onClick={() => {
                triggerHaptic(15);
                setCurrentTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 text-sm font-bold text-purple-300 hover:text-cyan-300 group mt-2 transition-colors haptic-press"
            >
              See All Detailed Case Studies
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((project, idx) => (
              <div
                key={project.id}
                className="group flex flex-col justify-between rounded-2xl p-5 cosmic-card perspective-container"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div>
                  <div className="relative aspect-video overflow-hidden rounded-xl" style={{ background: 'rgba(15, 15, 30, 0.5)' }}>
                    <img
                      referrerPolicy="no-referrer"
                      src={project.image}
                      alt={project.client}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute top-3 left-3 rounded-lg px-2.5 py-1 text-[10px] font-bold text-purple-200 uppercase tracking-wider font-mono glass-panel">
                      {project.category}
                    </div>
                  </div>
                  
                  <h3 className="mt-5 text-xs font-bold text-cyan-400">{project.client}</h3>
                  <h4 className="mt-2 text-lg font-bold text-white leading-snug group-hover:text-purple-300 font-display transition-colors">
                    {project.title}
                  </h4>
                  <p className="mt-3 text-sm text-slate-400 line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 pt-5 flex items-center justify-between" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)' }}>
                  <div className="flex gap-4">
                    {project.metrics.slice(0, 2).map((met, i) => (
                      <div key={i}>
                        <div className="text-base font-extrabold text-white font-display leading-[1]">{met.value}</div>
                        <div className="text-[10px] text-slate-500 font-medium font-mono mt-0.5">{met.label}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    id={`view-study-${project.id}`}
                    onClick={() => {
                      triggerHaptic(15);
                      setCurrentTab('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-purple-500/20 text-slate-400 transition-all group-hover:bg-purple-500/20 group-hover:text-purple-300 group-hover:border-purple-500/40 haptic-press"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: INSIGHTS & INTEL */}
      <section className="relative py-20 lg:py-24 cosmic-section" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">Knowledge Center</span>
            <KineticText
              text="Latest Insights & Perspectives"
              as="h2"
              variant="reveal"
              className="text-3xl font-black tracking-tight text-white sm:text-4xl font-display"
              delay={0.1}
              stagger={0.02}
            />
            <p className="text-base text-slate-400">
              Thought leadership from architects dedicated to organic visibility, core web engineering, and visual equity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {staticInsights.map((article, idx) => (
              <div
                key={article.id}
                className="group flex flex-col justify-between rounded-2xl p-4.5 cosmic-card"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div>
                  <div className="aspect-11/8 overflow-hidden rounded-xl relative" style={{ background: 'rgba(15, 15, 30, 0.5)' }}>
                    <img
                      referrerPolicy="no-referrer"
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-75 group-hover:opacity-100"
                    />
                    <div className="absolute bottom-3 left-3 rounded-lg px-2 py-1 text-[9px] font-bold text-cyan-200 tracking-wider font-mono glass-panel">
                      {article.category}
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-slate-500 font-mono tracking-wider block mt-4 uppercase">
                    {article.date} &bull; {article.readTime}
                  </span>
                  
                  <h3 className="mt-2 text-sm font-bold text-white group-hover:text-purple-300 transition-colors leading-snug font-display">
                    {article.title}
                  </h3>
                  
                  <p className="mt-2.5 text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)' }}>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px] font-bold text-purple-300">
                      {article.author.split(' ')[0][0]}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400">{article.author}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-purple-400 transition-transform group-hover:translate-x-0.5" />
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
