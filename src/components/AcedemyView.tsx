import React, { useCallback } from 'react';
import { 
  ArrowUpRight, Sparkles, Code, Palette, PenTool, Video, Layers, 
  Users, CheckCircle2, Calendar, Clock, MessageCircle, Mail, 
  Award, ShieldCheck, HeartHandshake, Briefcase, GraduationCap 
} from 'lucide-react';
import KineticText from './KineticText';
import { triggerHaptic } from '../utils/haptics';

export default function AcedemyView() {
  const handleHaptic = useCallback((pattern: number = 15) => {
    triggerHaptic(pattern);
  }, []);

  const curriculumSkills = [
    {
      icon: Code,
      title: "Web Design",
      desc: "Learn UI/UX fundamentals, responsive web layouts, modern design systems, and how to build beautiful, fast-loading digital web pages."
    },
    {
      icon: Palette,
      title: "Graphic Design",
      desc: "Master visual composition, color theory, typography, marketing collateral, social media banners, and high-impact visual design."
    },
    {
      icon: PenTool,
      title: "Content Writing",
      desc: "Craft persuasive copywriting, blog articles, SEO-optimized text, editorial narratives, and messaging that converts visitors into customers."
    },
    {
      icon: Video,
      title: "Content Creation",
      desc: "Produce dynamic multimedia content, video scripts, reels, social storytelling, and creative assets tailored for modern digital platforms."
    },
    {
      icon: Layers,
      title: "Branding & Visual Identity",
      desc: "Design iconic brand identities, logo concepts, comprehensive brand guidelines, color palettes, and corporate brand stationery."
    },
    {
      icon: Briefcase,
      title: "Portfolio & Real Experience",
      desc: "Package real-world group tasks and practical deliverables into a professional portfolio that attracts clients and employers."
    }
  ];

  const pillars = [
    {
      icon: Award,
      title: "100% Free Access",
      desc: "High-quality, practical digital skill training provided completely free of charge to empower young creators and professionals."
    },
    {
      icon: Users,
      title: "Professional Mentorship",
      desc: "Direct guidance and personalized feedback from seasoned digital marketers, designers, and engineers actively working in the industry."
    },
    {
      icon: HeartHandshake,
      title: "Team-Based Projects",
      desc: "Collaborate with talented peers on practical assignments simulating real agency workflows and hands-on client challenges."
    },
    {
      icon: ShieldCheck,
      title: "Portfolio-Ready Experience",
      desc: "Walk away with tangible, verified project deliverables that demonstrate your real-world capabilities to employers and clients."
    },
    {
      icon: Sparkles,
      title: "A Community of Growth",
      desc: "Join a vibrant community of passionate learners, creatives, and mentors who inspire, support, and grow alongside you."
    }
  ];

  const targetAudiences = [
    {
      label: "Complete Beginners",
      desc: "No prior experience required. We start with foundational principles and guide you step-by-step."
    },
    {
      label: "Active Creators",
      desc: "Level up your creative outputs, master industry workflows, and refine your storytelling technique."
    },
    {
      label: "Career Starters",
      desc: "Acquire in-demand practical skills to land internships, freelance contracts, or full-time roles."
    }
  ];

  return (
    <div className="w-full relative min-h-screen">
      
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden py-16 sm:py-24 star-field cosmic-section">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-sky-50/30 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-5xl px-6 sm:px-8 relative z-10 text-center space-y-6">
          
          {/* Logo Badge */}
          <div className="flex justify-center mb-2">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-3xl p-2 bg-white border border-slate-200 shadow-md flex items-center justify-center overflow-hidden">
              <img
                src="/logos/acedemy.jpg"
                alt="ACEDEMY Official Logo"
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/2.svg';
                }}
              />
            </div>
          </div>

          {/* Active Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold border border-emerald-200 bg-emerald-50 text-emerald-800 shadow-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>ACEDEMY 2.0 IS CURRENTLY RUNNING</span>
          </div>

          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-black tracking-widest uppercase font-mono text-[#004aad] block">
              ACE INNOVATION NEXUS LTD PRESENTS
            </span>
            <KineticText
              text="ACEDEMY 2.0"
              as="h1"
              variant="reveal"
              className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl font-display leading-[1.05]"
              delay={0.1}
            />
            <p className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 font-display mt-2">
              Join a Community Where You Can Learn Digital Skills!
            </p>
          </div>

          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
            An initiative within Ace Innovation Nexus committed to learning, capacity development, and the advancement of practical digital competencies — <strong>at zero cost</strong>.
          </p>

          {/* Key Program Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 text-left">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono font-semibold">
                <Clock className="h-3.5 w-3.5 text-[#004aad]" />
                <span>DURATION</span>
              </div>
              <div className="text-sm font-black text-slate-900">6 Weeks</div>
              <div className="text-[10px] text-slate-500">Intensive Training</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono font-semibold">
                <Calendar className="h-3.5 w-3.5 text-[#004aad]" />
                <span>START DATE</span>
              </div>
              <div className="text-sm font-black text-slate-900">14th Sept, 2026</div>
              <div className="text-[10px] text-emerald-600 font-bold">Active Cohort</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono font-semibold">
                <Award className="h-3.5 w-3.5 text-[#004aad]" />
                <span>COST</span>
              </div>
              <div className="text-sm font-black text-emerald-700">100% Free</div>
              <div className="text-[10px] text-slate-500">Zero Tuition Fee</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono font-semibold">
                <GraduationCap className="h-3.5 w-3.5 text-[#004aad]" />
                <span>COHORT</span>
              </div>
              <div className="text-sm font-black text-slate-900">ACEDEMY 2.0</div>
              <div className="text-[10px] text-slate-500">After Acedemy 1.0</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdjdkSw7tPn6kz7WtXj2whf4KjvDveCHMqfn5VYv-WZZjlMzw/viewform"
              target="_blank"
              rel="noreferrer"
              onClick={() => handleHaptic(20)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-bold text-white shadow-md transition-all haptic-press neon-btn"
            >
              <span>Join ACEDEMY 2.0</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <a
              href="https://wa.me/2348133915634"
              target="_blank"
              rel="noreferrer"
              onClick={() => handleHaptic(15)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition-all haptic-press shadow-xs"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600" />
              <span>WhatsApp Enquiries: 08133915634</span>
            </a>
          </div>

        </div>
      </section>

      {/* SECTION 2: WHO IS ACEDEMY FOR? */}
      <section className="relative py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-widest uppercase font-mono text-[#004aad]">Target Audience</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
              Who is ACEDEMY for? 👀
            </h2>
            <p className="text-base text-slate-600">
              For you — whether you’re a complete beginner, already creating, or simply ready to turn your raw creativity into high-value market skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {targetAudiences.map((aud, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-[#004aad]/40 transition-all text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#004aad] font-bold font-mono">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display">{aud.label}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{aud.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-blue-50 border border-blue-100 text-center">
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              &ldquo;In an increasingly competitive world, the right knowledge and practical competencies can create access to opportunities that would otherwise remain out of reach.&rdquo;
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 3: SKILLS YOU CAN LEARN */}
      <section className="relative py-20 lg:py-24 cosmic-section">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">Curriculum Tracks</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 font-display">
              Skills You Can Learn
            </h2>
            <p className="text-base text-slate-600 font-sans">
              Participants have the opportunity to acquire all of these practical skills <strong>at no cost</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto text-left">
            {curriculumSkills.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl p-6 sm:p-7 cosmic-card tilt-3d perspective-container flex flex-col justify-between"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-[#004aad]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">{skill.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{skill.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 flex items-center justify-between text-[11px] font-bold font-mono border-t border-slate-100">
                    <span className="text-[#004aad] uppercase">Cohort 2.0 Track</span>
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Free Access
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 4: WHAT MAKES US DIFFERENT */}
      <section className="relative py-20 lg:py-24 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-widest uppercase font-mono text-[#004aad]">Why ACEDEMY?</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
              What Makes Us Different
            </h2>
            <p className="text-base text-slate-600">
              We focus on practical competency, live mentorship, and tangible portfolio outcomes — not just lecture theory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-[#004aad]/40 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#004aad] border border-blue-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-display">{p.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{p.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-[10px] font-mono text-slate-400 font-bold uppercase">
                    Core Benefit #{idx + 1}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Evolution Timeline Banner */}
          <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-slate-100 text-slate-600 border border-slate-200">
                  COHORT 1.0 COMPLETED
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-100 text-emerald-800 border border-emerald-200">
                  COHORT 2.0 LIVE
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-display">
                Continuous Talent Development
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Building on the success of ACEDEMY 1.0, ACEDEMY 2.0 expands our practical tracks with deeper mentorship, collaborative team tasks, and direct industry pipelines.
              </p>
            </div>
            
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdjdkSw7tPn6kz7WtXj2whf4KjvDveCHMqfn5VYv-WZZjlMzw/viewform"
              target="_blank"
              rel="noreferrer"
              onClick={() => handleHaptic(15)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#004aad] text-white text-xs font-bold hover:bg-blue-700 transition-all shrink-0"
            >
              <span>Apply for Cohort 2.0</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

        </div>
      </section>

      {/* SECTION 5: REGISTER & CONTACT INFORMATION */}
      <section className="relative py-20 lg:py-24" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)', borderTop: '1px solid rgba(226, 232, 240, 0.9)' }}>
        <div className="mx-auto max-w-4xl px-6 sm:px-8 relative z-10 text-center space-y-8">
          
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-widest uppercase font-mono text-[#004aad]">Registration Open</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
              Ready to Turn Your Creativity into a Skill?
            </h2>
            <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              If you or someone you know would benefit from ACEDEMY 2.0, register now or connect with our team. All training modules are provided at zero cost.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdjdkSw7tPn6kz7WtXj2whf4KjvDveCHMqfn5VYv-WZZjlMzw/viewform"
              target="_blank"
              rel="noreferrer"
              onClick={() => handleHaptic(20)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-bold text-white shadow-md transition-all haptic-press neon-btn"
            >
              <span>Register Now — It's 100% Free</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Contact Information Cards */}
          <div className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
            <a
              href="https://wa.me/2348133915634"
              target="_blank"
              rel="noreferrer"
              onClick={() => handleHaptic(10)}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5 hover:border-emerald-500 transition-all group"
            >
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold font-mono text-slate-400 uppercase">WhatsApp Enquiries</div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors truncate">
                  08133915634
                </div>
              </div>
            </a>

            <a
              href="mailto:aceinnovationnexus@gmail.com"
              onClick={() => handleHaptic(10)}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5 hover:border-[#004aad] transition-all group"
            >
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-[#004aad] flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold font-mono text-slate-400 uppercase">Official Email</div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-[#004aad] transition-colors truncate">
                  aceinnovationnexus@gmail.com
                </div>
              </div>
            </a>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            Know someone who would benefit? Share this opportunity with them.
          </p>

        </div>
      </section>

    </div>
  );
}
