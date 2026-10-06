export interface CaseStudy {
  id: string;
  title: string;
  category: 'Branding & Strategy' | 'Digital Marketing' | 'Tech Products' | 'Branding & Content' | 'Web & App Development';
  client: string;
  summary: string;
  description: string;
  challenge?: string;
  solution: string;
  image: string;
  project_url?: string;
  url?: string;
  metrics: {
    label: string;
    value: string;
    subtext?: string;
  }[];
  scope: string[];
  team?: string[];
  published?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Leadership' | 'Creative & Brand' | 'Marketing & SEO' | 'Tech & Product';
  bio: string;
  avatar: string;
  skills?: string[];
}

export interface JobRole {
  id: string;
  title: string;
  department: 'Tech' | 'Growth' | 'Creative' | 'Operations';
  location: string;
  type: 'Full-time' | 'Contract' | 'Remote';
  salaryEstimate: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export interface PartnerTier {
  id: string;
  name: string;
  tagline: string;
  description: string;
  targetAudience: string;
  benefits: string[];
}

export interface RegionPartner {
  id: string;
  country: string;
  name: string;
  logo: string;
  scale: string;
  details: string;
  latLng: {
    top: string;  // percentages for custom interactive visual positioning
    left: string;
  };
}

export interface InsightArticle {
  id: string;
  title: string;
  slug?: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  content?: string;
  image: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  published: boolean;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
  keywords?: string[];
  viewsCount?: number;
  likesCount?: number;
  tags?: string[];
}

export interface AssociatedLink {
  label: string;
  url: string;
  type: 'instagram' | 'facebook' | 'website' | 'tiktok' | 'other';
}

export interface AssociatedOrganization {
  id: string;
  name: string;
  category: 'Hospitality' | 'Healthcare' | 'Education' | 'Food & Beverage' | 'Creative & Lifestyle';
  logo: string;
  location?: string;
  description?: string;
  links: AssociatedLink[];
}

