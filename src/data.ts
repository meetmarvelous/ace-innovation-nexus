import { CaseStudy, TeamMember, JobRole, PartnerTier, RegionPartner, InsightArticle, AssociatedOrganization } from './types';

export const caseStudies: CaseStudy[] = [
  {
    id: "hp-life",
    client: "HP LIFE Academy",
    title: "Helping Thousands of Nigerians Learn Free Digital Skills",
    category: "Digital Marketing",
    summary: "We ran a digital marketing campaign that got over 48,000 students to sign up for free online courses across Nigeria and other African countries.",
    description: "HP LIFE needed to reach young Nigerians and other Africans who could benefit from their free online business courses. The challenge was that many people in these communities had limited data and low trust in online platforms.",
    solution: "We created targeted ads on Facebook, Instagram, and WhatsApp that spoke directly to young learners. We built simple, fast-loading landing pages that worked well even on slow internet. We also set up WhatsApp groups to keep students engaged throughout their courses.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { label: "Students Enrolled", value: "48,000+" },
      { label: "Return on Ad Spend", value: "3.4x" },
      { label: "Completion Rate", value: "+42%" }
    ],
    scope: [
      "Facebook & Instagram Ads",
      "WhatsApp Marketing",
      "Content Creation",
      "Landing Page Design"
    ]
  },
  {
    id: "checkers",
    client: "Checkers Africa (Nigeria)",
    title: "Building a Stronger Brand for Checkers Across Nigeria",
    category: "Branding & Content",
    summary: "We refreshed the Checkers brand with new visuals, professional photography, and video content — leading to a 124% increase in retail sales.",
    description: "Checkers wanted to connect with a younger audience in Nigeria. Their packaging looked outdated and they had almost no social media presence. They needed a complete brand refresh that would make people excited about their products.",
    solution: "We redesigned their product packaging with fresh, modern visuals. Our team shot professional product photos and created short video ads for social media. We also ran a viral recipe challenge on Instagram that got millions of views and drove people to buy in stores.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { label: "Sales Increase", value: "+124%" },
      { label: "Video Views", value: "3.2M+" },
      { label: "Brand Rating", value: "9.2/10" }
    ],
    scope: [
      "Brand Identity Redesign",
      "Product Photography",
      "Video Production",
      "Social Media Campaigns"
    ]
  },
  {
    id: "fintech",
    client: "NexusPay Technologies",
    title: "Building a Payment App That Processed Over ₦18 Billion",
    category: "Web & App Development",
    summary: "We designed and built a mobile payment app and merchant dashboard that processed over ₦18 billion in transactions within eight months.",
    description: "NexusPay had a great idea for a mobile payment platform for small businesses and market traders. They needed a team to build an app that was simple enough for anyone to use, even people who weren't tech-savvy.",
    solution: "We built a clean, easy-to-use mobile app for both Android and iOS, along with a web dashboard for merchants to track their sales. The app works even with poor internet connection, so traders in rural areas can still accept payments. We also helped them with SEO and content marketing to attract new users.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { label: "Transactions", value: "₦18B+" },
      { label: "Sign-up Time", value: "Under 2 mins" },
      { label: "New Users", value: "+450%" }
    ],
    scope: [
      "Mobile App Development",
      "Web Dashboard",
      "SEO & Content Marketing",
      "UI/UX Design"
    ]
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: "team-1",
    name: "Tega John-Sola",
    role: "Founder & CEO",
    department: "Leadership",
    bio: "Over a decade of experience helping businesses grow through digital marketing, branding, and technology. Passionate about putting African businesses on the global map.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: "team-2",
    name: "Amara Nwachukwu",
    role: "Creative Director",
    department: "Creative & Brand",
    bio: "Award-winning creative with a sharp eye for design, photography direction, and brand storytelling. She makes brands look so good, customers can't scroll past.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: "team-3",
    name: "Kofi Owusu",
    role: "Head of Marketing & SEO",
    department: "Marketing & SEO",
    bio: "Kofi lives and breathes digital marketing. He knows how to get your business to the top of Google and keep your social media buzzing with the right audience.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: "team-4",
    name: "Zainab Alao",
    role: "Lead Developer",
    department: "Tech & Product",
    bio: "Zainab builds websites and apps that are fast, beautiful, and work perfectly — even on slow internet. She turns ideas into digital products people love to use.",
    avatar: "https://images.unsplash.com/photo-1534751516642-a131ffd473fd?auto=format&fit=crop&w=300&h=300&q=80"
  }
];

