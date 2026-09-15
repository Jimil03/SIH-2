import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as fbSignOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  getDocFromServer,
  collection,
  getDocs,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// CRITICAL: Must pass firebaseConfig.firestoreDatabaseId
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Error handling conforming strictly to SKILL.md
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Mandatory testConnection from SKILL.md
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or network is limited.');
    }
    return false;
  }
}

// Database services for User Profiles
export interface StoredUserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  department: string;
  ministry: string;
  clearanceLevel: string;
  xp: number;
  streakDays: number;
  completionRate: number;
  createdAt: string;
  updatedAt: string;
}

export async function saveUserProfileToDb(profile: StoredUserProfile): Promise<void> {
  const path = `users/${profile.uid}`;
  try {
    await setDoc(doc(db, 'users', profile.uid), profile, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function getUserProfileFromDb(uid: string): Promise<StoredUserProfile | null> {
  const path = `users/${uid}`;
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists()) {
      return snap.data() as StoredUserProfile;
    }
    return null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, path);
  }
}

// Module Progress DB Service
export interface StoredProgress {
  moduleId: string;
  userId: string;
  completionPercent: number;
  status: 'not_started' | 'in_progress' | 'mastered';
  lastQuizScore: number;
  updatedAt: string;
}

export async function saveModuleProgressToDb(
  userId: string, 
  moduleId: string, 
  percent: number, 
  quizScore: number = 100
): Promise<void> {
  const path = `users/${userId}/progress/${moduleId}`;
  const status: StoredProgress['status'] = percent >= 100 ? 'mastered' : percent > 0 ? 'in_progress' : 'not_started';
  const data: StoredProgress = {
    moduleId,
    userId,
    completionPercent: percent,
    status,
    lastQuizScore: quizScore,
    updatedAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, 'users', userId, 'progress', moduleId), data, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function getUserModuleProgressList(userId: string): Promise<Record<string, StoredProgress>> {
  const path = `users/${userId}/progress`;
  try {
    const qSnap = await getDocs(collection(db, 'users', userId, 'progress'));
    const result: Record<string, StoredProgress> = {};
    qSnap.forEach((d) => {
      const p = d.data() as StoredProgress;
      result[p.moduleId] = p;
    });
    return result;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

// Cohort Registrations DB Service
export interface StoredCohortRegistration {
  id: string;
  userId: string;
  applicantName: string;
  applicantEmail: string;
  ministry: string;
  cohortTrack: string;
  clearanceLevel: string;
  justification: string;
  status: 'submitted' | 'approved' | 'pending';
  createdAt: string;
}

export async function submitCohortRegistrationToDb(reg: StoredCohortRegistration): Promise<void> {
  const path = `cohortRegistrations/${reg.id}`;
  try {
    await setDoc(doc(db, 'cohortRegistrations', reg.id), reg);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function getMyCohortRegistrations(userId: string): Promise<StoredCohortRegistration[]> {
  const path = 'cohortRegistrations';
  try {
    const q = query(collection(db, 'cohortRegistrations'), where('userId', '==', userId));
    const qSnap = await getDocs(q);
    const list: StoredCohortRegistration[] = [];
    qSnap.forEach((d) => {
      list.push(d.data() as StoredCohortRegistration);
    });
    return list;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}
