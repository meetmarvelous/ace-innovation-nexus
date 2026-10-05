import React, { useCallback, useState, useEffect } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronRight, Zap, MessageSquare, ClipboardList, Rocket, BarChart3 } from 'lucide-react';
import { caseStudies as defaultCaseStudies, staticInsights as defaultInsights } from '../data';
import { getInsightArticles, getCaseStudies } from '../lib/dataService';
import { CaseStudy, InsightArticle } from '../types';
import KineticText from './KineticText';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  openContactModal: () => void;
}

export default function HomeView({ setCurrentTab, openContactModal }: HomeViewProps) {
  const [insightList, setInsightList] = useState<InsightArticle[]>(defaultInsights);
  const [caseStudyList, setCaseStudyList] = useState<CaseStudy[]>(defaultCaseStudies);

  useEffect(() => {
    getInsightArticles().then(setInsightList).catch(() => {});
    getCaseStudies().then(setCaseStudyList).catch(() => {});
  }, []);

  const triggerHaptic = useCallback((pattern: number | number[] = 15) => {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(pattern); } catch { /* silent */ }
    }
  }, []);

  const processSteps = [
    {
      step: "01",
      title: "Discovery",
      icon: MessageSquare,
      description: "We sit down with you (in person or online) to understand your business, your goals, and what's not working right now."
    },
    {
      step: "02",
      title: "Planning",
      icon: ClipboardList,
      description: "We put together a clear plan — what we'll do, how long it'll take, and what results you can expect."
    },
    {
      step: "03",
      title: "Execution",
      icon: Rocket,
      description: "Our team gets to work — running your ads, creating content, shooting photos and videos, building your website or app."
    },
    {
      step: "04",
      title: "Results",
      icon: BarChart3,
      description: "We track everything and send you clear reports. You see exactly what's working and what we're doing next."
    }
  ];

  return (
    <div className="w-full">
      
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden py-20 lg:py-28 star-field cosmic-section">
        {/* Decorative cosmic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-sky-50/30 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-[#004aad] border border-blue-200 bg-blue-50/80 shadow-xs">
                <Zap className="h-3.5 w-3.5 fill-[#004aad] text-[#004aad]" />
                Digital Agency · Nigeria & Worldwide
              </span>

              <div className="perspective-container">
                <KineticText
                  text="Helping Brands"
                  as="h1"
                  variant="reveal"
                  className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl font-display leading-[1.1]"
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

              <p className="max-w-xl text-lg text-slate-600 leading-relaxed font-sans" style={{ animation: 'fade-in-up 0.8s ease 1s forwards', opacity: 0 }}>
                We help businesses grow with digital marketing, content creation, professional photography & videography, websites, and mobile apps. From Nigeria to the world — we turn your online presence into real customers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4" style={{ animation: 'fade-in-up 0.8s ease 1.2s forwards', opacity: 0 }}>
                <button
                  id="hero-cta-contact"
                  onClick={() => { triggerHaptic(25); openContactModal(); }}
                  className="group flex items-center justify-center gap-1.5 rounded-xl px-6 py-4 text-sm font-bold text-white shadow-md neon-btn haptic-press"
                >
                  Book a Free Consultation
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <button
                  id="hero-cta-work"
                  onClick={() => {
                    triggerHaptic(15);
                    setCurrentTab('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center gap-1 rounded-xl border border-slate-300 bg-white px-6 py-4 text-sm font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition-all haptic-press shadow-xs"
                >
                  See Our Work
                </button>
              </div>

              {/* Trust Metric list */}
              <div className="grid grid-cols-2 gap-6 pt-10" style={{ borderTop: '1px solid rgba(226, 232, 240, 0.9)', animation: 'fade-in-up 0.8s ease 1.4s forwards', opacity: 0 }}>
                <div>
                  <div className="text-2xl font-black text-slate-900 font-display">94%+</div>
                  <div className="text-xs text-slate-500 font-bold font-sans uppercase tracking-wider mt-1">Client Retention Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-black font-display gradient-text">₦18B+</div>
                  <div className="text-xs text-slate-500 font-bold font-sans uppercase tracking-wider mt-1">Client Revenue Generated</div>
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
                    background: 'radial-gradient(circle, rgba(0, 74, 173, 0.12) 0%, rgba(2, 132, 199, 0.05) 50%, transparent 70%)',
                  }}
                />
              </div>
              {/* Orbital ring */}
              <div
                className="absolute w-72 h-72 rounded-full border border-blue-100"
                style={{ animation: 'cosmic-rotate 30s linear infinite' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#004aad]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-sky-400" />
              </div>
              <div
                className="relative animate-float"
                style={{
                  filter: 'drop-shadow(0 10px 25px rgba(0, 74, 173, 0.15))',
                  animation: 'float 5s ease-in-out infinite, fade-in-up 1s ease 0.5s forwards',
                  opacity: 0,
                }}
              >
                <img
                  src="/images/hero-character.png"
                  alt="Savvy - CEO & Founder"
                  className="w-full max-w-md h-auto object-contain rounded-2xl"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: HOW WE WORK */}
      <section className="relative py-20 lg:py-24 cosmic-section" style={{ borderTop: '1px solid rgba(226, 232, 240, 0.9)', borderBottom: '1px solid rgba(226, 232, 240, 0.9)' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">From Strategy to Results</span>
            <KineticText
              text="How We Work"
              as="h2"
              variant="reveal"
              className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl font-display"
              delay={0.1}
              stagger={0.02}
            />
            <p className="text-base text-slate-600 font-sans">
              We keep it simple. Here's how every project works — from the first conversation to real results you can see.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="group rounded-2xl p-6 cosmic-card tilt-3d perspective-container relative overflow-hidden"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {/* Step number background */}
                  <div className="absolute -top-2 -right-2 text-7xl font-black font-display opacity-10 text-[#004aad] pointer-events-none select-none">
                    {step.step}
                  </div>

                  <div className="relative space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#004aad] border border-blue-100">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold text-[#004aad] font-mono tracking-widest uppercase">Step {step.step}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 font-display">{step.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-sans">{step.description}</p>
                  </div>

                  <div className="mt-6 pt-4 flex items-center justify-between text-[11px] font-bold font-mono" style={{ borderTop: '1px solid rgba(226, 232, 240, 0.8)' }}>
                    <span className="text-slate-400">STEP {step.step} OF 04</span>
                    <span className="text-emerald-600">✓</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <button
              id="how-we-work-cta"
              onClick={() => { triggerHaptic(25); openContactModal(); }}
              className="rounded-xl px-8 py-4 text-sm font-bold text-white transition-all neon-btn haptic-press"
            >
              Start Your Project Today
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 3: WORK WE'VE DONE */}
      <section className="relative py-20 lg:py-24 cosmic-section star-field">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10" style={{ borderBottom: '1px solid rgba(226, 232, 240, 0.9)' }}>
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">Our Projects</span>
              <KineticText
                text="Work We've Done"
                as="h2"
                variant="reveal"
                className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl font-display"
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
              className="flex items-center gap-1.5 text-sm font-bold text-[#004aad] hover:text-blue-700 group mt-2 transition-colors haptic-press"
            >
              See All Projects
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudyList.map((project, idx) => (
              <div
                key={project.id}
                className="group flex flex-col justify-between rounded-2xl p-5 cosmic-card perspective-container"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div>
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-100">
                    <img
                      referrerPolicy="no-referrer"
                      src={project.image}
                      alt={project.client}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 rounded-lg px-2.5 py-1 text-[10px] font-bold text-slate-800 uppercase tracking-wider font-mono glass-panel border border-slate-200 shadow-xs">
                      {project.category}
                    </div>
                  </div>
                  
                  <h3 className="mt-5 text-xs font-bold text-[#004aad] uppercase tracking-wider font-mono">{project.client}</h3>
                  <h4 className="mt-2 text-lg font-bold text-slate-900 leading-snug group-hover:text-[#004aad] font-display transition-colors">
                    {project.title}
                  </h4>
                  <p className="mt-3 text-sm text-slate-600 line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 pt-5 flex items-center justify-between" style={{ borderTop: '1px solid rgba(226, 232, 240, 0.8)' }}>
                  <div className="flex gap-4">
                    {project.metrics.slice(0, 2).map((met, i) => (
                      <div key={i}>
                        <div className="text-base font-extrabold text-slate-900 font-display leading-[1]">{met.value}</div>
                        <div className="text-[10px] text-slate-500 font-bold font-mono mt-0.5">{met.label}</div>
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
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-all group-hover:bg-[#004aad] group-hover:text-white group-hover:border-[#004aad] haptic-press"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: FROM OUR BLOG — Hidden for now */}

    </div>
  );
}
