import React, { useState, useEffect } from 'react';
import { 
  NavigationTab, 
  ThemeMode, 
  ThemeAccent, 
  UserProfile 
} from './types';
import { CURRENT_USER } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingScreen } from './screens/LandingScreen';
import { CoursesScreen } from './screens/CoursesScreen';
import { LearnerDashboardScreen } from './screens/LearnerDashboardScreen';
import { CertificationScreen } from './screens/CertificationScreen';
import { AuthPortalScreen } from './screens/AuthPortalScreen';
import { LoginScreen } from './screens/LoginScreen';
import { NotificationModal } from './components/NotificationModal';
import { CohortRegisterModal } from './components/CohortRegisterModal';
import { AdvisorBriefingModal } from './components/AdvisorBriefingModal';
import { InfoModal } from './components/InfoModal';
import { auth, getUserProfileFromDb, saveUserProfileToDb, db } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Lock, Moon, Sun, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('landing-overview');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [themeAccent, setThemeAccent] = useState<ThemeAccent>('classic');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isFirebaseAuthenticated, setIsFirebaseAuthenticated] = useState(false);
  
  // Modals state
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isCohortModalOpen, setIsCohortModalOpen] = useState(false);
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<'guidelines' | 'privacy' | 'helpdesk' | null>(null);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setIsFirebaseAuthenticated(true);
        // Attempt to fetch fresh profile from Firestore database
        try {
          const stored = await getUserProfileFromDb(fbUser.uid);
          if (stored) {
            setCurrentUser({
              id: stored.uid,
              name: stored.displayName,
              email: stored.email,
              role: stored.role,
              department: stored.department,
              ministry: stored.ministry,
              clearanceLevel: (stored.clearanceLevel as UserProfile['clearanceLevel']) || 'Secret',
              avatarUrl: fbUser.photoURL || CURRENT_USER.avatarUrl,
              govId: `GOV-${stored.uid.slice(-6).toUpperCase()}-2026`,
              completionRate: stored.completionRate,
              activeModules: 3,
              earnedCredentials: 2,
            });
          }
        } catch (err) {
          console.warn('Could not retrieve existing user from Firestore:', err);
        }
      } else {
        setIsFirebaseAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync theme mode to document element
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeMode]);

  // Sync theme accent to document attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-accent', themeAccent);
  }, [themeAccent]);

  const handleToggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleChangeAccent = (accent: ThemeAccent) => {
    setThemeAccent(accent);
  };

  const handleSelectTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Sign out error:', e);
    }
    setIsFirebaseAuthenticated(false);
    setCurrentUser(null);
  };

  // Strict Auth Gate: Block the entire website until user completes login or registration
  if (!currentUser) {
    return (
      <LoginScreen
        currentUser={null}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setCurrentTab('learner-dashboard');
        }}
        onNavigateTab={() => {}}
        isFirebaseAuthenticated={isFirebaseAuthenticated}
        onLogout={handleLogout}
        isGateMode={true}
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface)] text-[var(--on-surface)] transition-colors duration-200 selection:bg-[var(--primary)] selection:text-white">
      {/* Global Navigation Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
        themeAccent={themeAccent}
        onChangeAccent={handleChangeAccent}
        currentUser={currentUser}
        unreadNotificationsCount={3}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenCohortModal={() => setIsCohortModalOpen(true)}
      />

      {/* Main View Container (with header offset) */}
      <main className="flex-1 w-full pt-20">
        {currentTab === 'landing-overview' && (
          <LandingScreen
            onNavigateTab={handleSelectTab}
            onOpenCohortModal={() => setIsCohortModalOpen(true)}
            onOpenAdvisorModal={() => setIsAdvisorModalOpen(true)}
            themeMode={themeMode}
          />
        )}

        {currentTab === 'courses-modules' && (
          <CoursesScreen />
        )}

        {currentTab === 'learner-dashboard' && (
          <LearnerDashboardScreen
            currentUser={currentUser}
            onNavigateTab={handleSelectTab}
          />
        )}

        {currentTab === 'certification' && (
          <CertificationScreen />
        )}

        {currentTab === 'auth-portal' && (
          <AuthPortalScreen
            currentUser={currentUser}
            onSelectUser={setCurrentUser}
            onNavigateTab={handleSelectTab}
          />
        )}

        {currentTab === 'login' && (
          <LoginScreen
            currentUser={currentUser}
            onLoginSuccess={(user) => {
              setCurrentUser(user);
              handleSelectTab('learner-dashboard');
            }}
            onNavigateTab={handleSelectTab}
            isFirebaseAuthenticated={isFirebaseAuthenticated}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Institutional Global Footer */}
      <Footer
        onOpenGuidelines={() => setInfoModalType('guidelines')}
        onOpenPrivacy={() => setInfoModalType('privacy')}
        onOpenHelpdesk={() => setInfoModalType('helpdesk')}
      />

      {/* Modals & Dialogs */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onNavigateToTab={handleSelectTab}
      />

      <CohortRegisterModal
        isOpen={isCohortModalOpen}
        onClose={() => setIsCohortModalOpen(false)}
        userId={currentUser ? currentUser.id : 'guest_unregistered'}
      />

      <AdvisorBriefingModal
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
      />

      <InfoModal
        type={infoModalType}
        onClose={() => setInfoModalType(null)}
      />
    </div>
  );
}
