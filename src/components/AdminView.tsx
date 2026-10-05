import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldCheck, Users, Briefcase, Building2, Lock, FileText, ArrowLeft,
  LogOut, Plus, Trash2, Edit3, CheckCircle2, RefreshCw, X, ShieldAlert,
  ExternalLink, Globe, Image as ImageIcon, Sparkles, Layers, BarChart3,
  Eye, EyeOff
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { 
  getAssociatedOrganizations, saveAssociatedOrganization, deleteAssociatedOrganization,
  getInsightArticles, saveInsightArticle, deleteInsightArticle, toggleInsightVisibility,
  getCaseStudies, saveCaseStudy, deleteCaseStudy, toggleCaseStudyVisibility
} from '../lib/dataService';
import { CaseStudy, InsightArticle, AssociatedOrganization } from '../types';
import { triggerHaptic } from '../utils/haptics';
import { formatExternalUrl } from '../utils/urlFormatter';

interface ContactSubmission {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  service_requested: string;
  project_budget?: string;
  message: string;
  status: 'New' | 'Contacted' | 'Closed' | 'Archived';
}

interface AdminViewProps {
  onBackToWebsite?: () => void;
}

export default function AdminView({ onBackToWebsite }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<'insights' | 'organizations' | 'case-studies' | 'submissions'>('insights');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSettingNewPassword, setIsSettingNewPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authMsg, setAuthMsg] = useState<string | null>(null);

  // Submissions State
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [subLoading, setSubLoading] = useState(false);
  const [subFilter, setSubFilter] = useState<'All' | 'New' | 'Contacted' | 'Closed'>('All');

  // CMS Content States
  const [insightList, setInsightList] = useState<InsightArticle[]>([]);
  const [orgList, setOrgList] = useState<AssociatedOrganization[]>([]);
  const [caseStudyList, setCaseStudyList] = useState<CaseStudy[]>([]);

  // Modal / Form Edit States
  const [editInsight, setEditInsight] = useState<Partial<InsightArticle> | null>(null);
  const [editOrg, setEditOrg] = useState<Partial<AssociatedOrganization> | null>(null);
  const [editCaseStudy, setEditCaseStudy] = useState<Partial<CaseStudy> | null>(null);
  const [csSaving, setCsSaving] = useState(false);
  const [newScopeTag, setNewScopeTag] = useState('');
  const [newTeamMember, setNewTeamMember] = useState('');

  // Load initial content
  const loadAllData = useCallback(async () => {
    setSubLoading(true);
    try {
      const [insights, orgs, studies] = await Promise.all([
        getInsightArticles({ forAdmin: true }),
        getAssociatedOrganizations(),
        getCaseStudies({ forAdmin: true })
      ]);
      setInsightList(insights);
      setOrgList(orgs);
      setCaseStudyList(studies);

      if (isSupabaseConfigured && supabase) {
        const { data } = await supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false });
        if (data) setSubmissions(data);
      }
    } catch (err) {
      console.warn('Data load error:', err);
    } finally {
      setSubLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Session Check & Invitation Token Detection
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('type=invite') || hash.includes('type=recovery') || hash.includes('access_token')) {
      setIsSettingNewPassword(true);
    }

    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session && !window.location.hash.includes('type=recovery') && !window.location.hash.includes('type=invite')) {
          setIsAuthenticated(true);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          setIsSettingNewPassword(true);
          setIsAuthenticated(false);
        } else if (session && !isSettingNewPassword) {
          setIsAuthenticated(true);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [isSettingNewPassword]);

  // Auth Handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerHaptic(20);
    setAuthError(null);
    setAuthMsg(null);
    setAuthLoading(true);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setAuthError(error.message);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setAuthError('Supabase credentials missing. Please set NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to allow admin authentication.');
    }
    setAuthLoading(false);
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerHaptic(20);
    setAuthError(null);
    setAuthMsg(null);

    if (newPassword !== confirmPassword) {
      setAuthError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setAuthError("Password must be at least 6 characters long.");
      return;
    }

    setAuthLoading(true);
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setAuthError(error.message);
      } else {
        setAuthMsg("Password saved successfully! Launching dashboard...");
        setTimeout(() => {
          setIsSettingNewPassword(false);
          setIsAuthenticated(true);
          setAuthMsg(null);
        }, 1200);
      }
    } else {
      setIsSettingNewPassword(false);
      setIsAuthenticated(true);
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    triggerHaptic(15);
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
  };

  // CMS Handlers: Blog Posts / Insights
  const handleSaveInsight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editInsight?.title || !editInsight?.summary) return alert('Title and Summary are required.');
    triggerHaptic(20);

    const slug = editInsight.slug || editInsight.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const articleToSave: InsightArticle = {
      id: editInsight.id || `ins-${Date.now()}`,
      slug: slug,
      title: editInsight.title,
      category: editInsight.category || 'Marketing',
      readTime: editInsight.readTime || '5 Min Read',
      date: editInsight.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      summary: editInsight.summary,
      content: editInsight.content || '',
      image: editInsight.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      author: editInsight.author || 'Ace Nexus Team',
      authorRole: editInsight.authorRole || 'Ace Team',
      authorAvatar: editInsight.authorAvatar || '',
      published: editInsight.published === true,
      metaTitle: editInsight.metaTitle || editInsight.title,
      metaDescription: editInsight.metaDescription || editInsight.summary,
      canonicalUrl: editInsight.canonicalUrl || '',
      ogImage: editInsight.ogImage || editInsight.image || '',
      keywords: editInsight.keywords || [],
      viewsCount: editInsight.viewsCount || 0,
      likesCount: editInsight.likesCount || 0,
      tags: editInsight.tags || [],
    };

    try {
      await saveInsightArticle(articleToSave);
      setInsightList(prev => {
        const idx = prev.findIndex(item => item.id === articleToSave.id);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = articleToSave;
          return updated;
        }
        return [articleToSave, ...prev];
      });
      setEditInsight(null);
    } catch (err: any) {
      alert(`Could not save blog post: ${err.message}`);
    }
  };

  const handleToggleInsightPublish = async (art: InsightArticle) => {
    triggerHaptic(15);
    const nextStatus = !art.published;
    try {
      await toggleInsightVisibility(art.id, nextStatus);
      setInsightList(prev => prev.map(item => item.id === art.id ? { ...item, published: nextStatus } : item));
    } catch (err: any) {
      alert(`Could not update visibility: ${err.message}`);
    }
  };

  const handleDeleteInsight = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    triggerHaptic(25);
    try {
      await deleteInsightArticle(id);
      setInsightList(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      alert(`Could not delete post: ${err.message}`);
    }
  };

  // CMS Handlers: Associated Organizations
  const handleSaveOrg = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editOrg?.name) return alert('Organization name is required.');
    triggerHaptic(20);

    const rawLinks = editOrg.links || [];
    const formattedLinks = rawLinks
      .filter(l => l.url && l.url.trim().length > 0)
      .map(l => ({
        ...l,
        url: formatExternalUrl(l.url)
      }));

    const orgToSave: AssociatedOrganization = {
      id: editOrg.id || `org-${Date.now()}`,
      name: editOrg.name,
      category: (editOrg.category as any) || 'Creative & Lifestyle',
      location: editOrg.location || 'Nigeria',
      description: editOrg.description || '',
      logo: editOrg.logo || '/logos/placeholder.svg',
      links: formattedLinks.length > 0 ? formattedLinks : [{ label: 'Instagram', url: 'https://www.instagram.com', type: 'instagram' }],
    };

    try {
      await saveAssociatedOrganization(orgToSave);
      setOrgList(prev => {
        const idx = prev.findIndex(item => item.id === orgToSave.id);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = orgToSave;
          return updated;
        }
        return [orgToSave, ...prev];
      });
      setEditOrg(null);
    } catch (err: any) {
      alert(`Could not save organization: ${err.message}`);
    }
  };

  const handleDeleteOrg = async (id: string) => {
    if (!confirm('Are you sure you want to delete this organization?')) return;
    triggerHaptic(25);
    try {
      await deleteAssociatedOrganization(id);
      setOrgList(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      alert(`Could not delete organization: ${err.message}`);
    }
  };

  // CMS Handlers: Case Studies
  const handleSaveCaseStudy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCaseStudy?.client?.trim() || !editCaseStudy?.title?.trim()) {
      return alert('Client name and Title are required.');
    }
    triggerHaptic(20);
    setCsSaving(true);

    const rawUrl = editCaseStudy.project_url?.trim() || '';
    const formattedUrl = rawUrl ? formatExternalUrl(rawUrl) : '';

    const cleanedMetrics = (editCaseStudy.metrics || [])
      .filter(m => (m.label && m.label.trim()) || (m.value && m.value.trim()))
      .map(m => ({
        label: m.label?.trim() || 'Key Metric',
        value: m.value?.trim() || '-',
        subtext: m.subtext?.trim() || ''
      }));

    const cleanedScope = (editCaseStudy.scope || [])
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const cleanedTeam = (editCaseStudy.team || [])
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const csToSave: CaseStudy = {
      id: editCaseStudy.id || `cs-${Date.now()}`,
      client: editCaseStudy.client.trim(),
      title: editCaseStudy.title.trim(),
      category: (editCaseStudy.category as any) || 'Digital Marketing',
      summary: editCaseStudy.summary?.trim() || '',
      description: editCaseStudy.description?.trim() || editCaseStudy.summary?.trim() || '',
      challenge: editCaseStudy.challenge?.trim() || editCaseStudy.summary?.trim() || '',
      solution: editCaseStudy.solution?.trim() || '',
      image: editCaseStudy.image?.trim() || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      project_url: formattedUrl,
      url: formattedUrl,
      metrics: cleanedMetrics.length > 0 ? cleanedMetrics : [{ label: 'Performance', value: '+100%' }],
      scope: cleanedScope.length > 0 ? cleanedScope : ['Digital Campaigns'],
      team: cleanedTeam.length > 0 ? cleanedTeam : ['Ace Nexus Team'],
      published: editCaseStudy.published !== false,
    };

    try {
      await saveCaseStudy(csToSave);
      setCaseStudyList(prev => {
        const idx = prev.findIndex(item => item.id === csToSave.id);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = csToSave;
          return updated;
        }
        return [csToSave, ...prev];
      });
      setEditCaseStudy(null);
      setNewScopeTag('');
      setNewTeamMember('');
    } catch (err: any) {
      alert(`Could not save case study: ${err.message}`);
    } finally {
      setCsSaving(false);
    }
  };

  const handleToggleCaseStudyPublish = async (cs: CaseStudy) => {
    triggerHaptic(15);
    const nextStatus = cs.published === false ? true : false;
    try {
      await toggleCaseStudyVisibility(cs.id, nextStatus);
      setCaseStudyList(prev => prev.map(item => item.id === cs.id ? { ...item, published: nextStatus } : item));
    } catch (err: any) {
      alert(`Could not update visibility: ${err.message}`);
    }
  };

  const handleDeleteCaseStudy = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;
    triggerHaptic(25);
    try {
      await deleteCaseStudy(id);
      setCaseStudyList(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      alert(`Could not delete case study: ${err.message}`);
    }
  };

  // SEPARATE ADMIN LOGIN SCREEN (WHITE MINIMALIST THEME)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-3 sm:p-8 font-sans">
        
        {/* STANDALONE ADMIN LOGIN NAVBAR */}
        <header className="w-full max-w-7xl mx-auto flex items-center justify-between py-3 sm:py-4 border-b border-slate-200 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <img src="/images/2.svg" alt="Ace Nexus Logo" className="h-8 w-8 sm:h-9 sm:w-9 object-contain shrink-0" />
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-black tracking-tight text-slate-900 font-display truncate">ACE INNOVATION NEXUS</div>
              <div className="text-[8px] sm:text-[9px] font-mono font-semibold uppercase tracking-widest text-[#004aad]">ADMIN PORTAL</div>
            </div>
          </div>

          {onBackToWebsite && (
            <button
              onClick={onBackToWebsite}
              className="shrink-0 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 text-[11px] sm:text-xs font-bold transition-all haptic-press shadow-xs"
            >
              <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#004aad]" />
              <span>Back to Website</span>
            </button>
          )}
        </header>

        {/* LOGIN FORM CARD */}
        <div className="w-full max-w-md mx-auto my-6 sm:my-12 space-y-5 sm:space-y-6 p-5 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl text-left">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#004aad] border border-blue-100 shadow-xs">
              <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
              {isSettingNewPassword ? 'Set Admin Password' : 'Authorized Admin Portal'}
            </h1>
            <p className="text-xs text-slate-500 font-sans">
              {isSettingNewPassword ? 'Complete your account invitation setup' : 'Restricted Content & Lead Management CMS'}
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
              <ShieldAlert className="h-4 w-4 shrink-0 text-red-600" />
              <span>{authError}</span>
            </div>
          )}

          {authMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>{authMsg}</span>
            </div>
          )}

          {isSettingNewPassword ? (
            <form onSubmit={handleSetPassword} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5 font-mono uppercase text-[10px]">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 cosmic-input"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5 font-mono uppercase text-[10px]">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 cosmic-input"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 sm:py-3.5 rounded-xl font-bold text-white transition-all neon-btn haptic-press flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                {authLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                <span>Save Password & Launch CMS</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5 font-mono uppercase text-[10px]">Authorized Admin Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aceinnovationnexus.com"
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 cosmic-input"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5 font-mono uppercase text-[10px]">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 cosmic-input"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 sm:py-3.5 rounded-xl font-bold text-white transition-all neon-btn haptic-press flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                {authLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                <span>Sign In to Admin Portal</span>
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-slate-200 text-center text-[9px] sm:text-[10px] text-slate-400 font-mono tracking-wider">
            RESTRICTED ACCESS &bull; ENCRYPTED SUPABASE PORTAL
          </div>
        </div>

        {/* FOOTER BAR */}
        <footer className="w-full max-w-7xl mx-auto py-3 sm:py-4 border-t border-slate-200 text-center text-[11px] sm:text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Ace Innovation Nexus Admin Portal. Authorized Users Only.
        </footer>
      </div>
    );
  }

  // MAIN STANDALONE AUTHENTICATED CMS DASHBOARD (WHITE MINIMALIST THEME)
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* SEPARATE DEDICATED ADMIN HEADER */}
      <header className="sticky top-0 z-40 w-full bg-white/95 border-b border-slate-200 backdrop-blur-md px-3 sm:px-8 py-3 sm:py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
          
          <div className="flex items-center justify-between sm:justify-start gap-2.5 w-full sm:w-auto">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <img src="/images/2.svg" alt="Ace Nexus Logo" className="h-7 w-7 sm:h-9 sm:w-9 object-contain shrink-0" />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-xs sm:text-base font-black tracking-tight text-slate-900 font-display truncate">ACE INNOVATION NEXUS</h1>
                  <span className="hidden sm:inline-block text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#004aad] border border-blue-200">
                    CMS CONTROL
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">Live Website Content Manager</p>
              </div>
            </div>

            <span className="sm:hidden text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#004aad] border border-blue-200 shrink-0">
              CMS
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
            {onBackToWebsite && (
              <button
                onClick={onBackToWebsite}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 text-[11px] sm:text-xs font-bold transition-all haptic-press shadow-xs shrink-0"
              >
                <ArrowLeft className="h-3.5 w-3.5 text-[#004aad]" />
                <span className="truncate">Exit to Website</span>
              </button>
            )}

            <button
              onClick={loadAllData}
              className="flex items-center justify-center gap-1 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 text-[11px] sm:text-xs font-bold transition-all haptic-press shrink-0"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${subLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync Live</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-[11px] sm:text-xs font-bold transition-all haptic-press shrink-0"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="py-6 sm:py-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 text-left">
        
        {/* CMS TABS NAVIGATION BAR */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar w-full">
          <button
            onClick={() => { triggerHaptic(10); setActiveTab('insights'); }}
            className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all haptic-press ${
              activeTab === 'insights'
                ? 'bg-[#004aad] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Blog Posts ({insightList.length})</span>
          </button>

          <button
            onClick={() => { triggerHaptic(10); setActiveTab('organizations'); }}
            className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all haptic-press ${
              activeTab === 'organizations'
                ? 'bg-[#004aad] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Building2 className="h-4 w-4" />
            <span>Associated Brands ({orgList.length})</span>
          </button>

          <button
            onClick={() => { triggerHaptic(10); setActiveTab('case-studies'); }}
            className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all haptic-press ${
              activeTab === 'case-studies'
                ? 'bg-[#004aad] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Briefcase className="h-4 w-4" />
            <span>Case Studies ({caseStudyList.length})</span>
          </button>

          <button
            onClick={() => { triggerHaptic(10); setActiveTab('submissions'); }}
            className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all haptic-press ${
              activeTab === 'submissions'
                ? 'bg-[#004aad] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Inquiries ({submissions.length})</span>
          </button>
        </div>

        {/* TAB 1: BLOG POSTS / INSIGHT ARTICLES CMS */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 font-display">Blog Posts & Insights CMS</h2>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#004aad] border border-blue-200">
                    {insightList.filter(a => a.published).length} Live / {insightList.filter(a => !a.published).length} Drafts
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Note: The blog section is currently hidden from the public website while you review and perfect drafts here.
                </p>
              </div>
              <button
                onClick={() => setEditInsight({
                  title: '',
                  slug: '',
                  category: 'Marketing',
                  summary: '',
                  content: '',
                  author: 'Kofi Owusu',
                  authorRole: 'Head of SEO & Growth',
                  date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                  readTime: '5 Min Read',
                  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
                  published: false,
                  metaTitle: '',
                  metaDescription: '',
                  keywords: []
                })}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#004aad] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs shrink-0"
              >
                <Plus className="h-4 w-4" />
                <span>Create New Post</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {insightList.map((art) => (
                <div key={art.id} className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#004aad]/40 transition-all">
                  <div className="space-y-3">
                    {/* Visual Card Banner with Status Badge */}
                    <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group">
                      <img
                        src={art.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="text-[10px] font-bold font-mono text-[#004aad] uppercase bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200 shadow-xs">
                          {art.category}
                        </span>
                      </div>
                      <div className="absolute top-2.5 right-2.5">
                        <button
                          type="button"
                          onClick={() => handleToggleInsightPublish(art)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold shadow-xs transition-all ${
                            art.published
                              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                              : 'bg-slate-900/80 text-slate-200 hover:bg-slate-900'
                          }`}
                          title={art.published ? "Click to set as Draft / Hide" : "Click to Publish"}
                        >
                          {art.published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          <span>{art.published ? 'Live' : 'Hidden Draft'}</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                        <span>{art.date} &bull; {art.readTime}</span>
                        <span>/{art.slug || art.id}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 font-display leading-snug line-clamp-1">{art.title}</h3>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">{art.summary}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 text-xs">By {art.author}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditInsight(art)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs font-bold"
                      >
                        <Edit3 className="h-3.5 w-3.5 text-[#004aad]" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteInsight(art.id)}
                        className="p-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 text-xs"
                        title="Delete blog post"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDIT BLOG POST MODAL */}
        {editInsight && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md bg-slate-900/50">
            <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white p-5 sm:p-7 rounded-3xl space-y-5 text-left shadow-2xl border border-slate-200">
              
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base sm:text-xl font-bold text-slate-900 font-display">
                    {editInsight.id ? 'Edit Blog Post' : 'Create New Blog Post'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure content, publishing status, and SEO optimization.
                  </p>
                </div>
                <button onClick={() => setEditInsight(null)} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveInsight} className="space-y-4 text-xs font-sans">
                
                {/* Visibility Switch */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-800 text-xs block">Publishing Status</span>
                    <span className="text-[11px] text-slate-500">
                      {editInsight.published 
                        ? 'Article is marked as Live.' 
                        : 'Article is saved as Draft (Hidden from public website).'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditInsight({ ...editInsight, published: !editInsight.published })}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs border transition-all ${
                      editInsight.published
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'bg-slate-200 text-slate-700 border-slate-300'
                    }`}
                  >
                    {editInsight.published ? <Eye className="h-3.5 w-3.5 text-emerald-600" /> : <EyeOff className="h-3.5 w-3.5 text-slate-500" />}
                    <span>{editInsight.published ? 'Live / Published' : 'Draft / Hidden'}</span>
                  </button>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Post Title *</label>
                  <input
                    type="text"
                    required
                    value={editInsight.title || ''}
                    onChange={e => setEditInsight({ ...editInsight, title: e.target.value })}
                    placeholder="e.g. Why Your Business Needs SEO"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 cosmic-input"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">URL Slug</label>
                    <input
                      type="text"
                      value={editInsight.slug || ''}
                      onChange={e => setEditInsight({ ...editInsight, slug: e.target.value })}
                      placeholder="why-your-business-needs-seo"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 cosmic-input font-mono text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category</label>
                    <input
                      type="text"
                      value={editInsight.category || 'Marketing'}
                      onChange={e => setEditInsight({ ...editInsight, category: e.target.value })}
                      placeholder="Marketing / Branding / Tech / Training"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 cosmic-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Author Name</label>
                    <input
                      type="text"
                      value={editInsight.author || 'Ace Nexus Team'}
                      onChange={e => setEditInsight({ ...editInsight, author: e.target.value })}
                      placeholder="e.g. Kofi Owusu"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 cosmic-input"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Read Time Estimate</label>
                    <input
                      type="text"
                      value={editInsight.readTime || '5 Min Read'}
                      onChange={e => setEditInsight({ ...editInsight, readTime: e.target.value })}
                      placeholder="e.g. 5 Min Read"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 cosmic-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Card Summary Text *</label>
                  <textarea
                    required
                    rows={2}
                    value={editInsight.summary || ''}
                    onChange={e => setEditInsight({ ...editInsight, summary: e.target.value })}
                    placeholder="Short summary displayed on cards..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 cosmic-input"
                  />
                </div>

                {/* Cover Image with Live Preview */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Cover Image URL</label>
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <input
                      type="text"
                      value={editInsight.image || ''}
                      onChange={e => setEditInsight({ ...editInsight, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 cosmic-input"
                    />
                    <div className="h-12 w-20 shrink-0 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center shadow-xs">
                      {editInsight.image ? (
                        <img
                          src={editInsight.image}
                          alt="Cover preview"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                      ) : (
                        <ImageIcon className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Full Article Content */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Article Body (Markdown / Text)</label>
                  <textarea
                    rows={6}
                    value={editInsight.content || ''}
                    onChange={e => setEditInsight({ ...editInsight, content: e.target.value })}
                    placeholder="Write the full article body in markdown or text..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 cosmic-input font-mono text-[11px] leading-relaxed"
                  />
                </div>

                {/* SEO Accordion / Fields */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#004aad] font-mono">
                    Search Engine Optimization (SEO)
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Meta Title</label>
                    <input
                      type="text"
                      value={editInsight.metaTitle || ''}
                      onChange={e => setEditInsight({ ...editInsight, metaTitle: e.target.value })}
                      placeholder="Optimized page title for Google search"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 cosmic-input"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Meta Description</label>
                    <textarea
                      rows={2}
                      value={editInsight.metaDescription || ''}
                      onChange={e => setEditInsight({ ...editInsight, metaDescription: e.target.value })}
                      placeholder="150-160 characters summary for Google search snippet"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 cosmic-input"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditInsight(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-bold hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#004aad] hover:bg-blue-700 text-white font-bold shadow-xs flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Save Blog Post</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: ASSOCIATED BRANDS CMS */}
        {activeTab === 'organizations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 font-display">Associated Brands CMS</h2>
                <p className="text-xs text-slate-500">Edit brand details and social links live on the website.</p>
              </div>
              <button
                onClick={() => setEditOrg({ name: '', category: 'Creative & Lifestyle', location: 'Ibadan, Nigeria', description: '', logo: '/logos/placeholder.svg' })}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#004aad] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs shrink-0"
              >
                <Plus className="h-4 w-4" />
                <span>Add Associated Brand</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {orgList.map((org) => (
                <div key={org.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between hover:border-[#004aad]/40 transition-all">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold text-[#004aad] uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{org.category}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{org.location}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-xl p-1 bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden">
                        <img
                          src={org.logo || '/logos/placeholder.svg'}
                          alt={org.name}
                          className="h-full w-full object-contain"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/logos/placeholder.svg'; }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-slate-900 truncate">{org.name}</h3>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{org.description || 'No description added.'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-slate-400">{org.links?.length || 0} Links</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditOrg(org)}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs font-bold"
                      >
                        <Edit3 className="h-3 w-3 text-[#004aad]" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteOrg(org.id)}
                        className="p-1 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 text-xs"
                        title="Delete organization"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDIT ORGANIZATION MODAL */}
        {editOrg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-900/40">
            <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white p-5 sm:p-6 rounded-3xl space-y-4 text-left shadow-2xl border border-slate-200">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                  {editOrg.id ? 'Edit Brand Details' : 'Add New Associated Brand'}
                </h3>
                <button onClick={() => setEditOrg(null)} className="p-1 rounded-full text-slate-400 hover:text-slate-900">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveOrg} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={editOrg.name || ''}
                    onChange={e => setEditOrg({ ...editOrg, name: e.target.value })}
                    placeholder="e.g. Siloan Medical Center"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 cosmic-input"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category</label>
                    <select
                      value={editOrg.category || 'Creative & Lifestyle'}
                      onChange={e => setEditOrg({ ...editOrg, category: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 cosmic-input"
                    >
                      <option value="Healthcare">Healthcare</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Education">Education</option>
                      <option value="Food & Beverage">Food & Beverage</option>
                      <option value="Creative & Lifestyle">Creative & Lifestyle</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={editOrg.location || 'Ibadan, Nigeria'}
                      onChange={e => setEditOrg({ ...editOrg, location: e.target.value })}
                      placeholder="e.g. Old-Ife Road, Ibadan"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 cosmic-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Description Text</label>
                  <textarea
                    rows={3}
                    value={editOrg.description || ''}
                    onChange={e => setEditOrg({ ...editOrg, description: e.target.value })}
                    placeholder="Brief description..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 cosmic-input"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Brand Logo Image URL / Path</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={editOrg.logo || ''}
                      onChange={e => setEditOrg({ ...editOrg, logo: e.target.value })}
                      placeholder="/logos/academy-suites.svg or https://..."
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 cosmic-input"
                    />
                    <div className="h-10 w-10 shrink-0 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center p-1.5 overflow-hidden">
                      <img
                        src={editOrg.logo || '/logos/placeholder.svg'}
                        alt="Logo preview"
                        className="h-full w-full object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/logos/placeholder.svg'; }}
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Enter a relative image path (e.g. <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">/logos/my-brand.svg</code>) or full web image URL.
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Instagram Link URL / Handle</label>
                  <input
                    type="text"
                    value={editOrg.links?.find(l => l.type === 'instagram')?.url || editOrg.links?.[0]?.url || ''}
                    onChange={e => {
                      const url = e.target.value;
                      const currentLinks = [...(editOrg.links || [])];
                      const idx = currentLinks.findIndex(l => l.type === 'instagram');
                      if (idx >= 0) {
                        currentLinks[idx] = { label: 'Instagram', url, type: 'instagram' };
                      } else {
                        currentLinks.unshift({ label: 'Instagram', url, type: 'instagram' });
                      }
                      setEditOrg({ ...editOrg, links: currentLinks });
                    }}
                    placeholder="https://www.instagram.com/yourhandle or @yourhandle"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 cosmic-input"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Website Link (Optional)</label>
                    <input
                      type="text"
                      value={editOrg.links?.find(l => l.type === 'website')?.url || ''}
                      onChange={e => {
                        const url = e.target.value;
                        const currentLinks = [...(editOrg.links || [])];
                        const idx = currentLinks.findIndex(l => l.type === 'website');
                        if (idx >= 0) {
                          currentLinks[idx] = { label: 'Website', url, type: 'website' };
                        } else {
                          currentLinks.push({ label: 'Website', url, type: 'website' });
                        }
                        setEditOrg({ ...editOrg, links: currentLinks });
                      }}
                      placeholder="https://www.example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 cosmic-input"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Facebook Link (Optional)</label>
                    <input
                      type="text"
                      value={editOrg.links?.find(l => l.type === 'facebook')?.url || ''}
                      onChange={e => {
                        const url = e.target.value;
                        const currentLinks = [...(editOrg.links || [])];
                        const idx = currentLinks.findIndex(l => l.type === 'facebook');
                        if (idx >= 0) {
                          currentLinks[idx] = { label: 'Facebook', url, type: 'facebook' };
                        } else {
                          currentLinks.push({ label: 'Facebook', url, type: 'facebook' });
                        }
                        setEditOrg({ ...editOrg, links: currentLinks });
                      }}
                      placeholder="https://facebook.com/yourpage"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 cosmic-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">TikTok Link (Optional)</label>
                  <input
                    type="text"
                    value={editOrg.links?.find(l => l.type === 'tiktok')?.url || ''}
                    onChange={e => {
                      const url = e.target.value;
                      const currentLinks = [...(editOrg.links || [])];
                      const idx = currentLinks.findIndex(l => l.type === 'tiktok');
                      if (idx >= 0) {
                        currentLinks[idx] = { label: 'TikTok', url, type: 'tiktok' };
                      } else {
                        currentLinks.push({ label: 'TikTok', url, type: 'tiktok' });
                      }
                      setEditOrg({ ...editOrg, links: currentLinks });
                    }}
                    placeholder="https://www.tiktok.com/@yourhandle"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 cosmic-input"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditOrg(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-bold hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#004aad] hover:bg-blue-700 text-white font-bold shadow-xs"
                  >
                    Save Brand Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: CASE STUDIES PORTFOLIO CMS */}
        {activeTab === 'case-studies' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 font-display">Case Studies CMS</h2>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#004aad] border border-blue-200">
                    {caseStudyList.filter(c => c.published !== false).length} Live / {caseStudyList.filter(c => c.published === false).length} Drafts
                  </span>
                </div>
                <p className="text-xs text-slate-500">Edit titles, image URLs, live demo URLs, solutions, metrics, and deliverables live on the website.</p>
              </div>
              <button
                onClick={() => {
                  triggerHaptic(10);
                  setEditCaseStudy({
                    client: '',
                    title: '',
                    category: 'Digital Marketing',
                    summary: '',
                    challenge: '',
                    solution: '',
                    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
                    project_url: '',
                    published: true,
                    metrics: [
                      { label: 'Growth / Metric', value: '+100%', subtext: 'Verified result' }
                    ],
                    scope: ['Digital Campaigns', 'Growth Strategy'],
                    team: ['Ace Nexus Team']
                  });
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#004aad] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs shrink-0"
              >
                <Plus className="h-4 w-4" />
                <span>Add Case Study</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {caseStudyList.map((cs) => (
                <div key={cs.id} className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#004aad]/40 transition-all">
                  <div className="space-y-3">
                    {/* Visual Card Image Banner */}
                    <div className="relative w-full h-40 sm:h-44 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group">
                      <img
                        src={cs.image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'}
                        alt={cs.client}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="text-[10px] font-bold font-mono text-[#004aad] uppercase bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200 shadow-xs">
                          {cs.category}
                        </span>
                      </div>
                      
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleToggleCaseStudyPublish(cs)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold shadow-xs transition-all ${
                            cs.published !== false
                              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                              : 'bg-slate-900/80 text-slate-200 hover:bg-slate-900'
                          }`}
                          title={cs.published !== false ? "Click to hide from website" : "Click to publish on website"}
                        >
                          {cs.published !== false ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          <span>{cs.published !== false ? 'Live' : 'Hidden'}</span>
                        </button>

                        {cs.project_url && (
                          <a
                            href={formatExternalUrl(cs.project_url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 text-[10px] font-bold bg-[#004aad] text-white px-2 py-1 rounded-md shadow-xs hover:bg-blue-700 transition-colors"
                            title="Open live project"
                          >
                            <span>Link</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span className="font-bold text-[#004aad] uppercase tracking-wider">{cs.client}</span>
                        <span>ID: {cs.id}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 font-display line-clamp-1">{cs.title}</h3>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">{cs.summary}</p>
                    </div>

                    {/* Metrics preview pills */}
                    {cs.metrics && cs.metrics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {cs.metrics.slice(0, 3).map((met, i) => (
                          <span key={i} className="inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                            <strong className="text-slate-900 mr-1">{met.value}</strong> {met.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-slate-400">{cs.scope?.length || 0} Scope Items</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          triggerHaptic(10);
                          setEditCaseStudy({
                            ...cs,
                            metrics: cs.metrics ? cs.metrics.map(m => ({ ...m })) : [],
                            scope: cs.scope ? [...cs.scope] : [],
                            team: cs.team ? [...cs.team] : []
                          });
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs font-bold"
                      >
                        <Edit3 className="h-3.5 w-3.5 text-[#004aad]" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteCaseStudy(cs.id)}
                        className="p-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 text-xs"
                        title="Delete case study"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDIT CASE STUDY MODAL */}
        {editCaseStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md bg-slate-900/50">
            <div className="w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white p-5 sm:p-7 rounded-3xl space-y-6 text-left shadow-2xl border border-slate-200">
              
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base sm:text-xl font-bold text-slate-900 font-display">
                    {editCaseStudy.id ? `Edit Case Study (${editCaseStudy.client || 'Draft'})` : 'Create New Case Study'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Changes will sync live to the Supabase database and Our Work section.
                  </p>
                </div>
                <button 
                  onClick={() => setEditCaseStudy(null)} 
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCaseStudy} className="space-y-5 text-xs font-sans">
                
                {/* Section 1: Client & Core Info */}
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#004aad] font-mono flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>Project Overview</span>
                  </div>

                  {/* Visibility Switch */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200">
                    <div>
                      <span className="font-bold text-slate-800 text-xs block">Website Visibility</span>
                      <span className="text-[11px] text-slate-500">
                        {editCaseStudy.published !== false 
                          ? 'This case study will be visible to public visitors on Our Work page.' 
                          : 'This case study is hidden (saved as draft).'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditCaseStudy({ ...editCaseStudy, published: editCaseStudy.published === false ? true : false })}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs border transition-all ${
                        editCaseStudy.published !== false
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-slate-200 text-slate-700 border-slate-300'
                      }`}
                    >
                      {editCaseStudy.published !== false ? <Eye className="h-3.5 w-3.5 text-emerald-600" /> : <EyeOff className="h-3.5 w-3.5 text-slate-500" />}
                      <span>{editCaseStudy.published !== false ? 'Live / Published' : 'Draft / Hidden'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Client Name *</label>
                      <input
                        type="text"
                        required
                        value={editCaseStudy.client || ''}
                        onChange={e => setEditCaseStudy({ ...editCaseStudy, client: e.target.value })}
                        placeholder="e.g. Checkers Africa (Nigeria)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 cosmic-input"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Category</label>
                      <select
                        value={editCaseStudy.category || 'Digital Marketing'}
                        onChange={e => setEditCaseStudy({ ...editCaseStudy, category: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 cosmic-input"
                      >
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Branding & Strategy">Branding & Strategy</option>
                        <option value="Tech Products">Tech Products</option>
                        <option value="Branding & Content">Branding & Content</option>
                        <option value="Web & App Development">Web & App Development</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Case Study Headline / Title *</label>
                    <input
                      type="text"
                      required
                      value={editCaseStudy.title || ''}
                      onChange={e => setEditCaseStudy({ ...editCaseStudy, title: e.target.value })}
                      placeholder="e.g. Scaling African Luxury Fashion to a Global Audience"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 cosmic-input"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Card Summary (Short Overview) *</label>
                    <textarea
                      required
                      rows={2}
                      value={editCaseStudy.summary || ''}
                      onChange={e => setEditCaseStudy({ ...editCaseStudy, summary: e.target.value })}
                      placeholder="Brief overview displayed on the portfolio card grid..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 cosmic-input"
                    />
                  </div>
                </div>

                {/* Section 2: URLs & Assets */}
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#004aad] font-mono flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5" />
                    <span>Project URL & Visual Assets</span>
                  </div>

                  {/* Project URL */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-slate-700">Live Project / Website URL</label>
                      {editCaseStudy.project_url && (
                        <a
                          href={formatExternalUrl(editCaseStudy.project_url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-bold text-[#004aad] hover:underline flex items-center gap-1"
                        >
                          <span>Test Link</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editCaseStudy.project_url || ''}
                        onChange={e => setEditCaseStudy({ ...editCaseStudy, project_url: e.target.value })}
                        placeholder="https://example.com or checkersafrica.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 cosmic-input"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Link to the client's live app, landing page, or external case study. Auto-formatted with https://.
                    </p>
                  </div>

                  {/* Image URL with Live Preview */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Cover Image URL / Mockup Path *</label>
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                      <input
                        type="text"
                        required
                        value={editCaseStudy.image || ''}
                        onChange={e => setEditCaseStudy({ ...editCaseStudy, image: e.target.value })}
                        placeholder="https://images.unsplash.com/... or /images/zenith_fintech_mockup.png"
                        className="w-full flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 cosmic-input"
                      />
                      
                      {/* Live Image Preview Thumbnail */}
                      <div className="h-14 w-24 shrink-0 rounded-xl border border-slate-200 bg-white overflow-hidden flex items-center justify-center shadow-xs">
                        {editCaseStudy.image ? (
                          <img
                            src={editCaseStudy.image}
                            alt="Preview"
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-slate-400 text-[9px]">
                            <ImageIcon className="h-4 w-4" />
                            <span>No Image</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Supports direct Unsplash image links, external CDN URLs, or local mockups (e.g. <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">/images/kola_apparel_branding.png</code>).
                    </p>
                  </div>
                </div>

                {/* Section 3: In-Depth Narrative */}
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#004aad] font-mono flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" />
                    <span>In-Depth Narrative</span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">The Challenge</label>
                    <textarea
                      rows={3}
                      value={editCaseStudy.challenge || ''}
                      onChange={e => setEditCaseStudy({ ...editCaseStudy, challenge: e.target.value })}
                      placeholder="What obstacle or market challenge did the client face prior to working with Ace?"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 cosmic-input"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Our Solution Blueprint *</label>
                    <textarea
                      required
                      rows={3}
                      value={editCaseStudy.solution || ''}
                      onChange={e => setEditCaseStudy({ ...editCaseStudy, solution: e.target.value })}
                      placeholder="How did Ace engineer the solution, execute campaigns, or deploy tech?"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 cosmic-input"
                    />
                  </div>
                </div>

                {/* Section 4: Key Metrics (Proof of Impact) */}
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#004aad] font-mono flex items-center gap-1.5">
                      <BarChart3 className="h-3.5 w-3.5" />
                      <span>Impact Metrics ({(editCaseStudy.metrics || []).length})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const current = [...(editCaseStudy.metrics || [])];
                        current.push({ label: 'Metric', value: '100%', subtext: 'Verified' });
                        setEditCaseStudy({ ...editCaseStudy, metrics: current });
                      }}
                      className="flex items-center gap-1 text-[11px] font-bold text-[#004aad] hover:underline"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Metric</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {(editCaseStudy.metrics || []).map((m, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
                        <div className="w-full sm:w-1/3">
                          <input
                            type="text"
                            value={m.value}
                            onChange={e => {
                              const updated = [...(editCaseStudy.metrics || [])];
                              updated[idx] = { ...updated[idx], value: e.target.value };
                              setEditCaseStudy({ ...editCaseStudy, metrics: updated });
                            }}
                            placeholder="Value (e.g. ₦18B+ or +124%)"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold"
                          />
                        </div>
                        <div className="w-full sm:w-1/3">
                          <input
                            type="text"
                            value={m.label}
                            onChange={e => {
                              const updated = [...(editCaseStudy.metrics || [])];
                              updated[idx] = { ...updated[idx], label: e.target.value };
                              setEditCaseStudy({ ...editCaseStudy, metrics: updated });
                            }}
                            placeholder="Label (e.g. Transactions)"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs"
                          />
                        </div>
                        <div className="w-full sm:w-1/3 flex items-center gap-1.5">
                          <input
                            type="text"
                            value={m.subtext || ''}
                            onChange={e => {
                              const updated = [...(editCaseStudy.metrics || [])];
                              updated[idx] = { ...updated[idx], subtext: e.target.value };
                              setEditCaseStudy({ ...editCaseStudy, metrics: updated });
                            }}
                            placeholder="Subtext (e.g. In 8 months)"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-500"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (editCaseStudy.metrics || []).filter((_, i) => i !== idx);
                              setEditCaseStudy({ ...editCaseStudy, metrics: updated });
                            }}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg shrink-0 transition-colors"
                            title="Remove metric"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 5: Scope / Deliverables */}
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#004aad] font-mono flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5" />
                    <span>Scope of Deliverables</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {(editCaseStudy.scope || []).map((sc, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-[11px] font-medium shadow-2xs"
                      >
                        <span>{sc}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (editCaseStudy.scope || []).filter((_, i) => i !== idx);
                            setEditCaseStudy({ ...editCaseStudy, scope: updated });
                          }}
                          className="hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newScopeTag}
                      onChange={e => setNewScopeTag(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newScopeTag.trim()) {
                            setEditCaseStudy({
                              ...editCaseStudy,
                              scope: [...(editCaseStudy.scope || []), newScopeTag.trim()]
                            });
                            setNewScopeTag('');
                          }
                        }
                      }}
                      placeholder="Add deliverable (e.g. 'Paid Social Ads', 'UI/UX Redesign'). Press Enter or +"
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 cosmic-input text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newScopeTag.trim()) {
                          setEditCaseStudy({
                            ...editCaseStudy,
                            scope: [...(editCaseStudy.scope || []), newScopeTag.trim()]
                          });
                          setNewScopeTag('');
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Section 6: Squad / Team Members */}
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#004aad] font-mono flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    <span>Project Squad (Optional)</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {(editCaseStudy.team || []).map((t, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-[11px] font-medium shadow-2xs"
                      >
                        <span>{t}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (editCaseStudy.team || []).filter((_, i) => i !== idx);
                            setEditCaseStudy({ ...editCaseStudy, team: updated });
                          }}
                          className="hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newTeamMember}
                      onChange={e => setNewTeamMember(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newTeamMember.trim()) {
                            setEditCaseStudy({
                              ...editCaseStudy,
                              team: [...(editCaseStudy.team || []), newTeamMember.trim()]
                            });
                            setNewTeamMember('');
                          }
                        }
                      }}
                      placeholder="Add squad member (e.g. 'Amara Nwachukwu (Creative Director)'). Press Enter or +"
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 cosmic-input text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newTeamMember.trim()) {
                          setEditCaseStudy({
                            ...editCaseStudy,
                            team: [...(editCaseStudy.team || []), newTeamMember.trim()]
                          });
                          setNewTeamMember('');
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Modal Footer Controls */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {editCaseStudy.id ? `Editing ID: ${editCaseStudy.id}` : 'New Case Study will receive auto-ID'}
                  </span>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setEditCaseStudy(null)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-bold hover:bg-slate-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={csSaving}
                      className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#004aad] hover:bg-blue-700 text-white font-bold shadow-xs transition-all haptic-press"
                    >
                      {csSaving ? (
                        <>
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          <span>Saving to Supabase...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Save Case Study Live</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* TAB 4: CLIENT INQUIRIES */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 font-display">Client Consultations & Inquiries</h2>
                <p className="text-xs text-slate-500">Strategy request submissions sent from the website contact modal.</p>
              </div>
            </div>

            {submissions.length === 0 ? (
              <div className="p-8 sm:p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-2 shadow-xs">
                <Users className="h-8 w-8 text-slate-400 mx-auto" />
                <h3 className="text-sm font-bold text-slate-700">No client submissions yet</h3>
                <p className="text-xs text-slate-500">Inquiries submitted by website visitors will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {submissions.filter(s => subFilter === 'All' || s.status === subFilter).map((sub) => (
                  <div key={sub.id} className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">{sub.full_name} ({sub.company || 'Direct Inquiry'})</span>
                      <span className="text-[10px] font-mono text-slate-400">{new Date(sub.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="text-xs text-slate-600 space-y-1 font-sans">
                      <div><strong className="text-slate-800">Email:</strong> {sub.email}</div>
                      <div><strong className="text-slate-800">Service:</strong> {sub.service_requested}</div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mt-2 text-slate-700 font-mono text-[11px] leading-relaxed">{sub.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

    </div>
  );
}
