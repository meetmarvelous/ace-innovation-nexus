import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, TrendingUp, DollarSign, Target, Crown, Info, X } from 'lucide-react';
import KineticText from './KineticText';
import { triggerHaptic } from '../utils/haptics';

export default function OnePercentView() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSocialClick = (platform: string) => {
    triggerHaptic(20);
    setToastMessage(`The 1% Club official ${platform} page will be updated soon!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="w-full relative">
      
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div 
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900/95 text-white border border-amber-500/30 shadow-2xl backdrop-blur-md animate-fade-in-up transition-all"
          style={{ animation: 'fade-in-up 0.3s ease forwards' }}
        >
          <div className="h-7 w-7 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="text-xs font-semibold pr-2 font-sans">
            {toastMessage}
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            title="Dismiss notification"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-20 lg:py-28 star-field cosmic-section">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-yellow-50/20 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-4xl px-6 sm:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold border border-amber-200 bg-amber-50/80 shadow-xs" style={{ color: '#b45309' }}>
            <Crown className="h-3.5 w-3.5" style={{ color: '#b45309' }} />
            The 1% Club by Ace
          </span>

          <div className="mt-6">
            <KineticText
              text="Welcome to the"
              as="h1"
              variant="reveal"
              className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl font-display leading-[1.1]"
              delay={0.2}
            />
            <KineticText
              text="1% Club"
              as="h1"
              variant="shimmer"
              className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl font-display leading-[1.1] mt-1"
              delay={0.8}
            />
          </div>

          <div className="mt-6 max-w-2xl mx-auto space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-sans" style={{ animation: 'fade-in-up 0.8s ease 1s forwards', opacity: 0 }}>
            <p className="font-semibold text-slate-800">
              You&apos;re here because you&apos;ve chosen a different path: the path of discipline, knowledge, and long-term wealth creation.
            </p>
            <p className="text-slate-600 text-sm sm:text-base">
              This isn&apos;t a community for chasing quick profits or following market hype. It&apos;s a place where we learn to think like investors, understand businesses, and make informed decisions.
            </p>
            <p className="text-[#b45309] font-bold font-display text-lg sm:text-xl pt-1">
              Welcome to the 1%.
            </p>
          </div>

          {/* Active Community Status & Actions */}
          <div
            className="mt-8 flex flex-col items-center justify-center gap-4"
            style={{ animation: 'fade-in-up 0.8s ease 1.2s forwards', opacity: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ACTIVE COMMUNITY &bull; SESSIONS IN PROGRESS
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleSocialClick('X (Twitter)')}
                className="flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold text-white transition-all haptic-press shadow-xs hover:opacity-90"
                style={{ background: '#000' }}
              >
                Follow on X
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleSocialClick('LinkedIn')}
                className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50 haptic-press shadow-xs"
              >
                Connect on LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="relative py-20 lg:py-24 cosmic-section" style={{ borderTop: '1px solid rgba(226, 232, 240, 0.9)' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">What to Expect</span>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl font-display">
              The Financial Literacy Journey
            </h2>
            <p className="text-base text-slate-600 font-sans">
              We share practical lessons, actionable nuggets, and insights covering essential aspects of money management, investing, and building an intentional relationship with money.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {[
              { icon: DollarSign, title: "Money Management", desc: "Learn practical strategies for budgeting, saving, and managing your personal and business finances effectively." },
              { icon: TrendingUp, title: "Investing Basics", desc: "Understand the fundamentals of investing, building wealth over time, and making your money work for you." },
              { icon: Target, title: "Financial Intentionality", desc: "Build a more intentional relationship with money through mindset shifts and actionable frameworks." }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="rounded-2xl p-6 cosmic-card tilt-3d perspective-container">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 border border-amber-200" style={{ color: '#b45309' }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900 font-display">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>


        </div>
      </section>

    </div>
  );
}