export const jobRoles: JobRole[] = [
  {
    id: "job-seo",
    title: "Senior SEO & Marketing Specialist",
    department: "Growth",
    location: "Ibadan, Nigeria / Remote",
    type: "Full-time",
    salaryEstimate: "Competitive Salary + Performance Bonus",
    description: "We're looking for an experienced digital marketer who knows how to get businesses found on Google and social media. You'll manage ad campaigns, improve search rankings, and create marketing strategies for our clients.",
    responsibilities: [
      "Research the best keywords and create strategies to rank our clients' websites on Google.",
      "Manage and optimize paid ad campaigns on Google, Facebook, and Instagram.",
      "Work with our content team to plan and create blog posts, social media content, and email campaigns.",
      "Track results, create reports, and present them to clients in a way that's easy to understand."
    ],
    requirements: [
      "4+ years of experience in digital marketing, SEO, or social media management.",
      "You know your way around Google Analytics, Google Ads, Meta Ads Manager, and SEO tools.",
      "You can explain marketing results to clients who aren't tech-savvy.",
      "Comfortable working remotely and managing your own time."
    ]
  },
  {
    id: "job-eng",
    title: "Senior Web & App Developer",
    department: "Tech",
    location: "Ibadan, Nigeria / Remote",
    type: "Full-time",
    salaryEstimate: "Competitive Salary",
    description: "Join our development team to build beautiful, fast websites and mobile apps for businesses across Nigeria and beyond. You'll work on exciting projects from e-commerce stores to custom business tools.",
    responsibilities: [
      "Build responsive websites using React, Next.js, or similar modern frameworks.",
      "Develop mobile apps for Android and iOS using React Native or similar tools.",
      "Write clean, secure backend code with Node.js and connect to databases.",
      "Make sure everything loads fast and works well, even on slow internet connections."
    ],
    requirements: [
      "5+ years of professional experience building websites and/or mobile apps.",
      "Strong skills in React, TypeScript, Node.js, and at least one mobile framework.",
      "You care about clean design and smooth user experience.",
      "Experience working with databases like Firebase, PostgreSQL, or MongoDB."
    ]
  },
  {
    id: "job-creative",
    title: "Creative Director (Content & Video)",
    department: "Creative",
    location: "Ibadan, Nigeria / Remote",
    type: "Contract",
    salaryEstimate: "Project-Based + Retainer Option",
    description: "We need a creative leader who can direct photo shoots, plan video content, and shape brand identities for our clients. If you can tell a brand's story through visuals, we want to talk to you.",
    responsibilities: [
      "Plan and direct professional photo and video shoots for brands.",
      "Create brand identities — logos, color schemes, fonts, and brand guidelines.",
      "Develop content calendars and creative strategies for social media.",
      "Lead a team of designers, photographers, and videographers on projects."
    ],
    requirements: [
      "3+ years of experience in creative direction, photography, videography, or brand design.",
      "A strong portfolio showing your work across branding, photo, and video.",
      "Comfortable using design tools like Figma, Adobe Creative Suite, and video editing software.",
      "Great communication skills — you can pitch ideas and present to clients confidently."
    ]
  }
];

