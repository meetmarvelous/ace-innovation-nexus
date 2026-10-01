import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Download, Search, ArrowUpRight, CheckCircle2, ArrowLeft, Star, BarChart, Users, ShieldAlert } from 'lucide-react';
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
    id: "hp-life",
    client: "HP LIFE Academy",
    title: "Helping Thousands of Nigerians Learn Free Digital Skills",
    category: "Digital Marketing",
    summary: "Ran a regional digital marketing campaign that registered over 48,000 students for free online courses across Nigeria and other African countries.",
    challenge: "HP LIFE needed to reach young Nigerians and other Africans who could benefit from their free online business courses. The challenge was that many people in these communities had limited data and low trust in online platforms.",
    solution: "We created targeted ads on Facebook, Instagram, and WhatsApp that spoke directly to young learners. We built simple, fast-loading landing pages that worked well even on slow internet. We also set up WhatsApp groups to keep students engaged throughout their courses.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { label: "Students Enrolled", value: "48,000+", subtext: "Across Sub-Saharan Africa" },
      { label: "Return on Ad Spend", value: "3.4x", subtext: "Performance campaign average" },
      { label: "Completion Rate", value: "+42%", subtext: "Boosted by community support" }
    ],
    scope: ["Facebook & Instagram Ads", "WhatsApp Marketing", "Content Creation", "Landing Page Design"],
    team: ["Kofi Owusu (Marketing & SEO)", "Amara Nwachukwu (Creative Director)"]
  },
  {
    id: "checkers",
    client: "Checkers Africa (Nigeria)",
    title: "Building a Stronger Brand for Checkers Across Nigeria",
    category: "Branding & Strategy",
    summary: "Refreshed the Checkers brand with new packaging visuals, professional photography, and video content, driving retail sales up by 124%.",
    challenge: "Checkers wanted to connect with a younger audience in Nigeria. Their packaging looked outdated and they had almost no social media presence. They needed a complete brand refresh that would make people excited about their products.",
    solution: "We redesigned their product packaging with fresh, modern visuals. Our team shot professional product photos and created short video ads for social media. We also ran a viral recipe challenge on Instagram that got millions of views and drove people to buy in stores.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { label: "Sales Increase", value: "+124%", subtext: "Shelf-movement growth" },
      { label: "Video Views", value: "3.2M+", subtext: "Viral campaign reach" },
      { label: "Brand Rating", value: "9.2/10", subtext: "Customer preference survey" }
    ],
    scope: ["Brand Identity Redesign", "Product Photography", "Video Production", "Social Media Campaigns"],
    team: ["Amara Nwachukwu (Creative Director)", "Kofi Owusu (Head of Growth)"]
  },
  {
    id: "fintech",
    client: "NexusPay Technologies",
    title: "Building a Payment App That Processed Over ₦18 Billion",
    category: "Tech Products",
    summary: "Designed and engineered a mobile payment application and merchant dashboard processing ₦18B+ in micro-transactions.",
    challenge: "NexusPay had a great idea for a mobile payment platform for small businesses and market traders. They needed a team to build an app that was simple enough for anyone to use, even people who weren't tech-savvy, and functioned in weak networks.",
    solution: "We built a clean, easy-to-use mobile app for both Android and iOS, along with a web dashboard for merchants to track their sales. The app works even with poor internet connection, so traders in rural areas can still accept payments. We also helped them with SEO and content marketing to attract new users.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { label: "Transactions", value: "₦18B+", subtext: "In 8 months post-launch" },
      { label: "Sign-up Time", value: "< 2 mins", subtext: "Simplified merchant intake" },
      { label: "New Users", value: "+450%", subtext: "Quarter-on-quarter growth" }
    ],
    scope: ["Mobile App Development", "Web Dashboard", "SEO & Content Marketing", "UI/UX Design"],
    team: ["Zainab Alao (Lead Dev)", "Tega John-Sola (Product Strategist)"]
  },
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

  // Lock body scroll when a case study is open to prevent double scrollbars
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

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
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center max-w-4xl relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-[#004aad] border border-blue-200 bg-blue-50/80 no-print">
            <Star className="h-3 w-3 fill-[#004aad] text-[#004aad] animate-pulse" />
            Case Study Portfolio
          </span>

          <div className="perspective-container">
            <KineticText
              text="Our Success Stories"
              as="h1"
              variant="reveal"
              className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl font-display leading-[1.1]"
              delay={0.1}
            />
            <KineticText
              text="Proven Impact & Real Metrics"
              as="h2"
              variant="shimmer"
              className="text-2xl font-bold tracking-tight sm:text-3xl font-display leading-[1.1] mt-2"
              delay={0.6}
            />
          </div>

          <p className="mt-5 text-base text-slate-600 leading-relaxed font-sans max-w-2xl mx-auto">
            Explore the products, digital campaigns, and custom identity systems we have built for businesses worldwide. Click any card to drill down into our challenges, methods, and outcomes.
          </p>

          {/* Quick Metrics Snapshot */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-slate-200">
            <div className="text-center p-3 rounded-2xl glass-panel no-print print-metric">
              <div className="text-2xl font-black text-slate-900 font-display">₦52B+</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono mt-1">Client Wealth Tracked</div>
            </div>
            <div className="text-center p-3 rounded-2xl glass-panel no-print print-metric">
              <div className="text-2xl font-black font-display gradient-text">3.2M+</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono mt-1">Audience Reached</div>
            </div>
            <div className="text-center p-3 rounded-2xl glass-panel no-print print-metric">
              <div className="text-2xl font-black text-slate-900 font-display">4.8★</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono mt-1">Average App Review</div>
            </div>
            <div className="text-center p-3 rounded-2xl glass-panel no-print print-metric">
              <div className="text-2xl font-black text-slate-900 font-display">94%+</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono mt-1">Retention Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & EXPORT CONTROL PANEL */}
      <section className="relative py-8 border-y border-slate-200 glass-panel no-print">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { triggerHaptic(10); setFilterCategory(cat); }}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all border haptic-press ${
                  filterCategory === cat
                    ? 'text-white border-[#004aad] shadow-sm'
                    : 'text-slate-600 border-slate-200 bg-slate-50 hover:text-slate-900 hover:border-slate-300'
                }`}
                style={filterCategory === cat ? { background: '#004aad' } : {}}
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
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#004aad]" />
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
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-600">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">No projects match your filter</h3>
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
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100">
                    <img
                      src={project.image}
                      alt={project.client}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 rounded-lg px-2.5 py-1 text-[9px] font-bold text-slate-800 uppercase tracking-widest font-mono glass-panel border border-slate-200 shadow-xs print-badge">
                      {project.category}
                    </div>
                  </div>

                  <h3 className="mt-5 text-xs font-bold text-[#004aad] tracking-wider uppercase font-mono">{project.client}</h3>
                  <h4 className="mt-2 text-xl font-black text-slate-900 font-display leading-tight group-hover:text-[#004aad] transition-colors">
                    {project.title}
                  </h4>
                  <p className="mt-3 text-xs leading-relaxed text-slate-600 line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                {/* Micro Metric Banner */}
                <div className="mt-6 pt-5 flex items-center justify-between border-t border-slate-200">
                  <div className="flex gap-4">
                    {project.metrics.slice(0, 2).map((met, idx) => (
                      <div key={idx} className="text-left">
                        <div className="text-base font-black text-slate-900 font-display leading-none">{met.value}</div>
                        <div className="text-[8px] text-slate-500 font-bold uppercase tracking-wider font-mono mt-1">{met.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-all group-hover:bg-[#004aad] group-hover:text-white group-hover:border-[#004aad] haptic-press no-print">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* FULL-SCREEN IMMERSIVE CASE STUDY OVERLAY */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-white flex flex-col no-print"
          style={{
            animation: 'fade-in-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
          {/* Top Sticky Bar */}
          <div className="sticky top-0 z-20 w-full glass-panel-strong border-b border-slate-200 py-4 px-6 sm:px-12 flex justify-between items-center">
            <button
              onClick={() => { triggerHaptic(10); setSelectedProject(null); }}
              className="group flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all haptic-press"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Portfolio</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white transition-all neon-btn haptic-press"
            >
              <Download className="h-4 w-4" />
              <span>Export PDF Report</span>
            </button>
          </div>

          {/* Immersive Contents */}
          <div className="w-full max-w-5xl mx-auto px-6 sm:px-12 py-12 space-y-12">
            
            {/* Header info */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1 rounded bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-[#004aad] uppercase tracking-wider font-mono">
                {selectedProject.category}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display leading-tight tracking-tight">
                {selectedProject.title}
              </h2>
              <div className="flex items-center gap-2 text-sm font-bold tracking-wider font-mono text-[#004aad] uppercase">
                <span>CLIENT:</span>
                <span>{selectedProject.client}</span>
              </div>
            </div>

            {/* Immersive Large Image */}
            <div className="relative w-full h-[50vh] overflow-hidden rounded-3xl bg-slate-100 border border-slate-200 shadow-md">
              <img
                src={selectedProject.image}
                alt={selectedProject.client}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Metrics Highlight Panels */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {selectedProject.metrics.map((met, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-3xl glass-panel border border-slate-200 text-center flex flex-col justify-center items-center relative overflow-hidden group hover:border-[#004aad]/40 transition-all duration-300"
                >
                  <span className="block text-3xl sm:text-4xl font-black text-slate-900 font-display leading-none">{met.value}</span>
                  <span className="block text-xs font-black text-[#004aad] uppercase tracking-widest font-mono mt-3">{met.label}</span>
                  {met.subtext && <span className="block text-[10px] text-slate-500 font-medium mt-1">{met.subtext}</span>}
                </div>
              ))}
            </div>

            {/* Comprehensive narrative section */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 pt-10 border-t border-slate-200">
              
              {/* Detailed Breakdown */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-3">
                  <h4 className="text-lg font-bold uppercase text-[#004aad] tracking-wider font-mono">The Challenge</h4>
                  <p className="text-sm text-slate-700 leading-relaxed font-sans">{selectedProject.challenge}</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-lg font-bold uppercase text-[#004aad] tracking-wider font-mono">Our Solution Blueprint</h4>
                  <p className="text-sm text-slate-700 leading-relaxed font-sans">{selectedProject.solution}</p>
                </div>
              </div>

              {/* Sidebar Meta info */}
              <div className="space-y-6 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 bg-slate-50/50" style={{ height: 'fit-content' }}>
                <div className="space-y-4">
                  <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest font-mono">Scope of Deliverables</h4>
                  <ul className="space-y-3 text-xs text-slate-700">
                    {selectedProject.scope.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-slate-200 space-y-3">
                  <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest font-mono">Project Squad</h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 font-mono">
                    {selectedProject.team.map((t, idx) => (
                      <li key={idx}>• {t}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Bottom Back Button */}
            <div className="pt-8 border-t border-slate-200 flex justify-center">
              <button
                onClick={() => { triggerHaptic(10); setSelectedProject(null); }}
                className="rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all haptic-press text-center shadow-xs"
              >
                Return to Masterpieces Grid
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
