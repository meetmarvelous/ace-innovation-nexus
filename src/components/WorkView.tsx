import React, { useState, useMemo, useCallback } from 'react';
import { Download, Search, ArrowUpRight, CheckCircle2, X, Star, FileText, BarChart, Users, ShieldAlert } from 'lucide-react';
import KineticText from './KineticText';

interface CaseStudyDemo {
  id: string;
  client: string;
  title: string;
  category: 'Branding & Strategy' | 'Digital Marketing' | 'Tech Products';
  summary: string;
  challenge: string;
  solution: string;
  image: string;
  metrics: {
    label: string;
    value: string;
    subtext?: string;
  }[];
  scope: string[];
  team: string[];
}

const demoCaseStudies: CaseStudyDemo[] = [
  {
    id: "zenith-fintech",
    client: "Zenith Global Solutions",
    title: "Reimagining Digital Banking for Emerging Markets",
    category: "Tech Products",
    summary: "Built a high-performance cross-border payment app processing over ₦34 Billion in micro-transactions with zero downtime.",
    challenge: "Emerging market merchants struggled with slow, high-fee cross-border transactions, leading to 45% cart abandonment. They needed a lightweight, secure app that could operate on low-bandwidth networks.",
    solution: "We designed a custom micro-banking app using modern react-native interfaces, supported by an optimized API layer that compresses payload size by 70%. Integrated real-time offline payment confirmations via SMS fallback.",
    image: "/images/zenith_fintech_mockup.png",
    metrics: [
      { label: "Transaction Volume", value: "₦34B+", subtext: "Within 10 months" },
      { label: "Active Users", value: "250k+", subtext: "Daily active merchants" },
      { label: "App Store Rating", value: "4.8★", subtext: "From 15k+ reviews" }
    ],
    scope: ["Mobile App Development", "High-Load API Gateway", "UX/UI Architecture", "Security Auditing"],
    team: ["Zainab Alao (Lead Dev)", "Tega John-Sola (Product Strategist)"]
  },
  {
    id: "kola-apparel",
    client: "Kola Group (Nigeria)",
    title: "Scaling African Luxury Fashion to a Global Audience",
    category: "Branding & Strategy",
    summary: "Rebranded Kola Group with elegant editorial designs, professional content shoots, and a targeted global ecommerce pipeline.",
    challenge: "Kola Apparel had premium artisan garments but struggled to convey value online. Their digital presence felt localized and failed to convert international visitors.",
    solution: "We engineered a clean, high-fashion brand identity, shot custom product commercials, and built an optimized international checkout funnel with multi-currency support and tailored SEO.",
    image: "/images/kola_apparel_branding.png",
    metrics: [
      { label: "E-Commerce Conversions", value: "18.5%", subtext: "Up from 2.1%" },
      { label: "Social Impressions", value: "3.2M+", subtext: "During launch week" },
      { label: "Sales Increase", value: "+180%", subtext: "In global markets" }
    ],
    scope: ["Brand Identity Redesign", "Ecommerce Development", "Editorial Videography", "International SEO"],
    team: ["Amara Nwachukwu (Creative Director)", "Kofi Owusu (Head of Growth)"]
  },
  {
    id: "eko-solar",
    client: "Eko Solar & Clean Energy",
    title: "Electrifying Communities via Sustainable Campaigns",
    category: "Digital Marketing",
    summary: "Supercharged solar panel subscription sales across southwestern Nigeria through localized storytelling and high-performing ads.",
    challenge: "High upfront installation costs and limited solar awareness meant Eko Solar struggled to close deals, spending too much on cold sales outreach.",
    solution: "Developed educational video funnels explaining savings, created a simple solar sizing web calculator, and ran targeted lead-generation social ads that pre-qualified leads before sales calls.",
    image: "/images/eko_solar_dashboard.png",
    metrics: [
      { label: "Return on Ad Spend", value: "4.5x", subtext: "Verified ROAS" },
      { label: "Qualified Leads", value: "12,000+", subtext: "With verified contact info" },
      { label: "Customer Acquisition", value: "-25%", subtext: "Reduced marketing cost" }
    ],
    scope: ["Paid Social Campaigns", "Lead-Sizing Tool Dev", "Copywriting", "Performance Analytics"],
    team: ["Kofi Owusu (Marketing & SEO)", "Zainab Alao (Frontend Dev)"]
  }
];

