-- =====================================================================
-- ACE INNOVATION NEXUS - SUPABASE DATABASE SCHEMA MIGRATION
-- Copy and paste this script directly into your Supabase SQL Editor and click RUN.
-- =====================================================================

-- 1. CONTACT SUBMISSIONS TABLE (Strategy Consultation & Lead Form Inquiries)
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_requested TEXT NOT NULL,
  project_budget TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Closed', 'Archived'))
);

-- 2. CASE STUDIES TABLE
CREATE TABLE IF NOT EXISTS public.case_studies (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  challenge TEXT,
  solution TEXT NOT NULL,
  image TEXT NOT NULL,
  metrics JSONB DEFAULT '[]'::jsonb,
  scope TEXT[] DEFAULT '{}',
  team TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT true
);

-- 3. ASSOCIATED ORGANISATIONS TABLE
CREATE TABLE IF NOT EXISTS public.associated_organizations (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  logo TEXT DEFAULT '/logos/placeholder.svg',
  links JSONB DEFAULT '[]'::jsonb,
  is_verified BOOLEAN DEFAULT true
);

-- 4. INSIGHT ARTICLES / BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS public.insight_articles (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  read_time TEXT DEFAULT '5 Min Read',
  date TEXT NOT NULL,
  summary TEXT NOT NULL,
  image TEXT NOT NULL,
  author TEXT NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT true
);

-- =====================================================================
-- PERFORMANCE INDEXES
-- =====================================================================
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_case_studies_category ON public.case_studies(category);
CREATE INDEX IF NOT EXISTS idx_associated_organizations_category ON public.associated_organizations(category);
CREATE INDEX IF NOT EXISTS idx_insight_articles_category ON public.insight_articles(category);

-- =====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.associated_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insight_articles ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------
-- RLS POLICIES FOR contact_submissions
-- ---------------------------------------------------------------------
DROP POLICY IF EXISTS "Public visitors can submit contact inquiries" ON public.contact_submissions;
CREATE POLICY "Public visitors can submit contact inquiries" 
  ON public.contact_submissions 
  FOR INSERT 
  TO public 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin users can view and manage contact submissions" ON public.contact_submissions;
CREATE POLICY "Admin users can view and manage contact submissions" 
  ON public.contact_submissions 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- ---------------------------------------------------------------------
-- RLS POLICIES FOR case_studies
-- ---------------------------------------------------------------------
DROP POLICY IF EXISTS "Public visitors can view published case studies" ON public.case_studies;
CREATE POLICY "Public visitors can view published case studies" 
  ON public.case_studies 
  FOR SELECT 
  TO public 
  USING (published = true);

DROP POLICY IF EXISTS "Admin users can manage case studies" ON public.case_studies;
CREATE POLICY "Admin users can manage case studies" 
  ON public.case_studies 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- ---------------------------------------------------------------------
-- RLS POLICIES FOR associated_organizations
-- ---------------------------------------------------------------------
DROP POLICY IF EXISTS "Public visitors can view associated organizations" ON public.associated_organizations;
CREATE POLICY "Public visitors can view associated organizations" 
  ON public.associated_organizations 
  FOR SELECT 
  TO public 
  USING (true);

DROP POLICY IF EXISTS "Admin users can manage associated organizations" ON public.associated_organizations;
CREATE POLICY "Admin users can manage associated organizations" 
  ON public.associated_organizations 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- ---------------------------------------------------------------------
-- RLS POLICIES FOR insight_articles
-- ---------------------------------------------------------------------
DROP POLICY IF EXISTS "Public visitors can view published insight articles" ON public.insight_articles;
CREATE POLICY "Public visitors can view published insight articles" 
  ON public.insight_articles 
  FOR SELECT 
  TO public 
  USING (published = true);

DROP POLICY IF EXISTS "Admin users can manage insight articles" ON public.insight_articles;
CREATE POLICY "Admin users can manage insight articles" 
  ON public.insight_articles 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- =====================================================================
