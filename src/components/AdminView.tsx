import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldCheck, Database, Users, Briefcase, Building2, Key, Lock, FileText, ArrowLeft,
  LogOut, Plus, Trash2, Edit3, CheckCircle2, AlertCircle, RefreshCw, Copy, Check, ExternalLink, Download, Search, X, ShieldAlert
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { 
  getAssociatedOrganizations, saveAssociatedOrganization, deleteAssociatedOrganization,
  getInsightArticles, saveInsightArticle, deleteInsightArticle,
  getCaseStudies, saveCaseStudy, deleteCaseStudy
} from '../lib/dataService';
import { CaseStudy, InsightArticle, AssociatedOrganization } from '../types';
import { triggerHaptic } from '../utils/haptics';

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

  // Load initial content
  const loadAllData = useCallback(async () => {
    setSubLoading(true);
    try {
      const [insights, orgs, studies] = await Promise.all([
        getInsightArticles(),
        getAssociatedOrganizations(),
        getCaseStudies()
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

    const articleToSave: InsightArticle = {
      id: editInsight.id || `ins-${Date.now()}`,
      title: editInsight.title,
      category: editInsight.category || 'Marketing',
      readTime: editInsight.readTime || '5 Min Read',
      date: editInsight.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      summary: editInsight.summary,
      image: editInsight.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      author: editInsight.author || 'Ace Nexus Team',
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

    const orgToSave: AssociatedOrganization = {
      id: editOrg.id || `org-${Date.now()}`,
      name: editOrg.name,
      category: (editOrg.category as any) || 'Creative & Lifestyle',
      location: editOrg.location || 'Nigeria',
      description: editOrg.description || '',
      logo: editOrg.logo || '/logos/placeholder.svg',
      links: editOrg.links || [{ label: 'Instagram', url: 'https://www.instagram.com', type: 'instagram' }],
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
    if (!editCaseStudy?.client || !editCaseStudy?.title) return alert('Client name and Title are required.');
    triggerHaptic(20);

    const csToSave: CaseStudy = {
      id: editCaseStudy.id || `cs-${Date.now()}`,
      client: editCaseStudy.client,
      title: editCaseStudy.title,
      category: (editCaseStudy.category as any) || 'Digital Marketing',
      summary: editCaseStudy.summary || '',
      description: editCaseStudy.description || editCaseStudy.summary || '',
      challenge: editCaseStudy.challenge || editCaseStudy.summary || '',
      solution: editCaseStudy.solution || '',
      image: editCaseStudy.image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      metrics: editCaseStudy.metrics || [{ label: 'Performance', value: '+100%' }],
      scope: editCaseStudy.scope || ['Digital Campaigns'],
      team: editCaseStudy.team || ['Ace Nexus Team'],
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
    } catch (err: any) {
      alert(`Could not save case study: ${err.message}`);
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

  // SEPARATE ADMIN LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8 font-sans selection:bg-[#004aad] selection:text-white">
        
        {/* STANDALONE ADMIN LOGIN NAVBAR */}
        <header className="w-full max-w-7xl mx-auto flex items-center justify-between py-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <img src="/images/1.svg" alt="Ace Nexus Logo" className="h-9 w-9 object-contain" />
            <div>
              <div className="text-sm font-black tracking-tight text-white font-display">ACE INNOVATION NEXUS</div>
              <div className="text-[9px] font-mono font-semibold uppercase tracking-widest text-blue-400">ADMIN CONTROL CENTER</div>
            </div>
          </div>

          {onBackToWebsite && (
            <button
              onClick={onBackToWebsite}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold transition-all haptic-press shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Website</span>
            </button>
          )}
        </header>

        {/* LOGIN FORM CARD */}
        <div className="w-full max-w-md mx-auto my-12 space-y-6 p-8 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl text-left backdrop-blur-xl">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-inner">
              <ShieldCheck className="h-7 w-7 text-blue-400" />
            </div>
            <h1 className="text-2xl font-black text-white font-display tracking-tight">
              {isSettingNewPassword ? 'Set Admin Password' : 'Authorized Admin Portal'}
            </h1>
            <p className="text-xs text-slate-400 font-sans">
              {isSettingNewPassword ? 'Complete your account invitation setup' : 'Restricted Content & Lead Management CMS'}
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-2xl bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-center gap-2.5">
              <ShieldAlert className="h-4 w-4 shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          {authMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>{authMsg}</span>
            </div>
          )}

          {isSettingNewPassword ? (
            <form onSubmit={handleSetPassword} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1.5 font-mono uppercase text-[10px]">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5 font-mono uppercase text-[10px]">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 rounded-xl font-bold text-white transition-all bg-[#004aad] hover:bg-blue-600 shadow-md haptic-press flex items-center justify-center gap-2 text-xs"
              >
                {authLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                <span>Save Password & Launch CMS</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1.5 font-mono uppercase text-[10px]">Authorized Admin Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aceinnovationnexus.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5 font-mono uppercase text-[10px]">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 rounded-xl font-bold text-white transition-all bg-[#004aad] hover:bg-blue-600 shadow-md haptic-press flex items-center justify-center gap-2 text-xs"
              >
                {authLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                <span>Sign In to Admin Portal</span>
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-slate-800 text-center text-[10px] text-slate-500 font-mono tracking-wider">
            RESTRICTED ACCESS &bull; ENCRYPTED SUPABASE PORTAL
          </div>
        </div>

        {/* FOOTER BAR */}
        <footer className="w-full max-w-7xl mx-auto py-4 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Ace Innovation Nexus Admin Portal. Authorized Users Only.
        </footer>
      </div>
    );
  }

  // MAIN STANDALONE AUTHENTICATED CMS DASHBOARD
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-[#004aad] selection:text-white">
      
      {/* SEPARATE DEDICATED ADMIN HEADER */}
      <header className="sticky top-0 z-40 w-full bg-slate-900/90 border-b border-slate-800 backdrop-blur-xl px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <img src="/images/1.svg" alt="Ace Nexus Logo" className="h-10 w-10 object-contain" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black tracking-tight text-white font-display">ACE INNOVATION NEXUS</h1>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  CMS CONTROL CENTER
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Live Database Website Content Manager</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onBackToWebsite && (
              <button
                onClick={onBackToWebsite}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold transition-all haptic-press shadow-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Exit to Website</span>
              </button>
            )}

            <button
              onClick={loadAllData}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white text-xs font-bold transition-all haptic-press"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${subLoading ? 'animate-spin' : ''}`} />
              <span>Sync Live</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-red-900/50 bg-red-950/40 text-red-400 hover:bg-red-900/60 text-xs font-bold transition-all haptic-press"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="py-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 text-left">
        
        {/* CMS TABS NAVIGATION BAR */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => { triggerHaptic(10); setActiveTab('insights'); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all haptic-press ${
              activeTab === 'insights'
                ? 'bg-[#004aad] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Blog Posts / Insights ({insightList.length})</span>
          </button>

          <button
            onClick={() => { triggerHaptic(10); setActiveTab('organizations'); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all haptic-press ${
              activeTab === 'organizations'
                ? 'bg-[#004aad] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Building2 className="h-4 w-4" />
            <span>Associated Brands ({orgList.length})</span>
          </button>

          <button
            onClick={() => { triggerHaptic(10); setActiveTab('case-studies'); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all haptic-press ${
              activeTab === 'case-studies'
                ? 'bg-[#004aad] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Briefcase className="h-4 w-4" />
            <span>Case Studies ({caseStudyList.length})</span>
          </button>

          <button
            onClick={() => { triggerHaptic(10); setActiveTab('submissions'); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all haptic-press ${
              activeTab === 'submissions'
                ? 'bg-[#004aad] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Client Inquiries ({submissions.length})</span>
          </button>
        </div>

        {/* TAB 1: BLOG POSTS / INSIGHTS CMS */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-black text-white font-display">Blog Posts & Insights CMS</h2>
                <p className="text-xs text-slate-400">Edit titles, summaries, and authors displayed on the website homepage.</p>
              </div>
              <button
                onClick={() => setEditInsight({ title: '', category: 'Marketing', summary: '', author: 'Kofi Owusu', date: 'June 2026', readTime: '5 Min Read' })}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#004aad] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md"
              >
                <Plus className="h-4 w-4" />
                <span>Create New Post</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {insightList.map((art) => (
                <div key={art.id} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition-all">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold font-mono text-blue-400 uppercase bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">{art.category}</span>
                      <span className="text-[10px] font-mono text-slate-500">{art.date} &bull; {art.readTime}</span>
                    </div>
                    <h3 className="text-base font-black text-white font-display leading-snug">{art.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{art.summary}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">Author: {art.author}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditInsight(art)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 text-xs font-bold"
                      >
                        <Edit3 className="h-3.5 w-3.5 text-blue-400" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteInsight(art.id)}
                        className="p-1.5 rounded-lg border border-red-900/50 bg-red-950/40 text-red-400 hover:bg-red-900/60 text-xs"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-950/80">
            <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-slate-900 p-6 rounded-3xl space-y-4 text-left shadow-2xl border border-slate-800">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white font-display">
                  {editInsight.id ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h3>
                <button onClick={() => setEditInsight(null)} className="p-1 rounded-full text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveInsight} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Post Title *</label>
                  <input
                    type="text"
                    required
                    value={editInsight.title || ''}
                    onChange={e => setEditInsight({ ...editInsight, title: e.target.value })}
                    placeholder="e.g. Why Your Business Needs SEO"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Category</label>
                    <input
                      type="text"
                      value={editInsight.category || 'Marketing'}
                      onChange={e => setEditInsight({ ...editInsight, category: e.target.value })}
                      placeholder="Marketing / Branding / Tech"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Author Name</label>
                    <input
                      type="text"
                      value={editInsight.author || 'Kofi Owusu'}
                      onChange={e => setEditInsight({ ...editInsight, author: e.target.value })}
                      placeholder="e.g. Kofi Owusu"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Article Summary Text *</label>
                  <textarea
                    required
                    rows={4}
                    value={editInsight.summary || ''}
                    onChange={e => setEditInsight({ ...editInsight, summary: e.target.value })}
                    placeholder="Write summary text displayed on website blog card..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Cover Image URL</label>
                  <input
                    type="text"
                    value={editInsight.image || ''}
                    onChange={e => setEditInsight({ ...editInsight, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditInsight(null)}
                    className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 font-bold hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#004aad] hover:bg-blue-600 text-white font-bold shadow-md"
                  >
                    Save Changes Live
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: ASSOCIATED BRANDS CMS */}
        {activeTab === 'organizations' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-black text-white font-display">Associated Brands CMS</h2>
                <p className="text-xs text-slate-400">Edit brand details and social links live on the website.</p>
              </div>
              <button
                onClick={() => setEditOrg({ name: '', category: 'Creative & Lifestyle', location: 'Ibadan, Nigeria', description: '', logo: '/logos/placeholder.svg' })}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#004aad] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md"
              >
                <Plus className="h-4 w-4" />
                <span>Add Associated Brand</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {orgList.map((org) => (
                <div key={org.id} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-blue-500/40 transition-all">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold text-blue-400 uppercase bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">{org.category}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{org.location}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white">{org.name}</h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{org.description || 'No description added.'}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-slate-500">{org.links?.length || 0} Links</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditOrg(org)}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white text-xs font-bold"
                      >
                        <Edit3 className="h-3 w-3 text-blue-400" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteOrg(org.id)}
                        className="p-1 rounded-lg border border-red-900/50 bg-red-950/40 text-red-400 hover:bg-red-900/60 text-xs"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-950/80">
            <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-slate-900 p-6 rounded-3xl space-y-4 text-left shadow-2xl border border-slate-800">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white font-display">
                  {editOrg.id ? 'Edit Brand Details' : 'Add New Associated Brand'}
                </h3>
                <button onClick={() => setEditOrg(null)} className="p-1 rounded-full text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveOrg} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={editOrg.name || ''}
                    onChange={e => setEditOrg({ ...editOrg, name: e.target.value })}
                    placeholder="e.g. Siloan Medical Center"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Category</label>
                    <select
                      value={editOrg.category || 'Creative & Lifestyle'}
                      onChange={e => setEditOrg({ ...editOrg, category: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:border-blue-500 font-mono"
                    >
                      <option value="Healthcare">Healthcare</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Education">Education</option>
                      <option value="Food & Beverage">Food & Beverage</option>
                      <option value="Creative & Lifestyle">Creative & Lifestyle</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Location</label>
                    <input
                      type="text"
                      value={editOrg.location || 'Ibadan, Nigeria'}
                      onChange={e => setEditOrg({ ...editOrg, location: e.target.value })}
                      placeholder="e.g. Old-Ife Road, Ibadan"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Description Text</label>
                  <textarea
                    rows={3}
                    value={editOrg.description || ''}
                    onChange={e => setEditOrg({ ...editOrg, description: e.target.value })}
                    placeholder="Brief description..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Instagram Link URL</label>
                  <input
                    type="text"
                    value={editOrg.links?.[0]?.url || ''}
                    onChange={e => {
                      const url = e.target.value;
                      setEditOrg({
                        ...editOrg,
                        links: [{ label: 'Instagram', url, type: 'instagram' }]
                      });
                    }}
                    placeholder="https://www.instagram.com/yourhandle"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditOrg(null)}
                    className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 font-bold hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#004aad] hover:bg-blue-600 text-white font-bold shadow-md"
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
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-black text-white font-display">Case Studies CMS</h2>
                <p className="text-xs text-slate-400">Edit titles, summaries, and solutions for Our Work page.</p>
              </div>
              <button
                onClick={() => setEditCaseStudy({ client: '', title: '', category: 'Digital Marketing', summary: '', solution: '' })}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#004aad] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md"
              >
                <Plus className="h-4 w-4" />
                <span>Add Case Study</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudyList.map((cs) => (
                <div key={cs.id} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition-all">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold font-mono text-blue-400 uppercase bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">{cs.category}</span>
                      <span className="text-[10px] font-mono text-slate-500">ID: {cs.id}</span>
                    </div>
                    <h3 className="text-base font-black text-white font-display">{cs.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{cs.summary}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">Client: {cs.client}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditCaseStudy(cs)}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white text-xs font-bold"
                      >
                        <Edit3 className="h-3 w-3 text-blue-400" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteCaseStudy(cs.id)}
                        className="p-1 rounded-lg border border-red-900/50 bg-red-950/40 text-red-400 hover:bg-red-900/60 text-xs"
                        title="Delete case study"
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

        {/* TAB 4: CLIENT INQUIRIES */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-black text-white font-display">Client Consultations & Inquiries</h2>
                <p className="text-xs text-slate-400">Strategy request submissions sent from the website contact modal.</p>
              </div>
            </div>

            {submissions.length === 0 ? (
              <div className="p-12 text-center bg-slate-900/90 rounded-3xl border border-slate-800 space-y-2">
                <Users className="h-8 w-8 text-slate-500 mx-auto" />
                <h3 className="text-sm font-bold text-slate-300">No client submissions yet</h3>
                <p className="text-xs text-slate-500">Inquiries submitted by website visitors will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {submissions.filter(s => subFilter === 'All' || s.status === subFilter).map((sub) => (
                  <div key={sub.id} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-bold text-white">{sub.full_name} ({sub.company || 'Direct Inquiry'})</span>
                      <span className="text-[10px] font-mono text-slate-500">{new Date(sub.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="text-xs text-slate-300 space-y-1 font-sans">
                      <div><strong className="text-slate-400">Email:</strong> {sub.email}</div>
                      <div><strong className="text-slate-400">Service:</strong> {sub.service_requested}</div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 mt-2 text-slate-300 font-mono text-[11px] leading-relaxed">{sub.message}</div>
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
