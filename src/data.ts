import { CaseStudy, TeamMember, JobRole, PartnerTier, RegionPartner, InsightArticle } from './types';

export const caseStudies: CaseStudy[] = [
  {
    id: "hp-life",
    client: "HP LIFE Academy",
    title: "Equipping Next-Gen African Entrepreneurs with Critical Skills",
    category: "Digital Marketing",
    summary: "A localized digital-first campaign that accelerated student registrations and empowered thousands of learners across sub-Saharan Africa with free skills courses.",
    description: "Ace Innovation Nexus partnered with HP LIFE to build hyper-targeted brand recognition and drive enrollment for virtual enterprise courses. Understanding community barriers like data costs and low digital trust, we tailored direct micro-learning marketing structures.",
    solution: "We engineered high-performing algorithmic SEO, localized micro-marketing assets across WhatsApp and Instagram, and established low-latency landing portals. This allowed learners on restricted mobile data to frictionlessly enroll and absolute-grade certificates to be generated natively.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { label: "Enrolled Students", value: "48,000+" },
      { label: "Direct Campaign ROI", value: "3.4x" },
      { label: "Retention Spike", value: "+42%" }
    ],
    scope: [
      "Targeted Performance Ads",
      "WhatsApp Outreach Automation",
      "Localized Content Production",
      "User Intake Optimizations"
    ]
  },
  {
    id: "checkers",
    client: "Checkers Africa (Nigeria)",
    title: "Crafting an Unmissable Consumer Brand Across Digital Environments",
    category: "Branding & Strategy",
    summary: "Transforming a household brand into a digitally buzzing media sensation, resulting in a recorded 124% brick-and-mortar retail sales uplift.",
    description: "Ace Innovation Nexus re-engineered Checkers’ core packaging presentation, digital-social footprint, and merchant coordination tools to align with a younger, highly active demographic of modern retail consumers.",
    solution: "We deployed immersive recipe creator challenges, customized 3D animation shorts, and developed hyper-local geofenced social filters that incentivized in-store supermarket purchases via instant digital coupons.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { label: "Retail Growth Spike", value: "+124%" },
      { label: "Social Media Views", value: "3.2M+" },
      { label: "Brand Equity Index", value: "9.2/10" }
    ],
    scope: [
      "Custom Packaging Identity",
      "3D Product Visuals & Ads",
      "Geofenced Micro-Campaigns",
      "Viral Culinary Challenges"
    ]
  },
  {
    id: "fintech",
    client: "NexusPay Technologies",
    title: "Engineering High-Trust Digital Wallets for Informal Commerce",
    category: "Tech Products",
    summary: "Developing a lightning-fast React native merchant UX which securely processed over $12M of transactions in under eight months.",
    description: "Ace Innovation Nexus took an ambitious financial-inclusion concept and forged a high-performance, low-bandwidth ecosystem mapping rural retail accounts into a unified cloud-backed platform.",
    solution: "We designed a lightweight React Merchant dashboard with native multi-regional support, synchronized off-network database states, and complemented it with an authoritative organic SEO marketing campaign to rank first for micro-retail terminology.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { label: "Transaction Volume", value: "$12M+" },
      { label: "Onboarding Latency", value: "< 2 mins" },
      { label: "SEO Acquisition", value: "+450%" }
    ],
    scope: [
      "Lightweight React Interfaces",
      "Offline Data Sync Layer",
      "High-Authority Lead Gen",
      "Payment Gateway Wrappers"
    ]
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: "team-1",
    name: "Tega John-Sola",
    role: "Founder & Chief Growth Architect",
    department: "Leadership",
    bio: "Over a decade of leadership at the intersection of performance marketing, technical products, and strategic design. Focused on positioning African high-growth ventures globally.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: "team-2",
    name: "Amara Nwachukwu",
    role: "Director of Digital Strategy & Brands",
    department: "Creative & Brand",
    bio: "An award-winning brand strategist expert at deploying large-scale consumer campaigns. Architect of retail visual models that drive deep, authentic buyer loyalty.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: "team-3",
    name: "Kofi Owusu",
    role: "Head of SEO & Growth Engineering",
    department: "Marketing & SEO",
    bio: "Obsessed with search architecture and organic scaling loops. Kofi builds proprietary SEO distribution strategies that render pay-per-click models obsolete.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: "team-4",
    name: "Zainab Alao",
    role: "Principal Product & Full-Stack Engineer",
    department: "Tech & Product",
    bio: "Specializing in React, low-data footprint PWAs, and bulletproof server APIs. Dedicated to writing fast, performant code that bridges local environments with global cloud nodes.",
    avatar: "https://images.unsplash.com/photo-1534751516642-a131ffd473fd?auto=format&fit=crop&w=300&h=300&q=80"
  }
];

