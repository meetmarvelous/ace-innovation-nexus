import React, { useState, useCallback } from 'react';
import { teamMembers, partnerTiers, regionPartners } from '../data';
import { TeamMember, RegionPartner } from '../types';
import { 
  Target, Lightbulb, Compass, User, Globe, Sparkles, CheckCircle2, 
  ArrowUpRight, MessageCircle, Mail, MapPin, ChevronRight, Briefcase, Network
} from 'lucide-react';
import KineticText from './KineticText';

interface AboutViewProps {
  openContactModal?: () => void;
}

export default function AboutView({ openContactModal }: AboutViewProps) {
  const [activeLeader, setActiveLeader] = useState<TeamMember | null>(teamMembers[0]);
  const [activePartner, setActivePartner] = useState<RegionPartner | null>(
    regionPartners.find(r => r.country === 'Nigeria') || regionPartners[0]
  );

  const triggerHaptic = useCallback((pattern: number | number[] = 15) => {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(pattern); } catch { /* silent */ }
    }
  }, []);

  const stats = [
    { value: "100%", label: "Fully Remote Team" },
    { value: "4.9/5", label: "Client Satisfaction Score" },
    { value: "₦18B+", label: "Client Revenue Generated" },
    { value: "3+", label: "Years of Experience" }
  ];

  const valueTenets = [
    {
      title: "Results That Matter",
      icon: Target,
      desc: "Everything we do is tied to real results — more customers, more sales, more visibility. We don't chase vanity numbers. If it doesn't help your business grow, we don't do it."
    },
    {
      title: "Straight Talk",
      icon: Lightbulb,
      desc: "We tell you what's working and what's not. No sugar-coating, no fluff. If your ads aren't performing or your website needs work, you'll hear it from us — along with a plan to fix it."
    },
    {
      title: "Built to Last",
      icon: Compass,
      desc: "We don't do quick fixes. Whether it's a website, a brand identity, or a marketing campaign — we build things that last and continue to bring in results long after the project is done."
    }
  ];

  return (
    <div className="w-full">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-16 lg:py-20 cosmic-section star-field" style={{ borderBottom: '1px solid rgba(226, 232, 240, 0.9)' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center max-w-3xl relative z-10">
          <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">Who We Are</span>
          <div className="mt-4">
            <KineticText
              text="Your Digital"
              as="h1"
              variant="reveal"
              className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl font-display leading-[1.1] inline"
              delay={0.2}
            />
            {' '}
            <KineticText
              text="Growth Partner"
              as="span"
              variant="shimmer"
              className="text-4xl font-black tracking-tight sm:text-5xl font-display leading-[1.1]"
              delay={0.8}
            />
          </div>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed font-sans" style={{ animation: 'fade-in-up 0.8s ease 1s forwards', opacity: 0 }}>
            Ace Innovation Nexus is a full-service digital agency and innovation powerhouse based in Nigeria. We engineer transformative marketing, compelling content, high-impact visual production, websites, and custom digital software. We don&apos;t just build — we grow brands and empower people.
          </p>
        </div>
      </section>

      {/* 2. CORE STORY SECTION */}
      <section className="relative py-20 lg:py-24 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center relative z-10">
          
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase font-mono tracking-widest block gradient-text">Our Story</span>
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl font-display leading-tight">
              We saw great businesses struggling to grow online. So we decided to fix that.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              We started because we kept seeing the same problem — businesses with amazing products and services, but no real online presence. They were invisible to the people who needed them most.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              So we assembled a multidisciplinary team of growth strategists, brand designers, developers, photographers, and content creators. Today, we partner with businesses across Nigeria, Africa, Europe, and North America to get seen, win customers, and build sustainable market leadership.
            </p>
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div style={{ borderLeft: '3px solid #004aad' }} className="pl-4">
                <span className="text-xs font-bold uppercase text-slate-400 font-mono">GLOBAL HQ</span>
                <p className="text-base sm:text-lg font-bold text-slate-900 font-display">Ibadan, Nigeria</p>
              </div>
              <div style={{ borderLeft: '3px solid #0284c7' }} className="pl-4">
                <span className="text-xs font-bold uppercase text-slate-400 font-mono">CLIENT RETENTION</span>
                <p className="text-base sm:text-lg font-bold text-slate-900 font-display">94% Stay With Us</p>
              </div>
              <div style={{ borderLeft: '3px solid #10b981' }} className="pl-4 col-span-2 sm:col-span-1">
                <span className="text-xs font-bold uppercase text-slate-400 font-mono">CLIENT REACH</span>
                <p className="text-base sm:text-lg font-bold text-slate-900 font-display">Africa & Global</p>
              </div>
            </div>
          </div>

          <div className="relative">
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

      {/* 3. WHERE WE ARE / GLOBAL FOOTPRINT & HEADQUARTERS */}
      <section className="relative py-20 lg:py-24 max-w-7xl mx-auto px-6 sm:px-8" style={{ borderTop: '1px solid rgba(226, 232, 240, 0.9)' }}>
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16 relative z-10">
          <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">Our Physical & Global Reach</span>
          <h2 className="text-3xl font-black text-slate-900 font-display">Where We Are</h2>
          <p className="text-sm text-slate-600">Headquartered in Nigeria with a remote delivery network spanning three continents.</p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-stretch relative z-10">
          
          {/* Map area (left) */}
          <div className="lg:col-span-7 relative min-h-[380px] rounded-3xl overflow-hidden p-6 flex flex-col justify-between bg-slate-50 border border-slate-200 shadow-xs">
            
            {/* Background subtle starry grids */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#004aad_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />

            <div className="relative flex justify-between items-center z-10">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">OFFICE LOCATION</span>
              <div className="flex gap-1.5 items-center border border-emerald-200 bg-emerald-50 px-2.5 py-1 rounded-full">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-[9px] font-semibold text-emerald-700 font-mono">OPEN FOR BUSINESS</span>
              </div>
            </div>

            {/* Interactive node */}
            <div className="relative w-full h-[260px] my-auto">
              {regionPartners.map((node) => {
                const isActive = activePartner?.id === node.id;
                return (
                  <button
                    key={node.id}
                    id={`about-map-node-${node.id}`}
                    onClick={() => { triggerHaptic(15); setActivePartner(node); }}
                    style={{ top: node.latLng.top, left: node.latLng.left }}
                    className="absolute group -translate-x-1/2 -translate-y-1/2 focus:outline-none haptic-press"
                    title={`Office: ${node.country}`}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className={`absolute inline-flex h-12 w-12 rounded-full opacity-40 transition-transform ${
                        isActive ? 'bg-blue-400/40 scale-102 animate-ping' : 'bg-slate-300/0 hover:scale-105'
                      }`} />
                      <span className={`absolute inline-flex h-7 w-7 rounded-full opacity-40 transition-transform ${
                        isActive ? 'bg-[#004aad]/30 animate-pulse' : 'bg-slate-300 group-hover:bg-[#004aad]/20'
                      }`} />
                      
                      <div className={`relative h-4 w-4 rounded-full border-2 transition-all shadow-sm ${
                        isActive ? 'bg-white border-[#004aad]' : 'bg-slate-400 border-slate-300 group-hover:bg-[#004aad]'
                      }`} />

                      <span className="absolute left-6 text-[10px] font-bold tracking-wider text-slate-800 px-2.5 py-1 rounded-md shadow-md opacity-90 pointer-events-none uppercase whitespace-nowrap font-mono max-w-xs block glass-panel border border-slate-200">
                        {node.country}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="relative text-left z-10 flex items-center gap-3 p-3.5 rounded-2xl glass-panel border border-slate-200">
              <Globe className="h-5 w-5 text-[#004aad] shrink-0" />
              <p className="text-[11px] sm:text-xs text-slate-600 font-sans tracking-wide">
                We&apos;re based in Nigeria but work with ambitious businesses across <strong>Africa, Europe, and North America</strong>.
              </p>
            </div>

          </div>

          {/* Office detail (right) */}
          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative bg-slate-50 border border-slate-200">
            {activePartner ? (
              <div className="space-y-6 text-left">
                
                <div className="flex gap-4 items-center pb-5" style={{ borderBottom: '1px solid rgba(226, 232, 240, 0.9)' }}>
                  <div className="h-14 w-14 rounded-2xl p-2 border border-slate-200 bg-white flex items-center justify-center overflow-hidden shadow-xs">
                    <img
                      referrerPolicy="no-referrer"
                      src={activePartner.logo}
                      alt={activePartner.country}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider block uppercase">Headquarters</span>
                    <h3 className="text-lg font-black text-slate-900 font-display leading-tight">{activePartner.name}</h3>
                    <span className="inline-block rounded border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[9px] font-bold text-[#004aad] tracking-wide font-mono mt-1.5 uppercase">
                      {activePartner.scale}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 font-mono block uppercase">About This Office</span>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans">{activePartner.details}</p>
                </div>

                <div className="pt-5 space-y-3 text-xs" style={{ borderTop: '1px solid rgba(226, 232, 240, 0.8)' }}>
                  <span className="font-bold text-slate-500 font-mono block uppercase">WHAT WE DELIVER</span>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Serving clients across Nigeria and international markets</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Growth marketing, content production, photo, video & digital apps</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center text-slate-400">
                <Network className="h-10 w-10 text-slate-400 stroke-dasharray animate-pulse" />
                <p className="text-xs font-semibold mt-2">Click a point on the map to see office details.</p>
              </div>
            )}

            <div className="mt-8 pt-5 flex items-center justify-between text-[11px] font-medium font-mono" style={{ borderTop: '1px solid rgba(226, 232, 240, 0.8)' }}>
              <span className="text-slate-400">ACE INNOVATION NEXUS</span>
              <span className="text-[#004aad] font-bold">NIGERIA 🇳🇬</span>
            </div>
          </div>

        </div>

      </section>

      {/* 4. CORE VALUES */}
      <section className="relative py-20 lg:py-24 cosmic-section star-field" style={{ borderTop: '1px solid rgba(226, 232, 240, 0.9)', borderBottom: '1px solid rgba(226, 232, 240, 0.9)' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">What We Believe</span>
            <h2 className="text-3xl font-black text-slate-900 font-display">How We Do Things</h2>
            <p className="text-sm text-slate-600">Three fundamental principles that steer every project we undertake.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {valueTenets.map((tenet, idx) => {
              const Icon = tenet.icon;
              return (
                <div key={idx} className="rounded-2xl p-6 sm:p-8 flex flex-col justify-between cosmic-card tilt-3d perspective-container">
                  <div className="space-y-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#004aad] border border-blue-100">
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">{tenet.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-sans">{tenet.desc}</p>
                  </div>
                  <div className="mt-8 pt-4 flex items-center justify-between text-[11px] font-bold font-mono" style={{ borderTop: '1px solid rgba(226, 232, 240, 0.8)' }}>
                    <span className="text-slate-400">RULE {idx + 1} OF 3</span>
                    <span className="text-emerald-600">✓ ALWAYS</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. THE NEXUS ECOSYSTEM (HOW WE OPERATE & COLLABORATE) */}
      <section className="relative py-20 lg:py-24 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">The Nexus Ecosystem</span>
            <h2 className="text-3xl font-black text-slate-900 font-display">How We Work & Partner</h2>
            <p className="text-sm text-slate-600">
              Ace Innovation Nexus operates across three integrated pillars to build, scale, and empower businesses and people.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {partnerTiers.map((tier) => (
              <div
                key={tier.id}
                className="group rounded-3xl p-6 sm:p-8 flex flex-col justify-between cosmic-card tilt-3d perspective-container relative"
              >
                <div className="space-y-5">
                  <div className="flex justify-between items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#004aad] border border-blue-100">
                      <Sparkles className="h-5 w-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-900 font-display leading-tight">{tier.name}</h3>
                    <p className="text-xs text-[#004aad] font-bold font-sans mt-1">{tier.tagline}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans mt-3">{tier.description}</p>

                  <div className="space-y-2 pt-4 text-xs" style={{ borderTop: '1px solid rgba(226, 232, 240, 0.8)' }}>
                    <span className="font-bold text-slate-500 font-mono block uppercase">What You Get</span>
                    {tier.benefits.map((benefit, i) => (
                      <div key={i} className="flex gap-2 text-slate-700 leading-snug">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 flex items-center justify-between text-[11px] font-mono" style={{ borderTop: '1px solid rgba(226, 232, 240, 0.8)' }}>
                  <span className="text-slate-400">FOR: {tier.targetAudience.toUpperCase()}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. TEAM SECTION */}
      <section className="relative py-20 lg:py-24 max-w-7xl mx-auto px-6 sm:px-8" style={{ borderTop: '1px solid rgba(226, 232, 240, 0.9)' }}>
        
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 relative z-10">
          <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">The People Behind It All</span>
          <h2 className="text-3xl font-black text-slate-900 font-display">Meet Our Team</h2>
          <p className="text-sm text-slate-600">Click on any team member to learn more about their role and background.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch relative z-10">
          
          {/* Team member cards (left) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {teamMembers.map((member) => {
              const isSelected = activeLeader?.id === member.id;
              return (
                <div
                  key={member.id}
                  onClick={() => { triggerHaptic(10); setActiveLeader(member); }}
                  className={`group cursor-pointer rounded-2xl p-4.5 transition-all flex items-center gap-4 haptic-press ${
                    isSelected
                      ? 'cosmic-card border-[#004aad] shadow-md'
                      : 'border border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-300'
                  }`}
                  style={isSelected ? { borderColor: '#004aad' } : {}}
                >
                  <img
                    referrerPolicy="no-referrer"
                    src={member.avatar}
                    alt={member.name}
                    className="h-16 w-16 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-display group-hover:text-[#004aad] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium font-sans mt-0.5">{member.role}</p>
                    <span className="inline-block rounded-md px-2 py-0.5 text-[9px] font-bold text-[#004aad] tracking-wider font-mono bg-blue-50 border border-blue-100 mt-1.5">
                      {member.department.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active team member detail (right) */}
          <div className="lg:col-span-5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between bg-slate-50 border border-slate-200">
            {activeLeader ? (
              <div className="space-y-6">
                
                <div className="flex justify-between items-start gap-3">
                  <div className="flex items-center gap-3.5">
                    <img
                      referrerPolicy="no-referrer"
                      src={activeLeader.avatar}
                      alt={activeLeader.name}
                      className="h-14 w-14 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0"
                    />
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-widest font-mono gradient-text">Executive Profile</span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display mt-0.5">{activeLeader.name}</h3>
                      <p className="text-xs text-[#004aad] font-mono mt-0.5 uppercase tracking-wide font-bold">{activeLeader.role}</p>
                    </div>
                  </div>
                </div>

                <div className="cosmic-card p-4.5 rounded-xl text-sm italic text-slate-700 relative border border-slate-200">
                  <span className="absolute -top-3 left-4 px-2 py-0.5 text-[8px] font-bold tracking-widest font-mono uppercase rounded text-white" style={{ background: '#004aad' }}>About</span>
                  <p className="mt-1 font-sans">
                    &ldquo;{activeLeader.bio}&rdquo;
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-500 font-mono block uppercase">Skills</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLeader.department === 'Leadership' && ['Business Strategy', 'Team Management', 'Client Relations'].map(t => (
                      <span key={t} className="rounded-md border border-slate-200 bg-white px-2 py-1 font-medium text-slate-700 shadow-xs">{t}</span>
                    ))}
                    {activeLeader.department === 'Creative & Brand' && ['Brand Design', 'Photography Direction', 'Content Strategy'].map(t => (
                      <span key={t} className="rounded-md border border-slate-200 bg-white px-2 py-1 font-medium text-slate-700 shadow-xs">{t}</span>
                    ))}
                    {activeLeader.department === 'Marketing & SEO' && ['Google Ads', 'Social Media Marketing', 'SEO & Analytics'].map(t => (
                      <span key={t} className="rounded-md border border-slate-200 bg-white px-2 py-1 font-medium text-slate-700 shadow-xs">{t}</span>
                    ))}
                    {activeLeader.department === 'Tech & Product' && ['React & Next.js', 'Mobile App Development', 'Backend & APIs'].map(t => (
                      <span key={t} className="rounded-md border border-slate-200 bg-white px-2 py-1 font-medium text-slate-700 shadow-xs">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between font-mono text-[10px]" style={{ borderTop: '1px solid rgba(226, 232, 240, 0.8)' }}>
                  <span className="text-slate-400">{activeLeader.department.toUpperCase()}</span>
                  <span className="text-emerald-600 font-bold uppercase">&bull; TEAM MEMBER</span>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center text-slate-400">
                <User className="h-8 w-8 text-slate-400 stroke-dasharray animate-pulse" />
                <p className="text-xs font-semibold mt-2">Select a team member to learn more about them.</p>
              </div>
            )}
          </div>

        </div>

      </section>

      {/* 7. STATS BANNER */}
      <section className="relative py-14" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)', borderTop: '1px solid rgba(226, 232, 240, 0.9)' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            {stats.map((st, idx) => (
              <div key={idx}>
                <div className="text-3xl font-black font-display text-slate-900">{st.value}</div>
                <div className="text-[10px] uppercase font-bold text-slate-500 mt-1.5 font-mono tracking-widest">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PURPOSE-DRIVEN CLOSING CTA */}
      <section className="relative py-20 lg:py-24 cosmic-section star-field" style={{ borderTop: '1px solid rgba(226, 232, 240, 0.9)' }}>
        <div className="mx-auto max-w-4xl px-6 sm:px-8 relative z-10 text-center space-y-8">
          
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">Work With Us</span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display">
              Ready to Build Something Extraordinary?
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Whether you need end-to-end digital marketing, a custom web platform, or want to partner within our innovation ecosystem — let&apos;s talk.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {openContactModal && (
              <button
                onClick={() => { triggerHaptic(20); openContactModal(); }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-bold text-white shadow-md transition-all haptic-press neon-btn"
              >
                <span>Request Strategy Consultation</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            )}

            <a
              href="https://wa.me/2348133915634"
              target="_blank"
              rel="noreferrer"
              onClick={() => triggerHaptic(15)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition-all haptic-press shadow-xs"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600" />
              <span>WhatsApp: 08133915634</span>
            </a>
          </div>

          <div className="pt-6 border-t border-slate-200 max-w-md mx-auto flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
            <Mail className="h-4 w-4 text-[#004aad]" />
            <span>Email us directly:</span>
            <a href="mailto:aceinnovationnexus@gmail.com" className="text-[#004aad] font-bold hover:underline">
              aceinnovationnexus@gmail.com
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}