export const partnerTiers: PartnerTier[] = [
  {
    id: "tier-strategic",
    name: "Business Consulting",
    tagline: "We help you plan your growth strategy.",
    description: "For businesses, consultancies, and organizations that need expert guidance on how to market, brand, and grow their business online. We work alongside your team to create and execute a plan.",
    targetAudience: "Businesses, Consultancies, Startups",
    benefits: [
      "One-on-one strategy sessions with our senior team",
      "Custom marketing and branding plans for your business",
      "Priority scheduling and dedicated project manager",
      "Monthly progress reports with clear next steps"
    ]
  },
  {
    id: "tier-ecosystem",
    name: "Tech & Development Partners",
    tagline: "We build the digital products for your clients.",
    description: "For agencies, tech companies, and SaaS platforms that need a reliable partner to handle website development, app building, or digital marketing for their own clients.",
    targetAudience: "Agencies, Tech Companies, SaaS Platforms",
    benefits: [
      "White-label website and app development for your clients",
      "Reliable turnaround times and clear communication",
      "Referral partnerships — we send clients your way too",
      "Shared project management tools for smooth collaboration"
    ]
  },
  {
    id: "tier-talent",
    name: "Training & Education Partners",
    tagline: "We train the next generation of digital creators.",
    description: "We work with schools, training centers, and organizations like HP LIFE to teach digital skills — marketing, design, photography, videography, and web development.",
    targetAudience: "Schools, Training Centers, NGOs",
    benefits: [
      "Hands-on training programs designed by working professionals",
      "Internship and job placement support for top graduates",
      "Sponsorship for hackathons and creative workshops",
      "Access to our network of clients and industry contacts"
    ]
  }
];

export const regionPartners: RegionPartner[] = [
  {
    id: "reg-nga",
    country: "Nigeria",
    name: "Ace Innovation Nexus (Ibadan HQ)",
    logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=200&h=200&q=80",
    scale: "Headquarters",
    details: "Our main office is in Ibadan, Nigeria. This is where our marketing, design, photography, videography, and development teams work together to deliver great results for our clients.",
    latLng: { top: "62%", left: "45%" }
  }
];

export const staticInsights: InsightArticle[] = [
  {
    id: "ins-feat",
    title: "Why Your Business Needs SEO (Not Just Paid Ads)",
    category: "Marketing",
    readTime: "6 Min Read",
    date: "June 2026",
    summary: "Running ads is great, but what happens when you stop paying? Learn why SEO gives you long-term results and how to get started.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    author: "Kofi Owusu"
  },
  {
    id: "ins-mktg",
    title: "How Good Branding Increases Your Sales",
    category: "Branding",
    readTime: "4 Min Read",
    date: "May 2026",
    summary: "Your brand is more than a logo. See how professional branding and quality visuals helped our clients sell more — with real examples.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    author: "Amara Nwachukwu"
  },
  {
    id: "ins-cons",
    title: "Training the Next Generation of Digital Creators",
    category: "Training",
    readTime: "5 Min Read",
    date: "April 2026",
    summary: "How our partnership with HP LIFE is helping young Nigerians learn digital skills and land real jobs in marketing, design, and tech.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    author: "Tega John-Sola"
  },
  {
    id: "ins-tech",
    title: "Why Your Website Needs to Load Fast (Especially in Nigeria)",
    category: "Development",
    readTime: "7 Min Read",
    date: "March 2026",
    summary: "A slow website loses customers. Here's how we build websites that load in seconds — even on 3G connections — and why it matters for your bottom line.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    author: "Zainab Alao"
  }
];