export const jobRoles: JobRole[] = [
  {
    id: "job-seo",
    title: "Senior SEO Architect & Strategist",
    department: "Growth",
    location: "Ibadan, Nigeria / Remote",
    type: "Full-time",
    salaryEstimate: "Competitive Strategy Rate + Performance Bonus",
    description: "We are seeking a seasoned organic growth master to architect high-intent, authoritative search discovery loops for our international client roster.",
    responsibilities: [
      "Perform reverse keyword clustering and semantic gap mapping across diverse competitive verticals.",
      "Direct technical SEO structural audits (rendering structures, hydration latency, structured schema).",
      "Collaborate with our content writers to engineer authority clusters that secure rank 1 positioning.",
      "Present quantitative analytics, backlink strategy results, and organic value reports directly to client stakeholders."
    ],
    requirements: [
      "4+ years of proven organic growth leadership with demonstrable, high-volume search rankings.",
      "Expert knowledge of crawling pipelines, headless site auditing, search console interfaces, and premium analytics suites.",
      "Decisive capability to build organic content systems with measurable conversion uplifts.",
      "Comfort working in rapid, highly agile remote environments."
    ]
  },
  {
    id: "job-eng",
    title: "Lead Full-Stack Web Engineer (React/Node)",
    department: "Tech",
    location: "Ibadan, Nigeria / Remote",
    type: "Full-time",
    salaryEstimate: "Industry-Leading Portfolio Rate",
    description: "Join us in engineering robust, visually jaw-dropping frontends and scalable, low-latency backends for brands shaping informal commerce and consumer markets.",
    responsibilities: [
      "Develop modular React layouts styled with precision Tailwind CSS and fluid micro-animations.",
      "Write secure, lightning-fast Node/Express API proxy routes with caching systems to guard secret API variables.",
      "Deliver optimal asset bundle configurations, offline sync caches, and accessible interactive modules.",
      "Enforce immaculate TypeScript structures and code review pipelines."
    ],
    requirements: [
      "5+ years professional experience across modern TypeScript frameworks (React, Vite, Node, Express).",
      "Strong aesthetic sensibility and attention to responsive details (layout shifts, visual density, animations).",
      "Familiarity with Firestore/Firebase services, relational configurations, and security rule pipelines.",
      "Proficiency optimizing builds for mobile-first web platforms."
    ]
  },
  {
    id: "job-creative",
    title: "Creative Content & Branding Director",
    department: "Creative",
    location: "Ibadan, Nigeria / Remote",
    type: "Contract",
    salaryEstimate: "Project Milestone + Retainer Option",
    description: "Looking for an energetic storyteller capable of shaping visual guidelines, social narratives, and high-impact brand strategies.",
    responsibilities: [
      "Formulate cohesive design languages, typography frameworks, and brand systems for fast-growing companies.",
      "Direct high-energy video content concepts, interactive social filters, and viral media campaigns.",
      "Oversee copy guidelines ensuring high tone consistency across web portals, retail channels, and pitches.",
      "Direct external photography and multi-channel creative productions."
    ],
    requirements: [
      "3+ years in agencies or high-velocity startups directing brand directions and copywriting teams.",
      "A rich visual portfolio showcasing versatile expressions across social media, web layouts, and consumer retail.",
      "Solid command of current design suites (Figma, Adobe Creative Suite) and motion concepts.",
      "Fluent presentation skills to deliver brand stories authentically."
    ]
  }
];

