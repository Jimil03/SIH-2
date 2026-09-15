export type NavigationTab = 
  | 'landing-overview' 
  | 'courses-modules' 
  | 'learner-dashboard' 
  | 'certification' 
  | 'auth-portal'
  | 'login';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeAccent = 'classic' | 'teal' | 'amber' | 'cyber';
export type UiDensity = 'comfortable' | 'compact';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  role: string;
  department: string;
  ministry: string;
  clearanceLevel: 'Confidential' | 'Secret' | 'Sovereign Executive';
  avatarUrl: string;
  govId: string;
  completionRate: number;
  activeModules: number;
  earnedCredentials: number;
}

export interface CourseModule {
  id: string;
  title: string;
  category: 'AI Governance' | 'Sovereign Cloud' | 'Incident Triage' | 'Data Policy' | 'Cryptographic Systems';
  level: 'Foundational' | 'Intermediate' | 'Executive Directorate';
  durationHours: number;
  isoAccreditation: string;
  description: string;
  skills: string[];
  enrolledOfficers: number;
  rating: number;
  completionPercent?: number;
  syllabus: {
    unit: string;
    topics: string[];
  }[];
}

export interface CredentialRecord {
  id: string;
  serialNumber: string;
  title: string;
  recipientName: string;
  recipientGovId: string;
  issuingMinistry: string;
  issuanceDate: string;
  expiryDate: string;
  sha256Hash: string;
  ledgerBlockHeight: number;
  status: 'Verified' | 'Revoked' | 'In Review';
  isoStandard: string;
  pkiSignatureKey: string;
}

export interface SandboxScenario {
  id: string;
  title: string;
  category: string;
  difficulty: 'Standard' | 'Elevated' | 'Critical';
  timeLimitMinutes: number;
  description: string;
  terminalLogSnippet: string;
  activeNodes: number;
}
