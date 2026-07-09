import React, { useState, useCallback } from 'react';
import { ArrowUpRight, CheckCircle2, TrendingUp, Target, Code, Camera, X, Award } from 'lucide-react';
import { caseStudies } from '../data';
import { CaseStudy } from '../types';
import KineticText from './KineticText';

export default function ServicesView() {
  const [filterCategory, setFilterCategory] = useState<'All' | 'Branding & Content' | 'Digital Marketing' | 'Web & App Development'>('All');
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);

  const triggerHaptic = useCallback((pattern: number | number[] = 15) => {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(pattern); } catch { /* silent */ }
    }
  }, []);

  const categoriesOrdered: ('All' | 'Branding & Content' | 'Digital Marketing' | 'Web & App Development')[] = [
    'All',
    'Branding & Content',
    'Digital Marketing',
    'Web & App Development'
  ];

  const filteredProjects = caseStudies.filter(p => {
    if (filterCategory === 'All') return true;
    return p.category === filterCategory;
  });

  const mainServices = [
    {
      title: "Digital Marketing & SEO",
      slug: "marketing-seo",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      icon: TrendingUp,
      tag: "Marketing",
      description: "We help your business get found online and turn visitors into customers. From running ads on social media to getting your website to the top of Google — we handle it all so you can focus on your business.",
      bullets: ["Social media ads (Facebook, Instagram, TikTok)", "Google Ads & search engine optimization (SEO)", "Email marketing & WhatsApp campaigns", "Analytics & monthly performance reports"]
    },
    {
      title: "Content Creation & Social Media",
      slug: "content-social",
      img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
      icon: Target,
      tag: "Content",
      description: "Great content is what makes people stop scrolling and pay attention to your brand. We plan, create, and manage your social media content so your brand always looks professional and stays consistent.",
      bullets: ["Social media content planning & posting", "Copywriting for ads, websites & emails", "Brand storytelling & content strategy", "Influencer marketing support"]
    },
    {
      title: "Photography & Videography",
      slug: "photo-video",
      img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      icon: Camera,
      tag: "Media Production",
      description: "Professional photos and videos make your brand look trustworthy and premium. Our team handles everything from product photography to brand commercials — so your visuals do the selling for you.",
      bullets: ["Product & food photography", "Corporate event coverage & portraits", "Brand commercials & social media videos", "Drone & aerial footage"]
    },
    {
      title: "Websites & Mobile Apps",
      slug: "web-apps",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      icon: Code,
      tag: "Development",
      description: "Your website is your 24/7 salesperson. We build fast, beautiful websites and mobile apps that work perfectly — even on slow internet connections. From simple landing pages to full e-commerce stores.",
      bullets: ["Business websites & landing pages", "E-commerce & online stores", "iOS & Android mobile apps", "Website maintenance & updates"]
    }
  ];

  return (
    <div className="w-full">
      
      {/* HEADER HERO BANNER */}
      <section className="relative py-16 lg:py-20 cosmic-section star-field" style={{ borderBottom: '1px solid rgba(139, 92, 246, 0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center max-w-3xl relative z-10">
          <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">What We Do</span>
          <KineticText
            text="Services That Grow Your Business"
            as="h1"
            variant="reveal"
            className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl font-display leading-[1.1]"
            delay={0.2}
          />
          <p className="mt-5 text-lg text-slate-400 leading-relaxed font-sans" style={{ animation: 'fade-in-up 0.8s ease 0.8s forwards', opacity: 0 }}>
            We offer a full range of digital services — from marketing and content creation to professional photography, videography, and custom websites & apps.
          </p>
        </div>
      </section>

      {/* CORE SERVICES CARDS */}
      <section className="relative py-20 lg:py-24 max-w-7xl mx-auto px-6 sm:px-8 cosmic-section">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16 relative z-10">
          <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text">Our Services</span>
          <h2 className="text-3xl font-bold tracking-tight text-white font-display">What We Offer</h2>
          <p className="text-sm text-slate-400">Everything you need to grow your business online — all in one place.</p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 relative z-10">
          {mainServices.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                id={`service-card-${srv.slug}`}
                className="group flex flex-col justify-between rounded-2xl p-6 cosmic-card tilt-3d perspective-container"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden rounded-xl" style={{ background: 'rgba(15, 15, 30, 0.5)' }}>
                    <img
                      referrerPolicy="no-referrer"
                      src={srv.img}
                      alt={srv.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-75 group-hover:opacity-100"
                    />
                    <div className="absolute top-3 left-3 rounded-lg text-white px-3 py-1 text-[10px] font-bold tracking-widest font-mono uppercase" style={{ background: 'linear-gradient(135deg, var(--cosmic-accent), var(--cosmic-cyan))' }}>
                      {srv.tag}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white font-display leading-tight">{srv.title}</h3>
                  </div>

                  <p className="mt-4 text-xs tracking-wide uppercase font-mono font-bold gradient-text">What's Included</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-400">
                    {srv.bullets.map((bull, i) => (
                      <li key={i} className="flex gap-2 items-center">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>{bull}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 text-sm text-slate-500 leading-relaxed font-sans">{srv.description}</p>
                </div>

                <div className="mt-8 pt-5" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)' }}>
                  <span className="text-xs font-bold text-slate-600 font-mono tracking-wider">ACE INNOVATION NEXUS</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FILTERABLE PORTFOLIO SECTION */}
      <section className="relative py-20 lg:py-24 cosmic-section star-field" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-bold tracking-widest uppercase font-mono gradient-text text-center">Our Projects</span>
            <h2 className="text-3xl font-black text-white font-display">Real Results</h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto">Click any project to see what we did and the results we achieved.</p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
            {categoriesOrdered.map((cat) => (
              <button
                key={cat}
                onClick={() => { triggerHaptic(10); setFilterCategory(cat); }}
                className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all border haptic-press ${
                  filterCategory === cat
                    ? 'text-white border-purple-500/40 shadow-sm'
                    : 'text-slate-400 border-purple-500/10 hover:text-white hover:border-purple-500/25'
                }`}
                style={filterCategory === cat ? { background: 'linear-gradient(135deg, var(--cosmic-accent), var(--cosmic-cyan))', boxShadow: 'var(--glow-purple)' } : { background: 'rgba(15, 15, 30, 0.5)' }}
              >
                {cat === 'All' ? 'All Services' : cat}
              </button>
            ))}
          </div>

          {/* Grid display list */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => { triggerHaptic(20); setSelectedProject(project); }}
                className="group cursor-pointer flex flex-col justify-between rounded-2xl p-5 cosmic-card"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden rounded-xl" style={{ background: 'rgba(15, 15, 30, 0.5)' }}>
                    <img
                      referrerPolicy="no-referrer"
                      src={project.image}
                      alt={project.client}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-75 group-hover:opacity-100"
                    />
                    <div className="absolute top-3 left-3 rounded-md px-2.5 py-1 text-[9px] font-bold text-purple-200 uppercase tracking-wider font-mono glass-panel">
                      {project.category}
                    </div>
                  </div>

                  <h3 className="mt-5 text-xs font-bold text-cyan-400 tracking-wide uppercase font-mono">{project.client}</h3>
                  <h4 className="mt-1.5 text-lg font-extrabold text-white font-display leading-tight group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h4>
                  <p className="mt-3 text-sm text-slate-400 line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 pt-5 pr-1 flex items-center justify-between" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)' }}>
                  <div className="flex gap-4">
                    {project.metrics.map((met, idx) => (
                      <div key={idx}>
                        <div className="text-base font-black text-white font-display leading-tight">{met.value}</div>
                        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">{met.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-500/20 text-slate-400 transition-all group-hover:bg-purple-500/20 group-hover:text-purple-300 haptic-press">
                    <ArrowUpRight className="h-4.5 w-4.5" />
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* DETAIL DRAWER / MODAL SHEET */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md" style={{ background: 'rgba(5, 5, 15, 0.85)' }}>
          <div
            id="case-study-modal-container"
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl glass-panel-strong"
            style={{
              animation: 'fade-in-up 0.3s ease forwards',
              boxShadow: '0 0 40px rgba(139, 92, 246, 0.15), 0 25px 50px rgba(0,0,0,0.5)',
            }}
          >
            {/* Close trigger */}
            <button
              onClick={() => { triggerHaptic(10); setSelectedProject(null); }}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-600/30 focus:outline-none transition-colors haptic-press"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Content body */}
            <div className="space-y-6 text-left">
              
              <div>
                <span className="rounded-full px-3 py-1 text-xs font-bold text-purple-200 uppercase tracking-wider font-mono glass-panel">
                  Project &bull; {selectedProject.category}
                </span>
                <span className="text-xs font-bold text-slate-500 block mt-2 font-mono">CLIENT: {selectedProject.client.toUpperCase()}</span>
                <h3 className="mt-2 text-2xl font-black text-white font-display leading-snug">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Graphic aspect */}
              <div className="aspect-video overflow-hidden rounded-2xl" style={{ background: 'rgba(15, 15, 30, 0.5)' }}>
                <img
                  referrerPolicy="no-referrer"
                  src={selectedProject.image}
                  alt={selectedProject.client}
                  className="h-full w-full object-cover opacity-85"
                />
              </div>

              {/* Key numbers metrics */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 py-6" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)', borderBottom: '1px solid rgba(139, 92, 246, 0.1)' }}>
                {selectedProject.metrics.map((metrics_data, idx) => (
                  <div key={idx} className="cosmic-card rounded-xl p-4 text-center">
                    <div className="text-2xl font-black font-display gradient-text">{metrics_data.value}</div>
                    <div className="text-xs font-semibold text-slate-500 mt-1 font-mono uppercase tracking-wider">{metrics_data.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="text-base font-bold text-white font-display">The Challenge</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-sans">{selectedProject.description}</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-base font-bold text-white font-display">What We Did</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-sans">{selectedProject.solution}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-base font-bold text-white font-display">What We Delivered</h4>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {selectedProject.scope.map((scp, idx) => (
                    <div key={idx} className="flex gap-2.5 items-center text-sm text-slate-400">
                      <Award className="h-4 w-4 text-purple-400 shrink-0" />
                      <span>{scp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex justify-end" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)' }}>
                <button
                  id="modal-dismiss-btn"
                  onClick={() => { triggerHaptic(10); setSelectedProject(null); }}
                  className="rounded-xl px-6 py-3 text-sm font-bold text-white transition-all neon-btn haptic-press"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