export default function WorkView() {
  const [filterCategory, setFilterCategory] = useState<'All' | 'Branding & Strategy' | 'Digital Marketing' | 'Tech Products'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<CaseStudyDemo | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const triggerHaptic = useCallback((pattern: number | number[] = 15) => {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(pattern); } catch { /* silent */ }
    }
  }, []);

  const categories: ('All' | 'Branding & Strategy' | 'Digital Marketing' | 'Tech Products')[] = [
    'All',
    'Branding & Strategy',
    'Digital Marketing',
    'Tech Products'
  ];

  // Filtering Logic
  const filteredProjects = useMemo(() => {
    return demoCaseStudies.filter(p => {
      const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
      const matchesSearch = p.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.summary.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.scope.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [filterCategory, searchQuery]);

  const handlePrint = () => {
    triggerHaptic([30, 80, 30]);
    setIsExporting(true);
    // Give time for layout update if needed
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 500);
  };

  return (
    <div className="w-full relative min-h-screen">
      {/* Dynamic styles injected for printing standard standalone PDF layouts */}
      <style>{`
        @media print {
          body, html {
            background: #ffffff !important;
            color: #000000 !important;
            font-family: 'Inter', sans-serif !important;
          }
          /* Hide non-essential layout blocks */
          header, footer, .no-print, #guide-minimized-btn, #guide-character-btn {
            display: none !important;
          }
          .cosmic-section, .cosmic-card {
            background: none !important;
            border: 1px solid #e2e8f0 !important;
            box-shadow: none !important;
            color: #000000 !important;
            transform: none !important;
            page-break-inside: avoid;
            margin-bottom: 2rem;
          }
          .gradient-text, .shimmer-text, .text-glow-purple, .text-glow-cyan {
            background: none !important;
            -webkit-text-fill-color: initial !important;
            color: #7c3aed !important;
            text-shadow: none !important;
          }
          .print-header {
            display: block !important;
            border-bottom: 2px solid #7c3aed;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
          }
          .print-title {
            font-size: 2rem;
            font-weight: 800;
            color: #1a1a2e;
          }
          .print-metric {
            border: 1px solid #cbd5e1 !important;
            padding: 10px !important;
            margin: 5px !important;
            background: #f8fafc !important;
          }
          .print-badge {
            border: 1px solid #7c3aed !important;
            color: #7c3aed !important;
            background: none !important;
          }
        }
      `}</style>

      {/* Print-Only Header */}
      <div className="hidden print-header text-left">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="print-title">ACE INNOVATION NEXUS</h1>
            <p className="text-sm text-slate-500 uppercase tracking-widest font-mono">Case Study Portfolio Deck</p>
          </div>
          <div className="text-right text-xs font-mono text-slate-400">
            Generated on {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* HERO BANNER SECTION */}
      <section className="relative py-16 lg:py-24 cosmic-section star-field">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center max-w-4xl relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-purple-300 border border-purple-500/25 no-print" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
            <Star className="h-3 w-3 fill-purple-400 text-purple-400 animate-pulse" />
            Standalone Showcase Portal
          </span>

          <div className="perspective-container">
            <KineticText
              text="Our Creative Masterpieces"
              as="h1"
              variant="reveal"
              className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl font-display leading-[1.1]"
              delay={0.1}
            />
            <KineticText
              text="Proven Impact & Real Revenue"
              as="h2"
              variant="shimmer"
              className="text-2xl font-bold tracking-tight sm:text-3xl font-display leading-[1.1] mt-2"
              delay={0.6}
            />
          </div>

          <p className="mt-5 text-base text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
            Explore the products, digital campaigns, and custom identity systems we have built for businesses worldwide. Click any card to drill down into our challenges, methods, and outcomes.
          </p>

          {/* Quick Metrics Snapshot */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-purple-500/10">
            <div className="text-center p-3 rounded-2xl glass-panel no-print print-metric">
              <div className="text-2xl font-black text-white font-display text-glow-purple">₦52B+</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono mt-1">Client Wealth Tracked</div>
            </div>
            <div className="text-center p-3 rounded-2xl glass-panel no-print print-metric">
              <div className="text-2xl font-black text-white font-display gradient-text">3.2M+</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono mt-1">Audience Reached</div>
            </div>
            <div className="text-center p-3 rounded-2xl glass-panel no-print print-metric">
              <div className="text-2xl font-black text-white font-display text-glow-cyan">4.8★</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono mt-1">Average App Review</div>
            </div>
            <div className="text-center p-3 rounded-2xl glass-panel no-print print-metric">
              <div className="text-2xl font-black text-white font-display text-glow-purple">94%+</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono mt-1">Retention Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & EXPORT CONTROL PANEL */}
      <section className="relative py-8 border-y border-purple-500/10 glass-panel no-print">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { triggerHaptic(10); setFilterCategory(cat); }}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all border haptic-press ${
                  filterCategory === cat
                    ? 'text-white border-purple-500/40 shadow-sm'
                    : 'text-slate-400 border-purple-500/10 hover:text-white hover:border-purple-500/25'
                }`}
                style={filterCategory === cat ? { background: 'linear-gradient(135deg, var(--cosmic-accent), var(--cosmic-cyan))', boxShadow: 'var(--glow-purple)' } : { background: 'rgba(15, 15, 30, 0.4)' }}
              >
                {cat === 'All' ? 'All Masterpieces' : cat}
              </button>
            ))}
          </div>

          {/* Interactive Controls */}
          <div className="flex w-full md:w-auto items-center gap-3">
            <div className="relative flex-grow md:flex-grow-0">
              <input
                type="text"
                placeholder="Search by keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-60 pl-10 pr-4 py-2.5 rounded-full text-xs cosmic-input font-sans"
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-purple-400" />
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold text-white transition-all neon-btn haptic-press shrink-0"
              title="Download Portfolio PDF"
            >
              <Download className="h-4 w-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </section>

      {/* PORTFOLIO GRID CONTAINER */}
      <section className="relative py-16 max-w-7xl mx-auto px-6 sm:px-8">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 space-y-4 no-print">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">No projects match your filter</h3>
              <p className="text-xs text-slate-500 mt-1">Try resetting the categories or search parameters.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                onClick={() => { triggerHaptic(20); setSelectedProject(project); }}
                className="group cursor-pointer flex flex-col justify-between rounded-3xl p-5 cosmic-card tilt-3d perspective-container relative overflow-hidden"
              >
                <div>
                  {/* Thumbnail Cover */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl" style={{ background: 'rgba(15, 15, 30, 0.5)' }}>
                    <img
                      src={project.image}
                      alt={project.client}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute top-3 left-3 rounded-lg px-2.5 py-1 text-[9px] font-bold text-purple-200 uppercase tracking-widest font-mono glass-panel print-badge">
                      {project.category}
                    </div>
                  </div>

                  <h3 className="mt-5 text-xs font-bold text-cyan-400 tracking-wider uppercase font-mono">{project.client}</h3>
                  <h4 className="mt-2 text-xl font-black text-white font-display leading-tight group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h4>
                  <p className="mt-3 text-xs leading-relaxed text-slate-400 line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                {/* Micro Metric Banner */}
                <div className="mt-6 pt-5 flex items-center justify-between border-t border-purple-500/10">
                  <div className="flex gap-4">
                    {project.metrics.slice(0, 2).map((met, idx) => (
                      <div key={idx} className="text-left">
                        <div className="text-base font-black text-white font-display leading-none">{met.value}</div>
                        <div className="text-[8px] text-slate-500 font-bold uppercase tracking-wider font-mono mt-1">{met.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-purple-500/20 text-slate-400 transition-all group-hover:bg-purple-600/30 group-hover:text-white haptic-press no-print">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* DETAILED PROJECT MODAL SHEETS */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md no-print" style={{ background: 'rgba(5, 5, 15, 0.85)' }}>
          <div
            id="case-study-modal-container"
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl glass-panel-strong border border-purple-500/20"
            style={{
              animation: 'fade-in-up 0.3s ease forwards',
              boxShadow: '0 0 40px rgba(139, 92, 246, 0.15), 0 25px 50px rgba(0,0,0,0.5)',
            }}
          >
            {/* Close */}
            <button
              onClick={() => { triggerHaptic(10); setSelectedProject(null); }}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-600/30 focus:outline-none transition-colors haptic-press"
              title="Close Portal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Body */}
            <div className="space-y-6 text-left">
              <div>
                <span className="rounded-full px-3.5 py-1.5 text-xs font-bold text-purple-300 uppercase tracking-wider font-mono glass-panel">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display mt-4 leading-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-sm font-semibold tracking-wider font-mono text-cyan-400 mt-2 uppercase">{selectedProject.client}</p>
              </div>

              {/* Cover Banner */}
              <div className="relative w-full h-56 sm:h-80 overflow-hidden rounded-2xl bg-slate-950">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.client}
                  className="w-full h-full object-cover opacity-80"
                />
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {selectedProject.metrics.map((met, idx) => (
                  <div key={idx} className="p-4 rounded-2xl glass-panel border border-purple-500/10 text-center">
                    <span className="block text-2xl font-black text-white font-display leading-tight">{met.value}</span>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono mt-1">{met.label}</span>
                    {met.subtext && <span className="block text-[9px] text-slate-400 mt-0.5">{met.subtext}</span>}
                  </div>
                ))}
              </div>

              {/* Narrative Content */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3 pt-4 border-t border-purple-500/10">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold uppercase text-purple-300 tracking-wider font-mono">The Challenge</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mt-2 font-sans">{selectedProject.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase text-cyan-300 tracking-wider font-mono">Our Blueprint Solution</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mt-2 font-sans">{selectedProject.solution}</p>
                  </div>
                </div>

                {/* Sidebar details */}
                <div className="space-y-4 p-5 rounded-2xl glass-panel" style={{ background: 'rgba(15,15,30,0.4)' }}>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Scope of Deliverables</h4>
                    <ul className="mt-2.5 space-y-2 text-xs text-slate-300">
                      {selectedProject.scope.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mt-4">Project Squad</h4>
                    <ul className="mt-2 space-y-1 text-xs text-slate-400 font-mono">
                      {selectedProject.team.map((t, idx) => (
                        <li key={idx}>• {t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-purple-500/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={() => { triggerHaptic(10); setSelectedProject(null); }}
                  className="w-full sm:w-auto rounded-xl border border-purple-500/25 bg-purple-500/5 px-6 py-2.5 text-xs font-bold text-purple-300 hover:bg-purple-500/10 transition-colors haptic-press text-center"
                >
                  Back to Portfolio
                </button>
                
                <button
                  onClick={handlePrint}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold text-white transition-all neon-btn haptic-press"
                >
                  <Download className="h-4 w-4" />
                  <span>Download PDF Deck</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
