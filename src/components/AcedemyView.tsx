import React from 'react';
import { ArrowUpRight, Sparkles, BookOpen, Code2, Palette, Camera, TrendingUp, Users, GraduationCap } from 'lucide-react';
import KineticText from './KineticText';

export default function AcedemyView() {
  const skills = [
    { icon: Code2, name: "Web & App Development", desc: "Build modern websites and mobile applications from scratch." },
    { icon: Palette, name: "Graphic Design & Branding", desc: "Create stunning visual identities and brand assets." },
    { icon: Camera, name: "Photography & Videography", desc: "Master professional photography and video production." },
    { icon: TrendingUp, name: "Digital Marketing & SEO", desc: "Learn to grow businesses online through proven marketing strategies." },
    { icon: Users, name: "Social Media Management", desc: "Build and manage engaging social media communities." },
    { icon: BookOpen, name: "Content Creation", desc: "Craft compelling content that drives engagement and conversions." },
  ];

  return (
    <div className="w-full">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-20 lg:py-28 star-field cosmic-section">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-teal-50/20 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-4xl px-6 sm:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold border border-emerald-200 bg-emerald-50/80 shadow-xs" style={{ color: '#047857' }}>
            <GraduationCap className="h-3.5 w-3.5" style={{ color: '#047857' }} />
            Skill Training Initiative
          </span>

          <div className="mt-6">
            <KineticText
              text="Welcome to"
              as="h1"
              variant="reveal"
              className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl font-display leading-[1.1]"
              delay={0.2}
            />
            <KineticText
              text="ACEDEMY"
              as="h1"
              variant="shimmer"
              className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl font-display leading-[1.1] mt-1"
              delay={0.8}
            />
          </div>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed font-sans" style={{ animation: 'fade-in-up 0.8s ease 1s forwards', opacity: 0 }}>
            We're delighted to share an opportunity from ACEDEMY, an initiative within our company committed to learning, capacity development, and the advancement of practical skills.
          </p>

          <p className="mt-4 max-w-2xl mx-auto text-base text-slate-500 leading-relaxed font-sans" style={{ animation: 'fade-in-up 0.8s ease 1.2s forwards', opacity: 0 }}>
            In an increasingly competitive world, the right knowledge and practical competencies can create access to opportunities that would otherwise remain out of reach.
          </p>
        </div>
      </section>

      {/* SKILLS OFFERED */}
      <section className="relative py-20 lg:py-24 cosmic-section" style={{ borderTop: '1px solid rgba(226, 232, 240, 0.9)' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">What You'll Learn</span>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl font-display">
              Skills That Open Doors
            </h2>
            <p className="text-base text-slate-600 font-sans">
              Participants have the opportunity to acquire all the skills listed below <strong>at no cost</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {skills.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <div key={idx} className="rounded-2xl p-6 cosmic-card tilt-3d perspective-container" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200" style={{ color: '#047857' }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900 font-display">{skill.name}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{skill.desc}</p>
                  <div className="mt-4 pt-3 flex items-center justify-between text-[10px] font-bold font-mono" style={{ borderTop: '1px solid rgba(226, 232, 240, 0.8)' }}>
                    <span className="text-slate-400 uppercase">Free Training</span>
                    <span className="text-emerald-600">✓ Available</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* REGISTER & MORE INFO */}
      <section className="relative py-20 lg:py-24" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)', borderTop: '1px solid rgba(226, 232, 240, 0.9)' }}>
        <div className="mx-auto max-w-4xl px-6 sm:px-8 relative z-10 text-center">
          
          {/* Coming Soon Badge */}
          <div className="mb-10">
            <div className="relative inline-block">
              <div
                className="absolute -inset-1 rounded-2xl blur-md opacity-50"
                style={{ background: 'linear-gradient(135deg, #10b981, #059669, #047857)' }}
              />
              <div className="relative rounded-2xl px-10 py-6 text-center" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}>
                <Sparkles className="h-8 w-8 mx-auto mb-2" />
                <span className="text-2xl font-black font-display tracking-tight block">More Info Coming Soon</span>
                <span className="text-sm font-semibold opacity-90 block mt-1">Full curriculum and schedule details</span>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 sm:text-3xl font-display">
            Ready to Start Learning?
          </h2>
          <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            If you or someone you know would benefit from this opportunity, register now or share the link. All skills are offered at no cost.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdjdkSw7tPn6kz7WtXj2whf4KjvDveCHMqfn5VYv-WZZjlMzw/viewform"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-1.5 rounded-xl px-8 py-4 text-sm font-bold text-white shadow-md transition-all haptic-press neon-btn"
            >
              Register Now — It's Free
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <p className="mt-6 text-xs text-slate-500 font-medium">
            Know someone who would benefit? Share this page with them.
          </p>
        </div>
      </section>

    </div>
  );
}