export const associatedOrganizations: AssociatedOrganization[] = [
  {
    id: "org-academy-suites-old-ife",
    name: "Academy Suites",
    location: "Old-Ife Road, Ibadan",
    category: "Hospitality",
    logo: "/logos/academy-suites.svg",
    description: "Premier hospitality and luxury accommodation experience situated along Old-Ife Road, Ibadan.",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/academysuitesoldiferoad", type: "instagram" }
    ]
  },
  {
    id: "org-siloan-med",
    name: "Siloan Medical Center",
    location: "Ibadan, Nigeria",
    category: "Healthcare",
    logo: "/logos/placeholder.svg",
    description: "Comprehensive medical services and patient-centered healthcare solutions.",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/siloanmedcenter", type: "instagram" }
    ]
  },
  {
    id: "org-coxwell-hospital",
    name: "Coxwell Specialist Hospital",
    location: "Ibadan, Nigeria",
    category: "Healthcare",
    logo: "/logos/coxwell.svg",
    description: "Specialized clinical care, surgical excellence, and advanced medical diagnostics.",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/coxwellspecialisthospital", type: "instagram" }
    ]
  },
  {
    id: "org-academy-suites-abeokuta",
    name: "Academy Suites",
    location: "Abeokuta, Ogun State",
    category: "Hospitality",
    logo: "/logos/academy-suites.svg",
    description: "Modern luxury suites and hotel hospitality services in Abeokuta.",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/academysuitesabeokuta3", type: "instagram" }
    ]
  },
  {
    id: "org-ibadan-central-hospital",
    name: "Ibadan Central Hospital",
    location: "Old-Ife Road, Ibadan",
    category: "Healthcare",
    logo: "/logos/ibadan-central-hospital.svg",
    description: "Leading healthcare center providing emergency, maternal, and specialized medical solutions.",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/ibadancentralhospital", type: "instagram" }
    ]
  },
  {
    id: "org-100-10-academy",
    name: "100/10 Academy",
    location: "Nigeria",
    category: "Education",
    logo: "/logos/100-10-academy.svg",
    description: "Educational academy focused on skill acquisition, empowerment, and academic excellence.",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/thehundredtenacademy", type: "instagram" }
    ]
  },
  {
    id: "org-bbfresh",
    name: "BBFRESH Seafood Experience",
    location: "Nigeria",
    category: "Food & Beverage",
    logo: "/logos/bbfresh.svg",
    description: "Premium seafood dining, fresh oceanic cuisine, and memorable culinary experiences.",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/bbfreshseafoodexperience", type: "instagram" }
    ]
  },
  {
    id: "org-wwwm",
    name: "Women Winning With Money (WWWM)",
    location: "Nigeria",
    category: "Creative & Lifestyle",
    logo: "/logos/wwwm.svg",
    description: "Empowering women with financial literacy, wealth-building strategies, and community growth.",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/women_winning_with_money", type: "instagram" }
    ]
  },
  {
    id: "org-bam-t",
    name: "BAM-T Dance Studio",
    location: "Ibadan, Nigeria",
    category: "Creative & Lifestyle",
    logo: "/logos/bam-t-dance.svg",
    description: "Vibrant dance academy, choreography training, and performing arts center in Ibadan.",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/bamtdance_ibadan", type: "instagram" }
    ]
  },
  {
    id: "org-tolu-med",
    name: "Tolu Medical Centre",
    location: "Nigeria",
    category: "Healthcare",
    logo: "/logos/tolu-medical-centre.svg",
    description: "Full-service healthcare provider dedicated to quality medical care and clinical innovation.",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/tolumedicalcentre/?hl=en", type: "instagram" },
      { label: "Facebook", url: "https://web.facebook.com/profile.php?id=61564994861472", type: "facebook" },
      { label: "Website", url: "http://www.tolumedcenter.com/", type: "website" }
    ]
  },
  {
    id: "org-creative-thinkers",
    name: "Creative Thinkers International Academy",
    location: "Nigeria",
    category: "Education",
    logo: "/logos/placeholder.svg",
    description: "Innovative learning institution nurturing young minds, creativity, and future leadership.",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/creativethinkers_academy?igsh=MTNhY3Fya2V6Mjh3dg==", type: "instagram" }
    ]
  },
  {
    id: "org-event-signatures",
    name: "Event Signatures",
    location: "Nigeria",
    category: "Creative & Lifestyle",
    logo: "/logos/placeholder.svg",
    description: "Bespoke event management, creative styling, and signature celebration experiences.",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/eventsignature1972?igsh=MW9mZzdidGJydHF0Zg==", type: "instagram" }
    ]
  }
];