export const partnerTiers: PartnerTier[] = [
  {
    id: "tier-strategic",
    name: "Strategic Consulting & Growth",
    tagline: "Co-architecting market strategies for enterprise scaling.",
    description: "For management consultancies, private equity nodes, and capital accelerators looking to supercharge their portfolio companies with expert branding and immediate performance pipelines.",
    targetAudience: "Venture Studios, Local Consultancies, Incubators",
    benefits: [
      "Direct dedicated strategic consulting hours with Chief Architecture officers",
      "Co-branded market trend projections and joint SEO blueprint publications",
      "Preferred portfolio prioritization and customized volume pricing brackets",
      "Direct access to our unified creative and development pipelines"
    ]
  },
  {
    id: "tier-ecosystem",
    name: "Agency & Tech Implementation",
    tagline: "Deep technical expansion and seamless performance integration.",
    description: "For SaaS startups, platform providers, and specialized technical providers seeking pristine, robust implementation and premium Web Application development for their end clients.",
    targetAudience: "Tech Platforms, SaaS Companies, Engineering Houses",
    benefits: [
      "Native integrations built to modern API architectures and security standard",
      "Priority API sandbox environments and shared developer technical feedback loops",
      "Warm client introductions and mutual co-selling pipelines",
      "Comprehensive digital marketing support to accelerate app adoption rates"
    ]
  },
  {
    id: "tier-talent",
    name: "Empowerment & Talent Hubs",
    tagline: "Cultivating elite digital capabilities in hyper-local markets.",
    description: "In collaboration with top design academies, tech bootcamps, and digital non-profits (like HP LIFE), we co-craft high-impact educational frameworks to bridge local talent with active global networks.",
    targetAudience: "Digital Academies, Innovation Hubs, Tech Bootcamps",
    benefits: [
      "Curriculum blueprints co-created with active, industry-level specialists",
      "Guaranteed internship placement channels for high-performing graduates",
      "Sponsorship of regional hackathons and specialized design workshops",
      "Integration with Ace Innovation apprentice networks"
    ]
  }
];

export const regionPartners: RegionPartner[] = [
  {
    id: "reg-nga",
    country: "Nigeria",
    name: "Ace Innovation Nexus (Ibadan HQ)",
    logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=200&h=200&q=80",
    scale: "Primary Operational HQ",
    details: "Our central nerve center coordinating media production, performance metrics, specialized SEO engineering, and full-stack technical build developments.",
    latLng: { top: "62%", left: "45%" }
  }
];

export const staticInsights: InsightArticle[] = [
  {
    id: "ins-feat",
    title: "The Architecture of Organic Scale: Why Paid Ads Fail Without SEO Pillars",
    category: "SEO Strategy",
    readTime: "6 Min Read",
    date: "June 2026",
    summary: "Relying purely on programmatic bidding is a financial bottomless pit. Learn how we configure semantically-grouped keyword engines to lock in long-term buyer traffic.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    author: "Kofi Owusu"
  },
  {
    id: "ins-mktg",
    title: "Decoding Consumer Resonance: Localized FMCG Retail Campaigns",
    category: "Branding",
    readTime: "4 Min Read",
    date: "May 2026",
    summary: "Packaged goods demand persistent visibility. See our retail engagement blueprints that transformed regional consumer behaviors for leading food conglomerates.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    author: "Amara Nwachukwu"
  },
  {
    id: "ins-cons",
    title: "Connecting Local Talents to Global Inbound Pipelines",
    category: "Consulting",
    readTime: "5 Min Read",
    date: "April 2026",
    summary: "How upskilling initiatives like HP LIFE bridge local business resource gaps and output ready-made digital leaders for international companies.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    author: "Tega John-Sola"
  },
  {
    id: "ins-tech",
    title: "Optimizing Core Web Vitals for Low-Bandwidth Infrastructure",
    category: "Engineering",
    readTime: "7 Min Read",
    date: "March 2026",
    summary: "A practical deep-dive into bundle splitting, client-side caching, and image lazy-loading to make React applications fly on mid-range smartphones.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    author: "Zainab Alao"
  }
];
