import React, { useCallback } from 'react';
import { 
  ArrowUpRight, Sparkles, Code, Palette, PenTool, Video, Layers, 
  Users, CheckCircle2, Calendar, Clock, MessageCircle, Mail, 
  Award, ShieldCheck, HeartHandshake, Briefcase, GraduationCap,
  AlertCircle, Lock, Lightbulb, Compass, Target
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
      title: "Free Access to Digital Skill Training",
      desc: "Participants have the opportunity to acquire high-income, practical competencies completely at no cost."
    },
    {
      icon: Users,
      title: "Mentorship from Experienced Professionals",
      desc: "Direct guidance, live reviews, and constructive feedback from seasoned practitioners working in the digital space."
    },
    {
      icon: HeartHandshake,
      title: "Team-Based Projects & Practical Tasks",
      desc: "Collaborate with peers on hands-on deliverables simulating real industry briefs, not just passive listening."
    },
    {
      icon: ShieldCheck,
      title: "Real Experience for Your Portfolio",
      desc: "Graduate with tangible proof of work and portfolio-ready assets to showcase your capabilities to clients."
    },
    {
      icon: Sparkles,
      title: "A Community That Supports Your Growth",
      desc: "A collaborative ecosystem of creators, developers, and mentors who champion and elevate your journey."
    }
  ];

  const targetAudiences = [
    {
      icon: Lightbulb,
      title: "A Complete Beginner",
      desc: "You have zero previous tech or design experience. We start from ground zero with crystal-clear guidance."
    },
    {
      icon: Compass,
      title: "Already Creating",
      desc: "You make creative work but want to refine your workflow, sharpen execution, and adopt professional standards."
    },
    {
      icon: Target,
      title: "Ready to Build a Career",
      desc: "You are eager to turn raw curiosity and creativity into structured, high-value skills that open doors to opportunities."
    }
  ];

  return (
    <div className="w-full relative min-h-screen">
      
      {/* =====================================================================
          1. HERO HEADER: INTRODUCING ACEDEMY
          ===================================================================== */}
      <section className="relative overflow-hidden py-16 sm:py-24 star-field cosmic-section">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-sky-50/30 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-5xl px-6 sm:px-8 relative z-10 text-center space-y-6">
          
          {/* Logo Badge */}
          <div className="flex justify-center mb-2">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-3xl p-2.5 bg-white border border-slate-200 shadow-md flex items-center justify-center overflow-hidden">
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

          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-black tracking-widest uppercase font-mono text-[#004aad] block">
              ACE INNOVATION NEXUS LTD
            </span>
            <KineticText
              text="ACEDEMY"
              as="h1"
              variant="reveal"
              className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl font-display leading-[1.05]"
              delay={0.1}
            />
            <p className="text-lg sm:text-2xl font-bold tracking-tight text-slate-800 font-display mt-2">
              Empowering Minds Through Practical Digital Skills & Capacity Development
            </p>
          </div>

          {/* Core Philosophy Quote */}
          <div className="max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-white/90 border border-slate-200/90 shadow-xs text-sm sm:text-base text-slate-700 italic font-sans leading-relaxed">
            &ldquo;In an increasingly competitive world, the right knowledge and practical competencies can create access to opportunities that would otherwise remain out of reach.&rdquo;
          </div>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              100% Free Tuition
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#004aad] border border-blue-200">
              <GraduationCap className="h-3.5 w-3.5 text-[#004aad]" />
              Capacity Development
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
              <Users className="h-3.5 w-3.5 text-slate-500" />
              Collaborative Community
            </span>
          </div>

        </div>
      </section>

      {/* =====================================================================
          2. WHAT IS ACEDEMY? (DEFINITION FIRST)
          ===================================================================== */}
      <section className="relative py-16 sm:py-20 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 space-y-8 text-left">
          
          <div className="space-y-3 text-center sm:text-left">
            <span className="text-xs font-bold tracking-widest uppercase font-mono text-[#004aad]">About The Initiative</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
              What is ACEDEMY?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              <p>
                <strong>ACEDEMY</strong> is an initiative within <strong>Ace Innovation Nexus Ltd</strong> committed to learning, capacity development, and the advancement of practical digital competencies.
              </p>
              <p>
                We believe talent is evenly distributed across communities, but access to structured, modern skill training is not. ACEDEMY was founded to bridge that gap, giving dedicated individuals the tools to build, design, write, create, and launch sustainable careers in the global digital economy.
              </p>
              <p className="text-[#004aad] font-semibold">
                Every skill track within ACEDEMY is made accessible at completely zero cost to all accepted participants.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-display">Our Core Commitments:</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Financial Barriers:</strong> No tuition fees or hidden charges.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Practical Over Theoretical:</strong> Real exercises, live briefs, and portfolio outputs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Human Mentorship:</strong> Direct review and guidance from working industry experts.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================================
          3. WHO IS ACEDEMY FOR? (COMES DIRECTLY AFTER DEFINING ACEDEMY)
          ===================================================================== */}
      <section className="relative py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-widest uppercase font-mono text-[#004aad]">Who Can Join</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
              Who is ACEDEMY for? 👀
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              For <strong>you</strong>: whether you’re a complete beginner, already creating, or simply ready to turn your creativity into a skill.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {targetAudiences.map((aud, i) => {
              const Icon = aud.icon;
              return (
                <div key={i} className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-[#004aad]/40 transition-all text-left flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#004aad] border border-blue-100">
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">{aud.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{aud.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-[10px] font-mono text-[#004aad] font-bold uppercase">
                    Track 0{i + 1}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =====================================================================
          4. SKILLS YOU CAN LEARN & WHAT MAKES US DIFFERENT
          ===================================================================== */}
      <section className="relative py-20 lg:py-24 cosmic-section">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 relative z-10 space-y-20">
          
          {/* Skills Grid */}
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">Curriculum Tracks</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 font-display">
                Skills You Can Learn
              </h2>
              <p className="text-base text-slate-600 font-sans">
                Participants have the opportunity to acquire all of these practical skills <strong>at no cost</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
              {curriculumSkills.map((skill, idx) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-3xl p-6 sm:p-7 cosmic-card tilt-3d perspective-container flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-[#004aad]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 font-display">{skill.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{skill.desc}</p>
                    </div>
                    <div className="mt-6 pt-4 flex items-center justify-between text-[11px] font-bold font-mono border-t border-slate-100">
                      <span className="text-[#004aad] uppercase">Skills Track #{idx + 1}</span>
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

          {/* What Makes Us Different */}
          <div className="space-y-12 pt-8 border-t border-slate-200">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase font-mono text-[#004aad]">Our Edge</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
                What Makes Us Different
              </h2>
              <p className="text-base text-slate-600">
                A community and methodology crafted for genuine career advancement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
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
                      Pillar #{idx + 1}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================================
          5. COHORT JOURNEY: ACEDEMY 1.0 TO ACEDEMY 2.0 (CURRENTLY RUNNING)
          ===================================================================== */}
      <section className="relative py-20 lg:py-24 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 space-y-12 text-left">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-widest uppercase font-mono text-[#004aad]">Cohort Journey</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
              Our Cohort Evolution
            </h2>
            <p className="text-base text-slate-600">
              We&apos;ve had <strong>ACEDEMY 1.0</strong>, and currently, <strong>ACEDEMY 2.0</strong> is actively in session!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* ACEDEMY 1.0 Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-slate-100 text-slate-600 border border-slate-200">
                  COHORT 1.0 &bull; COMPLETED
                </span>
                <span className="text-xs text-slate-400 font-mono font-bold">Maiden Edition</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 font-display">ACEDEMY 1.0</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Our inaugural training cohort successfully introduced ambitious learners to core design and creative concepts, providing free mentorship and laying the ground foundation for our community.
              </p>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Successfully Completed & Graduated</span>
              </div>
            </div>

            {/* ACEDEMY 2.0 Card (Currently Running) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-emerald-300 shadow-md space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  CURRENTLY RUNNING
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700">Active Cohort</span>
              </div>
              <div>
                <span className="text-[11px] font-bold font-mono uppercase text-[#004aad] block">ACE INNOVATION NEXUS LTD PRESENTS</span>
                <h3 className="text-2xl font-black text-slate-900 font-display">ACEDEMY 2.0</h3>
                <p className="text-xs font-bold text-slate-700 mt-1 uppercase tracking-wide">
                  Join a community where you can learn digital skills!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="text-slate-400 font-mono block text-[10px]">DURATION</span>
                  <strong className="text-slate-900 font-bold">6 Weeks</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="text-slate-400 font-mono block text-[10px]">STARTING DATE</span>
                  <strong className="text-slate-900 font-bold">14th Sept, 2026</strong>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Expanded tracks in Web Design, Graphic Design, Content Writing, Content Creation, and Branding with real team tasks.
              </p>

              {/* CRUCIAL NOTICE: CANNOT JOIN ONCE STARTED */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 font-bold text-amber-800">
                  <Lock className="h-4 w-4 shrink-0 text-amber-700" />
                  <span>Cohort In Session &bull; Admissions Closed</span>
                </div>
                <p className="text-[11px] text-amber-800/90 leading-relaxed">
                  <strong>Please note:</strong> Once a cohort officially starts, we do not admit late entries so students can work seamlessly in their designated project teams. ACEDEMY 2.0 is currently running.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================================
          6. STAY UPDATED FOR FUTURE COHORTS & CONTACT INFO
          ===================================================================== */}
      <section className="relative py-20 lg:py-24" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)', borderTop: '1px solid rgba(226, 232, 240, 0.9)' }}>
        <div className="mx-auto max-w-4xl px-6 sm:px-8 relative z-10 text-center space-y-8">
          
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-widest uppercase font-mono text-[#004aad]">Stay Informed</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
              Want to Join the Next Cohort?
            </h2>
            <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              While ACEDEMY 2.0 is actively underway, you can register your interest or reach out directly to be first in line when the next edition opens.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdjdkSw7tPn6kz7WtXj2whf4KjvDveCHMqfn5VYv-WZZjlMzw/viewform"
              target="_blank"
              rel="noreferrer"
              onClick={() => handleHaptic(20)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-bold text-white shadow-md transition-all haptic-press neon-btn"
            >
              <span>Submit Interest for Next Cohort</span>
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
              <span>WhatsApp: 08133915634</span>
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
            Know someone who would benefit? Share this page with them.
          </p>

        </div>
      </section>

    </div>
  );
}
