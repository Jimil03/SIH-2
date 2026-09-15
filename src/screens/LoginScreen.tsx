import React, { useState, useEffect } from 'react';
import { 
  auth, 
  googleProvider, 
  saveUserProfileToDb, 
  getUserProfileFromDb, 
  StoredUserProfile 
} from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { UserProfile, NavigationTab, ThemeMode } from '../types';
import { AVAILABLE_PROFILES } from '../data/mockData';
import { SkillBridgeLogo } from '../components/SkillBridgeLogo';
import { 
  ShieldCheck, 
  Mail, 
  KeyRound, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Award,
  BookOpen,
  User,
  Eye,
  EyeOff,
  Sun,
  Moon,
  ChevronDown,
  ArrowRight,
  Fingerprint
} from 'lucide-react';

interface LoginScreenProps {
  currentUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  onNavigateTab: (tab: NavigationTab) => void;
  isFirebaseAuthenticated: boolean;
  onLogout: () => void;
  isGateMode?: boolean;
  themeMode?: ThemeMode;
  onToggleTheme?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  themeMode = 'light',
  onToggleTheme,
}) => {
  // Mode: 'login' | 'register'
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Registration State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regMinistry, setRegMinistry] = useState('Ministry for Digital Transformation');
  const [regRole, setRegRole] = useState('Digital Transformation Officer');
  const [regClearance, setRegClearance] = useState<UserProfile['clearanceLevel']>('Secret');
  const [regPassword, setRegPassword] = useState('');

  // Sign In State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // UI Helper State
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showDemoSelector, setShowDemoSelector] = useState(false);

  // Clear errors when switching modes
  useEffect(() => {
    setStatusMessage(null);
  }, [authMode]);

  // Handle Google Single Sign-On
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setStatusMessage(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;

      let dbProfile = await getUserProfileFromDb(fbUser.uid);
      
      if (!dbProfile) {
        dbProfile = {
          uid: fbUser.uid,
          email: fbUser.email || 'civil.servant@skillbridge.gov',
          displayName: fbUser.displayName || 'Authorized Civil Servant',
          role: 'Digital Innovation Officer',
          department: 'Department of Digital Infrastructure',
          ministry: 'Ministry for Digital Transformation',
          clearanceLevel: 'Secret',
          xp: 150,
          streakDays: 1,
          completionRate: 15,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await saveUserProfileToDb(dbProfile);
      }

      const appProfile: UserProfile = {
        id: dbProfile.uid,
        name: dbProfile.displayName,
        email: dbProfile.email,
        role: dbProfile.role,
        department: dbProfile.department,
        ministry: dbProfile.ministry,
        clearanceLevel: dbProfile.clearanceLevel as UserProfile['clearanceLevel'],
        avatarUrl: fbUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        govId: `GOV-${fbUser.uid.substring(0, 6).toUpperCase()}-2026`,
        completionRate: dbProfile.completionRate,
        activeModules: 1,
        earnedCredentials: 0,
      };

      onLoginSuccess(appProfile);
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      setStatusMessage({ 
        type: 'error', 
        text: err.message || 'Google sign-in could not be completed. Please try with email or demo profile.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Regular Sign-In
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter your registered email address.' });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    try {
      const generatedUid = `usr_${loginEmail.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`;
      
      let profile = await getUserProfileFromDb(generatedUid);
      if (!profile) {
        profile = {
          uid: generatedUid,
          email: loginEmail,
          displayName: loginEmail.split('@')[0].replace('.', ' ').toUpperCase(),
          role: 'Digital Systems Analyst',
          department: 'National Digital Operations Center',
          ministry: 'Ministry for Digital Transformation',
          clearanceLevel: 'Secret',
          xp: 850,
          streakDays: 4,
          completionRate: 45,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await saveUserProfileToDb(profile);
      }

      const appProfile: UserProfile = {
        id: profile.uid,
        name: profile.displayName,
        email: profile.email,
        role: profile.role,
        department: profile.department,
        ministry: profile.ministry,
        clearanceLevel: profile.clearanceLevel as UserProfile['clearanceLevel'],
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        govId: `GOV-${profile.uid.slice(-6).toUpperCase()}-2026`,
        completionRate: profile.completionRate,
        activeModules: 2,
        earnedCredentials: 1,
      };

      onLoginSuccess(appProfile);
    } catch (err: any) {
      console.error('Sign in error:', err);
      setStatusMessage({
        type: 'error',
        text: 'Sign in failed. Please verify your connection or try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Fresh Account Registration (Email & Password)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = regEmail.trim();
    if (!cleanEmail) {
      setStatusMessage({ type: 'error', text: 'Please enter your official email address.' });
      return;
    }
    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setStatusMessage({ type: 'error', text: 'Please create a password with at least 6 characters.' });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    try {
      const userUid = `usr_${cleanEmail.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`;
      const govCode = `GOV-${Math.floor(100000 + Math.random() * 900000)}-2026`;

      // Derive display name from email prefix if name not provided
      const emailPrefix = cleanEmail.split('@')[0];
      const derivedName = emailPrefix
        .replace(/[._-]/g, ' ')
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ') || 'Civil Servant';

      const initialProfile: StoredUserProfile = {
        uid: userUid,
        email: cleanEmail,
        displayName: derivedName,
        role: 'Civil Service Officer',
        department: 'Institutional Learning Directorate',
        ministry: 'Ministry for Digital Transformation',
        clearanceLevel: 'Official',
        xp: 150,
        streakDays: 1,
        completionRate: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await saveUserProfileToDb(initialProfile);

      const appProfile: UserProfile = {
        id: initialProfile.uid,
        name: initialProfile.displayName,
        email: initialProfile.email,
        role: initialProfile.role,
        department: initialProfile.department,
        ministry: initialProfile.ministry,
        clearanceLevel: initialProfile.clearanceLevel as UserProfile['clearanceLevel'],
        avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400`,
        govId: govCode,
        completionRate: 0,
        activeModules: 1,
        earnedCredentials: 0,
      };

      onLoginSuccess(appProfile);
    } catch (err: any) {
      console.error('Registration failed:', err);
      setStatusMessage({
        type: 'error',
        text: 'Unable to initialize account. Please check network connectivity and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Quick Demo Access for immediate exploration
  const handleDemoSignIn = async (profile: UserProfile) => {
    setIsLoading(true);
    try {
      const dbProfile: StoredUserProfile = {
        uid: profile.id,
        email: `${profile.id}@skillbridge.gov`,
        displayName: profile.name,
        role: profile.role,
        department: profile.department,
        ministry: profile.ministry,
        clearanceLevel: profile.clearanceLevel,
        xp: profile.completionRate * 25,
        streakDays: 12,
        completionRate: profile.completionRate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      await saveUserProfileToDb(dbProfile);
      onLoginSuccess(profile);
    } catch (err: any) {
      onLoginSuccess(profile);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[var(--surface)] flex flex-col lg:flex-row overflow-y-auto select-none">
      
      {/* LEFT COLUMN: Premium Institutional Brand Showcase */}
      <div className="lg:w-5/12 xl:w-1/2 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden shrink-0 min-h-[500px] lg:min-h-screen">
        
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Branding */}
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-3">
            <SkillBridgeLogo size="lg" variant="horizontal" inverted={true} showTagline={true} />
          </div>
        </div>

        {/* Center Editorial Pitch */}
        <div className="relative z-10 my-8 lg:my-auto space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-slate-200 text-xs font-semibold backdrop-blur-sm border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>National Digital Transformation Program</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
            Empowering public sector leaders for the digital era.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Standardizing digital competencies across ministries with sovereign cloud curricula, ethical AI governance, and verifiable executive credentials.
          </p>

          {/* Value Highlights */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white/10 text-emerald-400 mt-0.5 shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">Verifiable Diplomas & Credentials</h2>
                <p className="text-xs text-slate-400 leading-normal">Tamper-proof certifications recognized across national agencies.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white/10 text-cyan-400 mt-0.5 shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">Interactive Policy Simulations</h2>
                <p className="text-xs text-slate-400 leading-normal">Hands-on crisis response and sovereign cloud deployment labs.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white/10 text-indigo-400 mt-0.5 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">Executive Clearance Framework</h2>
                <p className="text-xs text-slate-400 leading-normal">Role-tailored tracks for directors, policy analysts, and officers.</p>
              </div>
            </div>
          </div>

          {/* Institutional Testimonial Card */}
          <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-lg">
            <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
              "Skill Bridge provides the structural learning framework our teams needed to modernize public infrastructure with confidence."
            </p>
            <div className="flex items-center gap-2.5 mt-3 pt-2 border-t border-white/10">
              <div className="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center text-[10px] font-bold text-emerald-300">
                DI
              </div>
              <span className="text-[11px] font-medium text-slate-400">
                Directorate of Digital Infrastructure & AI Strategy
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Assurance */}
        <div className="relative z-10 pt-4 flex items-center justify-between text-xs text-slate-400 border-t border-white/10">
          <span className="flex items-center gap-1.5">
            <Fingerprint className="w-4 h-4 text-emerald-400" />
            <span>Encrypted Civil Service Identity Gateway</span>
          </span>
          <span>© 2026 Skill Bridge</span>
        </div>

      </div>

      {/* RIGHT COLUMN: Spacious Upward-Aligned Form with Natural Scrolling */}
      <div className="lg:w-7/12 xl:w-1/2 flex flex-col justify-start p-6 sm:p-10 lg:p-12 overflow-y-auto">
        
        {/* Top Navigation Strip */}
        <div className="flex items-center justify-between w-full max-w-md mx-auto mb-6 shrink-0">
          {/* Brand displayed on mobile / tablet */}
          <div className="flex lg:hidden items-center gap-2">
            <SkillBridgeLogo size="sm" showTagline={true} />
          </div>

          <div className="ml-auto flex items-center gap-2">
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className="p-2 rounded-xl border border-[var(--outline-variant)] hover:bg-[var(--surface-container)] text-[var(--on-surface-variant)] transition-all cursor-pointer shadow-xs"
                title="Toggle Theme"
              >
                {themeMode === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Main Authentication Card */}
        <div className="w-full max-w-md mx-auto space-y-5">
          
          {/* Prominent Separate Action Buttons for Sign In & Register */}
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-[var(--surface-container)] border border-[var(--outline-variant)]/40 shadow-xs">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                authMode === 'login'
                  ? 'bg-[var(--primary)] text-white shadow-sm'
                  : 'bg-transparent text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] hover:bg-[var(--surface-container-high)]/60'
              }`}
            >
              <KeyRound className="w-4 h-4 shrink-0" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                authMode === 'register'
                  ? 'bg-[var(--primary)] text-white shadow-sm'
                  : 'bg-transparent text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] hover:bg-[var(--surface-container-high)]/60'
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span>Register Account</span>
            </button>
          </div>

          {/* Header Title directly beneath the selection */}
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--on-surface)] tracking-tight">
              {authMode === 'login' ? 'Civil Service Portal Sign In' : 'Civil Servant Registration'}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--on-surface-variant)]">
              {authMode === 'login' 
                ? 'Enter your institutional credentials below to access your coursework and certifications.' 
                : 'Fill in your official details below to establish your verified public sector learner profile.'}
            </p>
          </div>

          {/* Feedback Message */}
          {statusMessage && (
            <div className={`p-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center gap-2.5 ${
              statusMessage.type === 'success' 
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-800 dark:text-emerald-200' 
                : 'bg-rose-500/15 border-rose-500/30 text-rose-800 dark:text-rose-200'
            }`}>
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* SIGN IN FORM */}
          {authMode === 'login' && (
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[var(--on-surface)] mb-1.5">
                  Official Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="officer@agency.gov"
                    className="w-full pl-10 pr-3 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm bg-[var(--surface-container-low)] border border-[var(--outline-variant)] text-[var(--on-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs sm:text-sm font-semibold text-[var(--on-surface)]">
                    Password
                  </label>
                  <span className="text-xs text-[var(--primary)] hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm bg-[var(--surface-container-low)] border border-[var(--outline-variant)] text-[var(--on-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 text-[var(--on-surface-variant)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[var(--outline-variant)] text-[var(--primary)] focus:ring-[var(--primary)]"
                  />
                  <span>Remember me on this workstation</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[var(--primary)] text-white text-sm font-bold hover:opacity-90 flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                {isLoading ? (
                  <span>Signing in...</span>
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* CREATE ACCOUNT FORM (Email and Password Only) */}
          {authMode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[var(--on-surface)] mb-1.5">
                  Official Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@agency.gov"
                    className="w-full pl-10 pr-3 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm bg-[var(--surface-container-low)] border border-[var(--outline-variant)] text-[var(--on-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                  />
                </div>
                <p className="text-[11px] text-[var(--on-surface-variant)] mt-1">
                  Enter your official ministry or institutional email.
                </p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[var(--on-surface)] mb-1.5">
                  Create Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Create a password (min. 6 characters)"
                    className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm bg-[var(--surface-container-low)] border border-[var(--outline-variant)] text-[var(--on-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-[var(--on-surface-variant)] mt-1">
                  Choose a secure password with at least 6 characters.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[var(--primary)] text-white text-xs sm:text-sm font-bold hover:opacity-90 flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer mt-1"
              >
                {isLoading ? (
                  <span>Initializing profile...</span>
                ) : (
                  <>
                    <span>Create Official Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Quick Demo Access Collapsible */}
          <div className="pt-3 border-t border-[var(--outline-variant)]/40">
            <button
              type="button"
              onClick={() => setShowDemoSelector(!showDemoSelector)}
              className="w-full text-center text-xs text-[var(--on-surface-variant)] hover:text-[var(--primary)] flex items-center justify-center gap-1.5 transition-colors cursor-pointer py-1"
            >
              <span>Exploring the platform? Instant Test Profile Access</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDemoSelector ? 'rotate-180' : ''}`} />
            </button>

            {showDemoSelector && (
              <div className="mt-3 grid grid-cols-3 gap-2.5 animate-in fade-in duration-200">
                {AVAILABLE_PROFILES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleDemoSignIn(p)}
                    className="p-2.5 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)] hover:border-[var(--primary)] hover:bg-[var(--surface-container)] transition-all text-left flex flex-col items-center text-center cursor-pointer group shadow-xs"
                  >
                    <img 
                      src={p.avatarUrl} 
                      alt={p.name} 
                      className="w-8 h-8 rounded-full object-cover mb-1.5 group-hover:scale-105 transition-transform ring-2 ring-[var(--outline-variant)]/40" 
                    />
                    <span className="text-xs font-bold text-[var(--on-surface)] truncate w-full">
                      {p.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-[var(--on-surface-variant)] truncate w-full">
                      {p.clearanceLevel}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer Legal Directives */}
        <div className="w-full max-w-md mx-auto pt-8 pb-4 text-center">
          <p className="text-xs text-[var(--on-surface-variant)] leading-normal">
            By proceeding, you agree to official Public Sector Data Directives and Skill Bridge Terms of Governance.
          </p>
        </div>

      </div>

    </div>
  );
};
