import { supabase, isSupabaseConfigured } from './supabase';
import { 
  caseStudies as localCaseStudies, 
  staticInsights as localInsights, 
  associatedOrganizations as localOrganizations 
} from '../data';
import { CaseStudy, InsightArticle, AssociatedOrganization } from '../types';

function parseJsonArray<T>(data: any): T[] {
  if (Array.isArray(data)) return data;
  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return [];
    }
  }
  return [];
}

// =====================================================================
// ASSOCIATED ORGANIZATIONS (NETWORK BRANDS) API
// =====================================================================
export async function getAssociatedOrganizations(): Promise<AssociatedOrganization[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('associated_organizations')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category,
          location: item.location,
          description: item.description,
          logo: item.logo || '/logos/placeholder.svg',
          links: parseJsonArray(item.links),
        }));
      }
    } catch (err) {
      console.warn('Could not fetch organizations from Supabase:', err);
    }
  }
  return localOrganizations;
}

export async function saveAssociatedOrganization(org: AssociatedOrganization): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('associated_organizations')
      .upsert({
        id: org.id || `org-${Date.now()}`,
        name: org.name,
        category: org.category,
        location: org.location || 'Nigeria',
        description: org.description || '',
        logo: org.logo || '/logos/placeholder.svg',
        links: org.links || [],
      });
    if (error) {
      console.error('Error saving organization:', error.message);
      throw error;
    }
    return true;
  }
  return false;
}

export async function deleteAssociatedOrganization(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('associated_organizations')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting organization:', error.message);
      throw error;
    }
    return true;
  }
  return false;
}

// =====================================================================
// BLOG POSTS / INSIGHT ARTICLES API
// =====================================================================
export async function getInsightArticles(): Promise<InsightArticle[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('insight_articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map(item => ({
          id: item.id,
          title: item.title,
          category: item.category,
          readTime: item.read_time || '5 Min Read',
          date: item.date,
          summary: item.summary,
          image: item.image,
          author: item.author,
        }));
      }
    } catch (err) {
      console.warn('Could not fetch blog posts from Supabase:', err);
    }
  }
  return localInsights;
}

export async function saveInsightArticle(article: InsightArticle): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('insight_articles')
      .upsert({
        id: article.id || `ins-${Date.now()}`,
        title: article.title,
        category: article.category,
        read_time: article.readTime || '5 Min Read',
        date: article.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        summary: article.summary,
        image: article.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        author: article.author || 'Ace Nexus Team',
        published: true,
      });
    if (error) {
      console.error('Error saving blog post:', error.message);
      throw error;
    }
    return true;
  }
  return false;
}

export async function deleteInsightArticle(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('insight_articles')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting blog post:', error.message);
      throw error;
    }
    return true;
  }
  return false;
}

// =====================================================================
// CASE STUDIES PORTFOLIO API
// =====================================================================
export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map(item => ({
          id: item.id,
          title: item.title,
          client: item.client,
          category: item.category,
          summary: item.summary,
          description: item.description,
          challenge: item.challenge,
          solution: item.solution,
          image: item.image,
          project_url: item.project_url || item.url || '',
          url: item.project_url || item.url || '',
          metrics: parseJsonArray(item.metrics),
          scope: parseJsonArray(item.scope),
          team: parseJsonArray(item.team),
        }));
      }
    } catch (err) {
      console.warn('Could not fetch case studies from Supabase:', err);
    }
  }
  return localCaseStudies;
}

export async function saveCaseStudy(cs: CaseStudy): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('case_studies')
      .upsert({
        id: cs.id || `cs-${Date.now()}`,
        title: cs.title,
        client: cs.client,
        category: cs.category,
        summary: cs.summary,
        description: cs.description || cs.summary,
        challenge: cs.challenge || cs.summary,
        solution: cs.solution,
        image: cs.image,
        project_url: cs.project_url || cs.url || '',
        metrics: cs.metrics || [],
        scope: cs.scope || [],
        team: cs.team || [],
        published: true,
      });
    if (error) {
      console.error('Error saving case study:', error.message);
      throw error;
    }
    return true;
  }
  return false;
}

export async function deleteCaseStudy(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('case_studies')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting case study:', error.message);
      throw error;
    }
    return true;
  }
  return false;
}
