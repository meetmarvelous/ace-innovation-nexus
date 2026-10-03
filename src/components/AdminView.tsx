import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldCheck, Database, Users, Briefcase, Building2, Key, Lock, 
  LogOut, Plus, Trash2, CheckCircle2, AlertCircle, RefreshCw, Copy, Check, ExternalLink, Download, Search
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { caseStudies as localCaseStudies, associatedOrganizations as localOrganizations } from '../data';
import { CaseStudy, AssociatedOrganization } from '../types';
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

export default function AdminView() {
  const [activeTab, setActiveTab] = useState<'submissions' | 'case-studies' | 'organizations' | 'security'>('submissions');
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
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([
    {
      id: 'demo-sub-1',
      created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
      full_name: 'Dr. Samuel Adebayo',
      email: 's.adebayo@siloanhealth.org',
      company: 'Siloan Medical Center',
      service_requested: 'Tech Products',
      message: 'Interested in a patient portal and mobile appointment app for our clinic branches.',
      status: 'New'
    },
    {
      id: 'demo-sub-2',
      created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
      full_name: 'Kemi Balogun',
      email: 'kemi@academysuites.com',
      company: 'Academy Suites',
      service_requested: 'Digital Marketing',
      message: 'Looking for a 6-month social media growth and performance marketing campaign.',
      status: 'Contacted'
    }
  ]);
  const [subLoading, setSubLoading] = useState(false);
  const [subFilter, setSubFilter] = useState<'All' | 'New' | 'Contacted' | 'Closed'>('All');

  // Content States
  const [caseStudyList, setCaseStudyList] = useState<CaseStudy[]>(localCaseStudies);
  const [orgList, setOrgList] = useState<AssociatedOrganization[]>(localOrganizations);
  const [copiedSql, setCopiedSql] = useState(false);

  // Check existing session & invitation tokens
  useEffect(() => {
    // Check URL hash for invitation or recovery token
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
  }, []);

  // Fetch Submissions from Supabase if connected
  const fetchSubmissions = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) return;
    setSubLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        setSubmissions(data);
      }
    } catch (err: any) {
      console.warn('Could not fetch Supabase submissions:', err.message);
    } finally {
      setSubLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

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
      // Demo authentication mode when Supabase env vars are not set
      if (password === 'admin123' || email.length > 0) {
        setIsAuthenticated(true);
      } else {
        setAuthError('Please enter email and password (or use password "admin123" for demo mode).');
      }
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
        setAuthMsg("Password set successfully! Redirecting to dashboard...");
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

  const handleForgotPassword = async () => {
    if (!email) {
      setAuthError("Please enter your admin email in the field above first.");
      return;
    }
    triggerHaptic(15);
    setAuthLoading(true);
    setAuthError(null);
    setAuthMsg(null);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/#admin`,
      });
      if (error) {
        setAuthError(error.message);
      } else {
        setAuthMsg(`Password reset email sent to ${email}!`);
      }
    } else {
      setAuthMsg("Demo mode active: Configure Supabase credentials in .env to send real emails.");
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

  const updateSubmissionStatus = async (id: string, status: 'New' | 'Contacted' | 'Closed') => {
    triggerHaptic(15);
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('contact_submissions').update({ status }).eq('id', id);
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    triggerHaptic(25);
    setSubmissions(prev => prev.filter(s => s.id !== id));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('contact_submissions').delete().eq('id', id);
    }
  };

  const exportSubmissionsCSV = () => {
    triggerHaptic([30, 60, 30]);
    const headers = ['Date', 'Full Name', 'Email', 'Company', 'Service', 'Message', 'Status'];
    const rows = submissions.map(s => [
      new Date(s.created_at).toLocaleDateString(),
      `"${s.full_name}"`,
      `"${s.email}"`,
      `"${s.company || ''}"`,
      `"${s.service_requested}"`,
      `"${s.message.replace(/"/g, '""')}"`,
      s.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ace_nexus_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copySqlSchema = () => {
    triggerHaptic(20);
    const sqlScript = `-- Supabase Table Schema Setup for Ace Innovation Nexus
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

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert" ON public.contact_submissions FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admin full access" ON public.contact_submissions FOR ALL TO authenticated USING (true);`;

    navigator.clipboard.writeText(sqlScript);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const filteredSubmissions = submissions.filter(s => subFilter === 'All' || s.status === subFilter);

  // LOGIN & PASSWORD SETTING SCREEN IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md space-y-6 p-8 glass-panel-strong rounded-3xl border border-slate-200 shadow-xl text-left">
          
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#004aad] border border-blue-200">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 font-display">
              {isSettingNewPassword ? 'Set Account Password' : 'Admin Portal'}
            </h1>
            <p className="text-xs text-slate-500 font-sans">
              {isSettingNewPassword ? 'Complete your invitation or password reset setup' : 'Ace Innovation Nexus Content & Lead Management'}
            </p>
          </div>

          {!isSupabaseConfigured && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                <span>Supabase Not Connected Yet</span>
              </div>
              <p className="text-[11px] text-amber-700 leading-relaxed">
                You can log in using any email & password (or password <code className="bg-amber-100 px-1 rounded">admin123</code>) to preview the dashboard in Demo Mode.
              </p>
            </div>
          )}

          {authError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {authMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 cosmic-input"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5 font-mono uppercase text-[10px]">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 cosmic-input"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 rounded-xl font-bold text-white transition-all neon-btn haptic-press flex items-center justify-center gap-2 text-xs"
              >
                {authLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                <span>Save Password & Launch Dashboard</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsSettingNewPassword(false)}
                  className="text-xs font-bold text-[#004aad] hover:underline"
                >
                  Return to Standard Login
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5 font-mono uppercase text-[10px]">Admin Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aceinnovationnexus.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 cosmic-input"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-slate-700 font-bold font-mono uppercase text-[10px]">Password</label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[10px] text-[#004aad] hover:underline font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 cosmic-input"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 rounded-xl font-bold text-white transition-all neon-btn haptic-press flex items-center justify-center gap-2 text-xs"
              >
                {authLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                <span>Sign In to Dashboard</span>
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400 font-mono">
            SECURE ROW-LEVEL ENCRYPTED PORTAL
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD VIEW
  return (
    <div className="min-h-screen py-10 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#004aad] text-white shadow-md">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900 font-display">Control Center</h1>
              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                isSupabaseConfigured ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {isSupabaseConfigured ? 'SUPABASE LIVE' : 'DEMO MODE'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Manage Client Consultations, Portfolio & Associated Network</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchSubmissions}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-slate-900 text-xs font-bold transition-all haptic-press"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${subLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition-all haptic-press"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD TABS NAVIGATION */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => { triggerHaptic(10); setActiveTab('submissions'); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all haptic-press ${
            activeTab === 'submissions'
              ? 'bg-[#004aad] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Client Leads ({submissions.length})</span>
        </button>

        <button
          onClick={() => { triggerHaptic(10); setActiveTab('case-studies'); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all haptic-press ${
            activeTab === 'case-studies'
              ? 'bg-[#004aad] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Briefcase className="h-4 w-4" />
          <span>Case Studies ({caseStudyList.length})</span>
        </button>

        <button
          onClick={() => { triggerHaptic(10); setActiveTab('organizations'); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all haptic-press ${
            activeTab === 'organizations'
              ? 'bg-[#004aad] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building2 className="h-4 w-4" />
          <span>Network ({orgList.length})</span>
        </button>

        <button
          onClick={() => { triggerHaptic(10); setActiveTab('security'); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all haptic-press ${
            activeTab === 'security'
              ? 'bg-[#004aad] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Key className="h-4 w-4" />
          <span>Supabase Security & Schema</span>
        </button>
      </div>

      {/* TAB 1: CLIENT LEADS & SUBMISSIONS */}
      {activeTab === 'submissions' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {(['All', 'New', 'Contacted', 'Closed'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => { triggerHaptic(10); setSubFilter(filter); }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    subFilter === filter
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <button
              onClick={exportSubmissionsCSV}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm shrink-0"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          {filteredSubmissions.length === 0 ? (
            <div className="p-12 text-center glass-panel rounded-3xl border border-slate-200 space-y-2">
              <Users className="h-8 w-8 text-slate-400 mx-auto" />
              <h3 className="text-sm font-bold text-slate-700">No client submissions found</h3>
              <p className="text-xs text-slate-500">Inquiries submitted via the strategy modal will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredSubmissions.map((sub) => (
                <div 
                  key={sub.id} 
                  className="p-6 rounded-2xl glass-panel border border-slate-200 bg-white hover:border-[#004aad]/30 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-base font-black text-slate-900 font-display">{sub.full_name}</span>
                      {sub.company && <span className="ml-2 text-xs font-bold text-slate-500">({sub.company})</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-slate-400">
                        {new Date(sub.created_at).toLocaleString()}
                      </span>
                      <span className={`text-[10px] font-bold font-mono px-2.5 py-1 rounded-full border ${
                        sub.status === 'New' ? 'bg-blue-50 text-[#004aad] border-blue-200' :
                        sub.status === 'Contacted' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {sub.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">Contact Email</span>
                      <a href={`mailto:${sub.email}`} className="font-bold text-[#004aad] hover:underline">{sub.email}</a>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">Service Requested</span>
                      <span className="font-bold text-slate-800">{sub.service_requested}</span>
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1">Message Detail</span>
                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed font-sans">
                      {sub.message}
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => updateSubmissionStatus(sub.id, 'Contacted')}
                      className="px-3 py-1.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-700 text-xs font-bold hover:bg-amber-100 transition-all"
                    >
                      Mark Contacted
                    </button>
                    <button
                      onClick={() => updateSubmissionStatus(sub.id, 'Closed')}
                      className="px-3 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition-all"
                    >
                      Mark Closed
                    </button>
                    <button
                      onClick={() => deleteSubmission(sub.id)}
                      className="p-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                      title="Delete inquiry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CASE STUDIES MANAGER */}
      {activeTab === 'case-studies' && (
        <div className="space-y-6 text-left">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Portfolio Masterpieces ({caseStudyList.length})</h2>
            <button
              onClick={() => alert("To add a new case study, insert a record into the 'case_studies' table in Supabase or edit src/data.ts.")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#004aad] text-white text-xs font-bold hover:bg-blue-700 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Add Case Study</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudyList.map((cs) => (
              <div key={cs.id} className="p-5 rounded-2xl glass-panel border border-slate-200 bg-white flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono text-[#004aad] uppercase">{cs.category}</span>
                    <span className="text-[10px] font-mono text-slate-400">ID: {cs.id}</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 font-display">{cs.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{cs.summary}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Client: {cs.client}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                      Published ✓
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ASSOCIATED ORGANISATIONS MANAGER */}
      {activeTab === 'organizations' && (
        <div className="space-y-6 text-left">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Associated Organizations ({orgList.length})</h2>
            <button
              onClick={() => alert("To add an organization, insert a record into 'associated_organizations' in Supabase or edit src/data.ts.")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#004aad] text-white text-xs font-bold hover:bg-blue-700 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Add Organization</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {orgList.map((org) => (
              <div key={org.id} className="p-4 rounded-2xl glass-panel border border-slate-200 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">{org.category}</span>
                  <a href={org.link} target="_blank" rel="noopener noreferrer" className="text-[#004aad] hover:underline text-xs flex items-center gap-1 font-mono">
                    <span>Link</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{org.name}</h3>
                <p className="text-[11px] text-slate-500">{org.location}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SUPABASE SECURITY & SCHEMA HELPER */}
      {activeTab === 'security' && (
        <div className="space-y-8 text-left max-w-4xl mx-auto">
          
          {/* SECURITY SETTINGS EXPLANATION CARD */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-200 bg-white space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-xl bg-blue-50 text-[#004aad]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 font-display">Supabase Security Settings Guide</h3>
                <p className="text-xs text-slate-500">Recommended choices for project setup modal</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>1. Enable Data API</span>
                </div>
                <span className="inline-block px-2 py-0.5 text-[9px] font-mono font-bold bg-emerald-200 text-emerald-900 rounded">
                  KEEP CHECKED [✓]
                </span>
                <p className="text-[11px] text-emerald-900/80 leading-relaxed">
                  Required for <code className="bg-emerald-100 px-1">supabase-js</code> to query and update your database from the client application.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-red-800">
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                  <span>2. Automatically Expose New Tables</span>
                </div>
                <span className="inline-block px-2 py-0.5 text-[9px] font-mono font-bold bg-red-200 text-red-900 rounded">
                  UNCHECK THIS [ ]
                </span>
                <p className="text-[11px] text-red-900/80 leading-relaxed">
                  Leaving this checked exposes all newly created tables to the public API automatically. Unchecking enforces manual access control.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>3. Enable Automatic RLS</span>
                </div>
                <span className="inline-block px-2 py-0.5 text-[9px] font-mono font-bold bg-emerald-200 text-emerald-900 rounded">
                  CHECK THIS [✓]
                </span>
                <p className="text-[11px] text-emerald-900/80 leading-relaxed">
                  Automatically enables Row Level Security on all new tables in the public schema to prevent accidental public data leaks.
                </p>
              </div>
            </div>
          </div>

          {/* SQL SCHEMA SETUP BOX */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-200 bg-white space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-black text-slate-900 font-display">Supabase SQL Editor Migration Script</h3>
                <p className="text-xs text-slate-500">Copy & paste this into your Supabase SQL Editor to initialize tables & security policies.</p>
              </div>
              <button
                onClick={copySqlSchema}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shrink-0"
              >
                {copiedSql ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
              </button>
            </div>

            <div className="relative">
              <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto max-h-72 border border-slate-800">
                {`-- Run this script in your Supabase SQL Editor
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

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert" ON public.contact_submissions FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admin full access" ON public.contact_submissions FOR ALL TO authenticated USING (true);`}
              </pre>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
