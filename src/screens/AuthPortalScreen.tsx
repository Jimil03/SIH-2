import React, { useState } from 'react';
import { UserProfile, NavigationTab } from '../types';
import { AVAILABLE_PROFILES } from '../data/mockData';
import { 
  ShieldCheck, 
  KeyRound, 
  CreditCard, 
  Fingerprint, 
  Building2, 
  Lock, 
  CheckCircle, 
  ArrowRight, 
  UserCheck, 
  Laptop, 
  ShieldAlert 
} from 'lucide-react';

interface AuthPortalProps {
  currentUser: UserProfile | null;
  onSelectUser: (user: UserProfile) => void;
  onNavigateTab: (tab: NavigationTab) => void;
}

export const AuthPortalScreen: React.FC<AuthPortalProps> = ({
  currentUser,
  onSelectUser,
  onNavigateTab,
}) => {
  const [authMethod, setAuthMethod] = useState<'sso' | 'smartcard' | 'fido'>('sso');
  const [ssoDomain, setSsoDomain] = useState('ministry-transform.gov');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');

  const handleSimulateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setAuthSuccessMsg('');

    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccessMsg(`SSO Session authenticated under federated realm: ${ssoDomain}`);
    }, 700);
  };

  return (
    <div className="w-full min-h-screen py-8 sm:py-12 bg-[var(--surface)] text-[var(--on-surface)] transition-colors">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-container)] text-[var(--primary)] text-xs font-semibold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Federal Zero-Trust Identity Gateway</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--on-surface)] tracking-tight">
                Ministry Single Sign-On (SSO) Portal
              </h1>
              <p className="text-sm sm:text-base text-[var(--on-surface-variant)] mt-2 max-w-2xl leading-relaxed">
                Federated authentication across 34 inter-ministerial agencies. Compliant with NIST 800-63-3 Assurance Level 3 and Sovereign Cloud ID protocol.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('login')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs sm:text-sm font-bold shadow-md hover:opacity-95 shrink-0 self-start sm:self-auto"
            >
              <span>Cloud Login & Database</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Authentication Form (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-[var(--surface-container-low)] p-6 sm:p-8 rounded-2xl border border-[var(--outline-variant)]/40 shadow-sm">
              <h2 className="text-lg font-bold text-[var(--on-surface)] mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--secondary)]" />
                <span>Select Authentication Mechanism</span>
              </h2>

              {/* Method Selector Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setAuthMethod('sso')}
                  className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    authMethod === 'sso'
                      ? 'bg-[var(--surface)] border-[var(--primary)] shadow-sm'
                      : 'bg-[var(--surface-container)] border-transparent text-[var(--on-surface-variant)] hover:bg-[var(--surface)]'
                  }`}
                >
                  <Building2 className={`w-5 h-5 mb-2 ${authMethod === 'sso' ? 'text-[var(--primary)]' : ''}`} />
                  <div>
                    <div className="text-xs font-bold text-[var(--on-surface)]">Ministerial SSO</div>
                    <div className="text-[10px] text-[var(--on-surface-variant)]">Active Directory / SAML</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAuthMethod('smartcard')}
                  className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    authMethod === 'smartcard'
                      ? 'bg-[var(--surface)] border-[var(--primary)] shadow-sm'
                      : 'bg-[var(--surface-container)] border-transparent text-[var(--on-surface-variant)] hover:bg-[var(--surface)]'
                  }`}
                >
                  <CreditCard className={`w-5 h-5 mb-2 ${authMethod === 'smartcard' ? 'text-[var(--primary)]' : ''}`} />
                  <div>
                    <div className="text-xs font-bold text-[var(--on-surface)]">PIV / CAC Card</div>
                    <div className="text-[10px] text-[var(--on-surface-variant)]">Hardware Smartcard</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAuthMethod('fido')}
                  className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    authMethod === 'fido'
                      ? 'bg-[var(--surface)] border-[var(--primary)] shadow-sm'
                      : 'bg-[var(--surface-container)] border-transparent text-[var(--on-surface-variant)] hover:bg-[var(--surface)]'
                  }`}
                >
                  <Fingerprint className={`w-5 h-5 mb-2 ${authMethod === 'fido' ? 'text-[var(--primary)]' : ''}`} />
                  <div>
                    <div className="text-xs font-bold text-[var(--on-surface)]">Sovereign FIDO2</div>
                    <div className="text-[10px] text-[var(--on-surface-variant)]">Biometric PKI Key</div>
                  </div>
                </button>
              </div>

              {/* Dynamic Auth Form */}
              <form onSubmit={handleSimulateLogin} className="space-y-4">
                {authMethod === 'sso' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--on-surface)] mb-1">
                        Select Federated Ministry Domain
                      </label>
                      <select
                        value={ssoDomain}
                        onChange={(e) => setSsoDomain(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-xl border border-[var(--outline-variant)] bg-[var(--surface)] text-[var(--on-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      >
                        <option value="ministry-transform.gov">Ministry for Digital Transformation (ministry-transform.gov)</option>
                        <option value="defense-cyber.gov">Ministry of Defense & Cyber Governance (defense-cyber.gov)</option>
                        <option value="council-innovation.gov">Federal Council for Digital Innovation (council-innovation.gov)</option>
                        <option value="public-health.gov">Federal Health & Emergency Services Directorate (public-health.gov)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[var(--on-surface)] mb-1">
                        Government Employee ID / Email
                      </label>
                      <input
                        type="text"
                        defaultValue="marcus.vance@transform.gov"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-[var(--outline-variant)] bg-[var(--surface)] text-[var(--on-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] font-mono text-xs"
                      />
                    </div>
                  </>
                )}

                {authMethod === 'smartcard' && (
                  <div className="p-4 bg-[var(--surface)] rounded-xl border border-[var(--outline-variant)]/40 text-center space-y-3">
                    <CreditCard className="w-10 h-10 text-[var(--primary)] mx-auto" />
                    <p className="text-xs text-[var(--on-surface-variant)]">
                      Insert your Federal PIV/CAC Smartcard into your reader or touch your NFC contact point.
                    </p>
                    <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      [DETECTED] Reader: Omnikey 3121 USB • Cardholder: {currentUser.name}
                    </div>
                  </div>
                )}

                {authMethod === 'fido' && (
                  <div className="p-4 bg-[var(--surface)] rounded-xl border border-[var(--outline-variant)]/40 text-center space-y-3">
                    <Fingerprint className="w-10 h-10 text-[var(--secondary)] mx-auto" />
                    <p className="text-xs text-[var(--on-surface-variant)]">
                      Touch your Sovereign Security Key or use biometric sensor to authorize PKI token.
                    </p>
                    <div className="text-[11px] font-mono text-blue-500 font-semibold">
                      ECDSA P-384 Enclave Ready • Awaiting user presence...
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:opacity-90 flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  {isAuthenticating ? (
                    <span>Authenticating with Sovereign Key Server...</span>
                  ) : (
                    <>
                      <span>Authenticate Ministry Session</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {authSuccessMsg && (
                <div className="mt-4 p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{authSuccessMsg}</span>
                </div>
              )}
            </div>

            {/* Active Security Session Details */}
            <div className="bg-[var(--surface-container-low)] p-5 rounded-2xl border border-[var(--outline-variant)]/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Laptop className="w-5 h-5 text-[var(--primary)] shrink-0" />
                <div className="text-xs">
                  <div className="font-semibold text-[var(--on-surface)]">
                    Active Enclave Session: 194.20.88.12
                  </div>
                  <div className="text-[var(--on-surface-variant)]">
                    TLS 1.3 • AES-256-GCM • Mutual Authentication (mTLS) Verified
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('learner-dashboard')}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[var(--surface)] border border-[var(--outline-variant)] text-[var(--on-surface)] hover:bg-[var(--surface-container)]"
              >
                Go to Dashboard
              </button>
            </div>

          </div>

          {/* Right Column: Switch Civil Servant Profile (Interactive Demo Mode) */}
          <div className="bg-[var(--surface-container-low)] p-6 rounded-2xl border border-[var(--outline-variant)]/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <UserCheck className="w-5 h-5 text-[var(--secondary)]" />
                <h3 className="text-base font-bold text-[var(--on-surface)]">
                  Switch Civil Servant Persona
                </h3>
              </div>
              <p className="text-xs text-[var(--on-surface-variant)] mb-4 leading-relaxed">
                Test the application as different government personnel, ranging from trainees to federal directorate chiefs.
              </p>

              <div className="space-y-3">
                {AVAILABLE_PROFILES.map((profile) => {
                  const isCurrent = currentUser && profile.id === currentUser.id;
                  return (
                    <div
                      key={profile.id}
                      onClick={() => onSelectUser(profile)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                        isCurrent
                          ? 'bg-[var(--surface)] border-[var(--primary)] shadow-sm ring-1 ring-[var(--primary)]'
                          : 'bg-[var(--surface-container)] border-transparent hover:bg-[var(--surface)]'
                      }`}
                    >
                      <img
                        src={profile.avatarUrl}
                        alt={profile.name}
                        className="w-10 h-10 rounded-full object-cover border border-[var(--outline-variant)]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-[var(--on-surface)] truncate">
                            {profile.name}
                          </h4>
                          {isCurrent && (
                            <span className="text-[10px] font-bold text-[var(--secondary)]">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[var(--on-surface-variant)] truncate">
                          {profile.role}
                        </p>
                        <div className="text-[10px] font-mono text-[var(--primary)]">
                          {profile.govId}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--outline-variant)]/40 text-[11px] text-[var(--on-surface-variant)] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                All session tokens are sandboxed and simulated for demonstration compliance.
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
