import React, { useState } from 'react';
import { 
  NavigationTab, 
  ThemeMode, 
  ThemeAccent, 
  UserProfile 
} from '../types';
import { SkillBridgeLogo } from './SkillBridgeLogo';
import { 
  Sun, 
  Moon, 
  Bell, 
  Palette, 
  Menu, 
  X, 
  ShieldCheck, 
  Check, 
  Sparkles,
  ExternalLink,
  LogIn,
  UserPlus
} from 'lucide-react';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  themeAccent: ThemeAccent;
  onChangeAccent: (accent: ThemeAccent) => void;
  currentUser: UserProfile | null;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onOpenCohortModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  themeMode,
  onToggleTheme,
  themeAccent,
  onChangeAccent,
  currentUser,
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenCohortModal,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAccentPicker, setShowAccentPicker] = useState(false);

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'landing-overview', label: 'Landing / Overview' },
    { id: 'courses-modules', label: 'Courses & Modules' },
    { id: 'learner-dashboard', label: 'Learner Dashboard' },
    { id: 'certification', label: 'Certification' },
    { id: 'auth-portal', label: 'Auth Portal' },
    { id: 'login', label: currentUser ? 'My Account & DB' : 'Sign In / Register' },
  ];

  const accents: { id: ThemeAccent; name: string; primaryColor: string; secondaryColor: string }[] = [
    { id: 'classic', name: 'Ministry Classic', primaryColor: '#0057A8', secondaryColor: '#2ECC71' },
    { id: 'teal', name: 'Sovereign Teal', primaryColor: '#0F766E', secondaryColor: '#10B981' },
    { id: 'amber', name: 'Executive Amber', primaryColor: '#1D4ED8', secondaryColor: '#F59E0B' },
    { id: 'cyber', name: 'Cyber Emerald', primaryColor: '#4338CA', secondaryColor: '#34D399' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--surface)]/90 backdrop-blur-xl border-b border-[var(--outline-variant)]/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-colors duration-200">
      <div className="h-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Brand & Emblem */}
        <div 
          onClick={() => onSelectTab('landing-overview')}
          className="cursor-pointer group select-none py-1"
        >
          <SkillBridgeLogo size="md" showTagline={true} />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 p-1 bg-[var(--surface-container-low)] rounded-xl border border-[var(--outline-variant)]/40 shadow-inner">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[var(--primary-container)] text-[var(--on-primary)] shadow-sm font-semibold'
                    : 'text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] hover:bg-[var(--surface-container)]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Tools & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Light / Dark Mode Toggle Switch */}
          <div 
            onClick={onToggleTheme}
            className="inline-flex items-center p-1 bg-[var(--surface-container)] rounded-full border border-[var(--outline-variant)]/50 shadow-sm cursor-pointer select-none transition-colors"
            role="button"
            tabIndex={0}
            aria-label="Toggle light and dark mode"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggleTheme();
              }
            }}
          >
            <button 
              type="button" 
              aria-label="Light mode" 
              className={`flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 pointer-events-none ${
                themeMode === 'light' 
                  ? 'bg-[var(--surface-container-lowest)] text-amber-500 shadow-sm' 
                  : 'text-[var(--on-surface-variant)]'
              }`}
            >
              <Sun className="w-4 h-4" />
            </button>
            <button 
              type="button" 
              aria-label="Dark mode" 
              className={`flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 pointer-events-none ${
                themeMode === 'dark' 
                  ? 'bg-[var(--surface-container-high)] text-[var(--primary-fixed-dim)] shadow-sm' 
                  : 'text-[var(--on-surface-variant)]'
              }`}
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>

          {/* Theme Palette / Changing Options Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowAccentPicker(!showAccentPicker)}
              aria-label="Customize theme accent"
              title="Change Theme Accent"
              className="p-2 text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] hover:bg-[var(--surface-container)] rounded-lg border border-[var(--outline-variant)]/40 transition-colors flex items-center justify-center"
            >
              <Palette className="w-[18px] h-[18px]" />
            </button>

            {showAccentPicker && (
              <div className="absolute right-0 mt-2 w-56 p-3 bg-[var(--surface-container-lowest)] rounded-xl border border-[var(--outline-variant)] shadow-xl z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--outline-variant)]/40">
                  <span className="text-xs font-bold text-[var(--on-surface)] uppercase tracking-wider">
                    Institutional Themes
                  </span>
                  <span className="text-[10px] text-[var(--on-surface-variant)]">Select Accent</span>
                </div>
                <div className="space-y-1.5">
                  {accents.map((acc) => {
                    const isSelected = themeAccent === acc.id;
                    return (
                      <button
                        key={acc.id}
                        type="button"
                        onClick={() => {
                          onChangeAccent(acc.id);
                          setShowAccentPicker(false);
                        }}
                        className={`w-full px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          isSelected 
                            ? 'bg-[var(--surface-container)] font-semibold text-[var(--on-surface)]' 
                            : 'hover:bg-[var(--surface-container-low)] text-[var(--on-surface-variant)]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-1">
                            <span 
                              className="w-3.5 h-3.5 rounded-full border border-white/40" 
                              style={{ backgroundColor: acc.primaryColor }}
                            />
                            <span 
                              className="w-3.5 h-3.5 rounded-full border border-white/40" 
                              style={{ backgroundColor: acc.secondaryColor }}
                            />
                          </div>
                          <span>{acc.name}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[var(--secondary)]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Notifications Button */}
          <div className="relative">
            <button 
              type="button"
              onClick={onOpenNotifications}
              aria-label="Notifications" 
              className="p-2 text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] hover:bg-[var(--surface-container)] rounded-lg border border-[var(--outline-variant)]/40 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--error)] ring-2 ring-[var(--surface)]"></span>
              )}
            </button>
          </div>

          <div className="h-8 w-[1px] bg-[var(--outline-variant)]/40 mx-1 hidden sm:block"></div>

          {/* User Profile Capsule or Sign In / Register Button */}
          {currentUser ? (
            <div 
              onClick={() => onSelectTab('learner-dashboard')}
              className="flex items-center gap-2 pl-1 cursor-pointer group"
              title="View Learner Profile & Competencies"
            >
              <div className="hidden md:flex flex-col text-right">
                <span className="text-sm font-semibold text-[var(--on-surface)] leading-tight group-hover:text-[var(--primary)] transition-colors">
                  {currentUser.name}
                </span>
                <span className="text-[11px] text-[var(--secondary)] font-semibold flex items-center justify-end gap-1">
                  <ShieldCheck className="w-3 h-3 inline" />
                  {currentUser.role}
                </span>
              </div>
              <div className="relative">
                <img 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover border border-[var(--outline-variant)] group-hover:ring-2 group-hover:ring-[var(--primary)] transition-all" 
                  src={currentUser.avatarUrl} 
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[var(--secondary-container)] border-2 border-[var(--surface)] rounded-full"></span>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onSelectTab('login')}
              className="px-3.5 py-1.5 rounded-xl bg-[var(--primary)] text-white text-xs sm:text-sm font-bold hover:opacity-95 shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Register</span>
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)] transition-colors ml-1"
            aria-label="Open mobile navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Responsive Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[var(--surface)] border-b border-[var(--outline-variant)] px-4 py-4 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--outline-variant)]/40">
            <span className="text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-wider">
              Skill Bridge Navigation
            </span>
            {currentUser && (
              <span className="text-xs font-mono text-[var(--primary)] font-semibold">
                {currentUser.govId}
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[var(--primary-container)] text-[var(--on-primary)] font-semibold'
                      : 'text-[var(--on-surface)] hover:bg-[var(--surface-container)]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[var(--outline-variant)]/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--on-surface-variant)]">Theme Accent:</span>
              <div className="flex items-center gap-1.5">
                {accents.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => onChangeAccent(acc.id)}
                    className={`w-5 h-5 rounded-full border-2 ${
                      themeAccent === acc.id ? 'border-[var(--on-surface)] scale-110' : 'border-transparent opacity-70'
                    }`}
                    style={{ backgroundColor: acc.primaryColor }}
                    title={acc.name}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenCohortModal();
              }}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[var(--secondary)] text-white hover:opacity-90"
            >
              Cohort Intake
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

