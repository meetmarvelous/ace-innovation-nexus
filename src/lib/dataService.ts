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
export async function getInsightArticles(options: { forAdmin?: boolean } = {}): Promise<InsightArticle[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase
        .from('insight_articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (!options.forAdmin) {
        query = query.eq('published', true);
      }

      const { data, error } = await query;

      if (error) {
        console.warn('Could not fetch blog posts from Supabase:', error.message);
        return [];
      }

      if (data) {
        return data.map(item => ({
          id: item.id,
          title: item.title,
          slug: item.slug || item.id,
          category: item.category,
          readTime: item.read_time || '5 Min Read',
          date: item.date,
          summary: item.summary,
          content: item.content || '',
          image: item.image,
          author: item.author,
          authorRole: item.author_role || 'Ace Team',
          authorAvatar: item.author_avatar || '',
          published: item.published === true,
          metaTitle: item.meta_title || '',
          metaDescription: item.meta_description || '',
          canonicalUrl: item.canonical_url || '',
          ogImage: item.og_image || '',
          keywords: parseJsonArray(item.keywords),
          viewsCount: item.views_count || 0,
          likesCount: item.likes_count || 0,
          tags: parseJsonArray(item.tags),
        }));
      }
      return [];
    } catch (err) {
      console.warn('Could not fetch blog posts from Supabase:', err);
      return [];
    }
  }
  return localInsights;
}

export async function saveInsightArticle(article: InsightArticle): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const slug = article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const { error } = await supabase
      .from('insight_articles')
      .upsert({
        id: article.id || `ins-${Date.now()}`,
        slug: slug,
        title: article.title,
        category: article.category,
        read_time: article.readTime || '5 Min Read',
        date: article.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        summary: article.summary,
        content: article.content || '',
        image: article.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        author: article.author || 'Ace Nexus Team',
        author_role: article.authorRole || 'Ace Team',
        author_avatar: article.authorAvatar || '',
        published: article.published === true,
        meta_title: article.metaTitle || article.title,
        meta_description: article.metaDescription || article.summary,
        canonical_url: article.canonicalUrl || '',
        og_image: article.ogImage || article.image,
        keywords: article.keywords || [],
        views_count: article.viewsCount || 0,
        likes_count: article.likesCount || 0,
        tags: article.tags || [],
      });
    if (error) {
      console.error('Error saving blog post:', error.message);
      throw error;
    }
    return true;
  }
  return false;
}

export async function toggleInsightVisibility(id: string, published: boolean): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('insight_articles')
      .update({ published })
      .eq('id', id);
    if (error) {
      console.error('Error toggling insight visibility:', error.message);
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
export async function getCaseStudies(options: { forAdmin?: boolean } = {}): Promise<CaseStudy[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false });

      if (!options.forAdmin) {
        query = query.eq('published', true);
      }

      const { data, error } = await query;

      if (error) {
        console.warn('Could not fetch case studies from Supabase:', error.message);
        return [];
      }

      if (data) {
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
          published: item.published !== false,
        }));
      }
      return [];
    } catch (err) {
      console.warn('Could not fetch case studies from Supabase:', err);
      return [];
    }
  }
  return localCaseStudies;
}

export async function toggleCaseStudyVisibility(id: string, published: boolean): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('case_studies')
      .update({ published })
      .eq('id', id);
    if (error) {
      console.error('Error toggling case study visibility:', error.message);
      throw error;
    }
    return true;
  }
  return false;
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
        published: cs.published !== false,
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