-- SEED INITIAL DATA (PORTFOLIO CASE STUDIES)
-- =====================================================================
INSERT INTO public.case_studies (id, client, title, category, summary, description, challenge, solution, image, metrics, scope, team, published)
VALUES 
(
  'hp-life',
  'HP LIFE Academy',
  'Helping Thousands of Nigerians Learn Free Digital Skills',
  'Digital Marketing',
  'Ran a regional digital marketing campaign that registered over 48,000 students for free online courses across Nigeria and other African countries.',
  'HP LIFE needed to reach young Nigerians and other Africans who could benefit from their free online business courses. The challenge was that many people in these communities had limited data and low trust in online platforms.',
  'HP LIFE needed to reach young Nigerians and other Africans who could benefit from their free online business courses. The challenge was that many people in these communities had limited data and low trust in online platforms.',
  'We created targeted ads on Facebook, Instagram, and WhatsApp that spoke directly to young learners. We built simple, fast-loading landing pages that worked well even on slow internet. We also set up WhatsApp groups to keep students engaged throughout their courses.',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  '[{"label": "Students Enrolled", "value": "48,000+", "subtext": "Across Sub-Saharan Africa"}, {"label": "Return on Ad Spend", "value": "3.4x", "subtext": "Performance campaign average"}, {"label": "Completion Rate", "value": "+42%", "subtext": "Boosted by community support"}]'::jsonb,
  ARRAY['Facebook & Instagram Ads', 'WhatsApp Marketing', 'Content Creation', 'Landing Page Design'],
  ARRAY['Kofi Owusu (Marketing & SEO)', 'Amara Nwachukwu (Creative Director)'],
  true
),
(
  'checkers',
  'Checkers Africa (Nigeria)',
  'Building a Stronger Brand for Checkers Across Nigeria',
  'Branding & Strategy',
  'Refreshed the Checkers brand with new packaging visuals, professional photography, and video content, driving retail sales up by 124%.',
  'Checkers wanted to connect with a younger audience in Nigeria. Their packaging looked outdated and they had almost no social media presence. They needed a complete brand refresh that would make people excited about their products.',
  'Checkers wanted to connect with a younger audience in Nigeria. Their packaging looked outdated and they had almost no social media presence. They needed a complete brand refresh that would make people excited about their products.',
  'We redesigned their product packaging with fresh, modern visuals. Our team shot professional product photos and created short video ads for social media. We also ran a viral recipe challenge on Instagram that got millions of views and drove people to buy in stores.',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
  '[{"label": "Sales Increase", "value": "+124%", "subtext": "Shelf-movement growth"}, {"label": "Video Views", "value": "3.2M+", "subtext": "Viral campaign reach"}, {"label": "Brand Rating", "value": "9.2/10", "subtext": "Customer preference survey"}]'::jsonb,
  ARRAY['Brand Identity Redesign', 'Product Photography', 'Video Production', 'Social Media Campaigns'],
  ARRAY['Amara Nwachukwu (Creative Director)', 'Kofi Owusu (Head of Growth)'],
  true
),
(
  'fintech',
  'NexusPay Technologies',
  'Building a Payment App That Processed Over ₦18 Billion',
  'Tech Products',
  'Designed and engineered a mobile payment application and merchant dashboard processing ₦18B+ in micro-transactions.',
  'NexusPay had a great idea for a mobile payment platform for small businesses and market traders. They needed a team to build an app that was simple enough for anyone to use, even people who weren''t tech-savvy, and functioned in weak networks.',
  'NexusPay had a great idea for a mobile payment platform for small businesses and market traders. They needed a team to build an app that was simple enough for anyone to use, even people who weren''t tech-savvy, and functioned in weak networks.',
  'We built a clean, easy-to-use mobile app for both Android and iOS, along with a web dashboard for merchants to track their sales. The app works even with poor internet connection, so traders in rural areas can still accept payments. We also helped them with SEO and content marketing to attract new users.',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
  '[{"label": "Transactions", "value": "₦18B+", "subtext": "In 8 months post-launch"}, {"label": "Sign-up Time", "value": "< 2 mins", "subtext": "Simplified merchant intake"}, {"label": "New Users", "value": "+450%", "subtext": "Quarter-on-quarter growth"}]'::jsonb,
  ARRAY['Mobile App Development', 'Web Dashboard', 'SEO & Content Marketing', 'UI/UX Design'],
  ARRAY['Zainab Alao (Lead Dev)', 'Tega John-Sola (Product Strategist)'],
  true
),
(
  'zenith-fintech',
  'Zenith Global Solutions',
  'Reimagining Digital Banking for Emerging Markets',
  'Tech Products',
  'Built a high-performance cross-border payment app processing over ₦34 Billion in micro-transactions with zero downtime.',
  'Emerging market merchants struggled with slow, high-fee cross-border transactions, leading to 45% cart abandonment. They needed a lightweight, secure app that could operate on low-bandwidth networks.',
  'Emerging market merchants struggled with slow, high-fee cross-border transactions, leading to 45% cart abandonment. They needed a lightweight, secure app that could operate on low-bandwidth networks.',
  'We designed a custom micro-banking app using modern react-native interfaces, supported by an optimized API layer that compresses payload size by 70%. Integrated real-time offline payment confirmations via SMS fallback.',
  '/images/zenith_fintech_mockup.png',
  '[{"label": "Transaction Volume", "value": "₦34B+", "subtext": "Within 10 months"}, {"label": "Active Users", "value": "250k+", "subtext": "Daily active merchants"}, {"label": "App Store Rating", "value": "4.8★", "subtext": "From 15k+ reviews"}]'::jsonb,
  ARRAY['Mobile App Development', 'High-Load API Gateway', 'UX/UI Architecture', 'Security Auditing'],
  ARRAY['Zainab Alao (Lead Dev)', 'Tega John-Sola (Product Strategist)'],
  true
),
(
  'kola-apparel',
  'Kola Group (Nigeria)',
  'Scaling African Luxury Fashion to a Global Audience',
  'Branding & Strategy',
  'Rebranded Kola Group with elegant editorial designs, professional content shoots, and a targeted global ecommerce pipeline.',
  'Kola Apparel had premium artisan garments but struggled to convey value online. Their digital presence felt localized and failed to convert international visitors.',
  'Kola Apparel had premium artisan garments but struggled to convey value online. Their digital presence felt localized and failed to convert international visitors.',
  'We engineered a clean, high-fashion brand identity, shot custom product commercials, and built an optimized international checkout funnel with multi-currency support and tailored SEO.',
  '/images/kola_apparel_branding.png',
  '[{"label": "E-Commerce Conversions", "value": "18.5%", "subtext": "Up from 2.1%"}, {"label": "Social Impressions", "value": "3.2M+", "subtext": "During launch week"}, {"label": "Sales Increase", "value": "+180%", "subtext": "In global markets"}]'::jsonb,
  ARRAY['Brand Identity Redesign', 'Ecommerce Development', 'Editorial Videography', 'International SEO'],
  ARRAY['Amara Nwachukwu (Creative Director)', 'Kofi Owusu (Head of Growth)'],
  true
),
(
  'eko-solar',
  'Eko Solar & Clean Energy',
  'Electrifying Communities via Sustainable Campaigns',
  'Digital Marketing',
  'Supercharged solar panel subscription sales across southwestern Nigeria through localized storytelling and high-performing ads.',
  'High upfront installation costs and limited solar awareness meant Eko Solar struggled to close deals, spending too much on cold sales outreach.',
  'High upfront installation costs and limited solar awareness meant Eko Solar struggled to close deals, spending too much on cold sales outreach.',
  'Developed educational video funnels explaining savings, created a simple solar sizing web calculator, and ran targeted lead-generation social ads that pre-qualified leads before sales calls.',
  '/images/eko_solar_dashboard.png',
  '[{"label": "Return on Ad Spend", "value": "4.5x", "subtext": "Verified ROAS"}, {"label": "Qualified Leads", "value": "12,000+", "subtext": "With verified contact info"}, {"label": "Customer Acquisition", "value": "-25%", "subtext": "Reduced marketing cost"}]'::jsonb,
  ARRAY['Paid Social Campaigns', 'Lead-Sizing Tool Dev', 'Copywriting', 'Performance Analytics'],
  ARRAY['Kofi Owusu (Marketing & SEO)', 'Zainab Alao (Frontend Dev)'],
  true
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  client = EXCLUDED.client,
  category = EXCLUDED.category,
  summary = EXCLUDED.summary,
  description = EXCLUDED.description,
  solution = EXCLUDED.solution,
  image = EXCLUDED.image,
  metrics = EXCLUDED.metrics,
  scope = EXCLUDED.scope,
  team = EXCLUDED.team;

-- =====================================================================
-- SEED INITIAL DATA (ASSOCIATED ORGANISATIONS)
-- =====================================================================
INSERT INTO public.associated_organizations (id, name, location, category, logo, description, links, is_verified)
VALUES
(
  'org-academy-suites-old-ife',
  'Academy Suites',
  'Old-Ife Road, Ibadan',
  'Hospitality',
  '/logos/academy-suites.svg',
  'Premier hospitality and luxury accommodation experience situated along Old-Ife Road, Ibadan.',
  '[{"label": "Instagram", "url": "https://www.instagram.com/academysuitesoldiferoad", "type": "instagram"}]'::jsonb,
  true
),
(
  'org-siloan-med',
  'Siloan Medical Center',
  'Ibadan, Nigeria',
  'Healthcare',
  '/logos/placeholder.svg',
  'Comprehensive medical services and patient-centered healthcare solutions.',
  '[{"label": "Instagram", "url": "https://www.instagram.com/siloanmedcenter", "type": "instagram"}]'::jsonb,
  true
),
(
  'org-coxwell-hospital',
  'Coxwell Specialist Hospital',
  'Ibadan, Nigeria',
  'Healthcare',
  '/logos/coxwell.svg',
  'Specialized clinical care, surgical excellence, and advanced medical diagnostics.',
  '[{"label": "Instagram", "url": "https://www.instagram.com/coxwellspecialisthospital", "type": "instagram"}]'::jsonb,
  true
),
(
  'org-academy-suites-abeokuta',
  'Academy Suites',
  'Abeokuta, Ogun State',
  'Hospitality',
  '/logos/academy-suites.svg',
  'Modern luxury suites and hotel hospitality services in Abeokuta.',
  '[{"label": "Instagram", "url": "https://www.instagram.com/academysuitesabeokuta3", "type": "instagram"}]'::jsonb,
  true
),
(
  'org-ibadan-central-hospital',
  'Ibadan Central Hospital',
  'Old-Ife Road, Ibadan',
  'Healthcare',
  '/logos/ibadan-central-hospital.svg',
  'Leading healthcare center providing emergency, maternal, and specialized medical solutions.',
  '[{"label": "Instagram", "url": "https://www.instagram.com/ibadancentralhospital", "type": "instagram"}]'::jsonb,
  true
),
(
  'org-100-10-academy',
  '100/10 Academy',
  'Nigeria',
  'Education',
  '/logos/100-10-academy.svg',
  'Educational academy focused on skill acquisition, empowerment, and academic excellence.',
  '[{"label": "Instagram", "url": "https://www.instagram.com/thehundredtenacademy", "type": "instagram"}]'::jsonb,
  true
),
(
  'org-bbfresh',
  'BBFRESH Seafood Experience',
  'Nigeria',
  'Food & Beverage',
  '/logos/bbfresh.svg',
  'Premium seafood dining, fresh oceanic cuisine, and memorable culinary experiences.',
  '[{"label": "Instagram", "url": "https://www.instagram.com/bbfreshseafoodexperience", "type": "instagram"}]'::jsonb,
  true
),
(
  'org-wwwm',
  'Women Winning With Money (WWWM)',
  'Nigeria',
  'Creative & Lifestyle',
  '/logos/wwwm.svg',
  'Empowering women with financial literacy, wealth-building strategies, and community growth.',
  '[{"label": "Instagram", "url": "https://www.instagram.com/women_winning_with_money", "type": "instagram"}]'::jsonb,
  true
),
(
  'org-bam-t',
  'BAM-T Dance Studio',
  'Ibadan, Nigeria',
  'Creative & Lifestyle',
  '/logos/bam-t-dance.svg',
  'Vibrant dance academy, choreography training, and performing arts center in Ibadan.',
  '[{"label": "Instagram", "url": "https://www.instagram.com/bamtdance_ibadan", "type": "instagram"}]'::jsonb,
  true
),
(
  'org-tolu-med',
  'Tolu Medical Centre',
  'Nigeria',
  'Healthcare',
  '/logos/tolu-medical-centre.svg',
  'Full-service healthcare provider dedicated to quality medical care and clinical innovation.',
  '[{"label": "Instagram", "url": "https://www.instagram.com/tolumedicalcentre/?hl=en", "type": "instagram"}, {"label": "Facebook", "url": "https://web.facebook.com/profile.php?id=61564994861472", "type": "facebook"}, {"label": "Website", "url": "http://www.tolumedcenter.com/", "type": "website"}]'::jsonb,
  true
),
(
  'org-creative-thinkers',
  'Creative Thinkers International Academy',
  'Nigeria',
  'Education',
  '/logos/placeholder.svg',
  'Innovative learning institution nurturing young minds, creativity, and future leadership.',
  '[{"label": "Instagram", "url": "https://www.instagram.com/creativethinkers_academy?igsh=MTNhY3Fya2V6Mjh3dg==", "type": "instagram"}]'::jsonb,
  true
),
(
  'org-event-signatures',
  'Event Signatures',
  'Nigeria',
  'Creative & Lifestyle',
  '/logos/placeholder.svg',
  'Bespoke event management, creative styling, and signature celebration experiences.',
  '[{"label": "Instagram", "url": "https://www.instagram.com/eventsignature1972?igsh=MW9mZzdidGJydHF0Zg==", "type": "instagram"}]'::jsonb,
  true
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  location = EXCLUDED.location,
  category = EXCLUDED.category,
  logo = EXCLUDED.logo,
  description = EXCLUDED.description,
  links = EXCLUDED.links;

-- =====================================================================
-- SEED INITIAL DATA (INSIGHT ARTICLES / BLOG POSTS)
-- =====================================================================
INSERT INTO public.insight_articles (id, title, category, read_time, date, summary, image, author, published)
VALUES
(
  'ins-feat',
  'Why Your Business Needs SEO (Not Just Paid Ads)',
  'Marketing',
  '6 Min Read',
  'June 2026',
  'Running ads is great, but what happens when you stop paying? Learn why SEO gives you long-term results and how to get started.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  'Kofi Owusu',
  true
),
(
  'ins-mktg',
  'How Good Branding Increases Your Sales',
  'Branding',
  '4 Min Read',
  'May 2026',
  'Your brand is more than a logo. See how professional branding and quality visuals helped our clients sell more — with real examples.',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
  'Amara Nwachukwu',
  true
),
(
  'ins-cons',
  'Training the Next Generation of Digital Creators',
  'Training',
  '5 Min Read',
  'April 2026',
  'How our partnership with HP LIFE is helping young Nigerians learn digital skills and land real jobs in marketing, design, and tech.',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
  'Tega John-Sola',
  true
),
(
  'ins-tech',
  'Why Your Website Needs to Load Fast (Especially in Nigeria)',
  'Development',
  '7 Min Read',
  'March 2026',
  'A slow website loses customers. Here''s how we build websites that load in seconds — even on 3G connections — and why it matters for your bottom line.',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  'Zainab Alao',
  true
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  read_time = EXCLUDED.read_time,
  date = EXCLUDED.date,
  summary = EXCLUDED.summary,
  image = EXCLUDED.image,
  author = EXCLUDED.author;
