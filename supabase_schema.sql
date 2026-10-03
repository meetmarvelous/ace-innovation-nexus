-- =========================================================
-- ACE INNOVATION NEXUS - SUPABASE DATABASE SCHEMA SETUP
-- Run this script in your Supabase SQL Editor
-- =========================================================

-- 1. CONTACT SUBMISSIONS TABLE (Leads & Strategy Consultations)
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
  link TEXT NOT NULL,
  logo TEXT,
  is_verified BOOLEAN DEFAULT true
);

-- =========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================

-- Enable RLS on all tables
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.associated_organizations ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------
-- Contact Submissions Policies:
-- ---------------------------------------------------------
-- Allow ANY public visitor to submit a contact form inquiry
CREATE POLICY "Public visitors can submit contact inquiries" 
  ON public.contact_submissions 
  FOR INSERT 
  TO public 
  WITH CHECK (true);

-- Allow ONLY authenticated Admin users to view and manage inquiries
CREATE POLICY "Admin users can view and manage contact submissions" 
  ON public.contact_submissions 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- ---------------------------------------------------------
-- Case Studies Policies:
-- ---------------------------------------------------------
-- Allow ANY public visitor to view published case studies
CREATE POLICY "Public visitors can view published case studies" 
  ON public.case_studies 
  FOR SELECT 
  TO public 
  USING (published = true);

-- Allow ONLY authenticated Admin users to insert, update, or delete case studies
CREATE POLICY "Admin users can manage case studies" 
  ON public.case_studies 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- ---------------------------------------------------------
-- Associated Organisations Policies:
-- ---------------------------------------------------------
-- Allow ANY public visitor to view associated organizations
CREATE POLICY "Public visitors can view associated organizations" 
  ON public.associated_organizations 
  FOR SELECT 
  TO public 
  USING (true);

-- Allow ONLY authenticated Admin users to manage organizations
CREATE POLICY "Admin users can manage associated organizations" 
  ON public.associated_organizations 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);
