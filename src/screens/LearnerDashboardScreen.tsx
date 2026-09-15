import React, { useState, useEffect } from 'react';
import { UserProfile, CourseModule, NavigationTab } from '../types';
import { COURSE_MODULES } from '../data/mockData';
import { getMyCohortRegistrations, StoredCohortRegistration } from '../lib/firebase';
import { 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Play, 
  Users, 
  Calendar, 
  FileText, 
  ArrowUpRight, 
  Layers, 
  Sparkles,
  Zap,
  Activity,
  Database,
  RefreshCw
} from 'lucide-react';

interface LearnerDashboardProps {
  currentUser: UserProfile | null;
  onNavigateTab: (tab: NavigationTab) => void;
}

export const LearnerDashboardScreen: React.FC<LearnerDashboardProps> = ({
  currentUser,
  onNavigateTab,
}) => {
  const [selectedTrackTab, setSelectedTrackTab] = useState<'active' | 'completed'>('active');
  const [cohortRegistrations, setCohortRegistrations] = useState<StoredCohortRegistration[]>([]);
  const [isLoadingRegistrations, setIsLoadingRegistrations] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setCohortRegistrations([]);
      return;
    }
    let isMounted = true;
    setIsLoadingRegistrations(true);
    getMyCohortRegistrations(currentUser.id)
      .then((regs) => {
        if (isMounted) {
          setCohortRegistrations(regs);
        }
      })
      .catch((err) => {
        console.warn('Load cohort registrations:', err);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingRegistrations(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [currentUser?.id]);

  const competencies = [
    { name: 'AI Governance & Ethics', score: 98, level: 'Directorate Ready', color: 'bg-emerald-500' },
    { name: 'Open Data Stewardship', score: 94, level: 'Advanced Civil Lead', color: 'bg-blue-500' },
    { name: 'Crisis Triage & Failover', score: 92, level: 'Operational Command', color: 'bg-teal-500' },
    { name: 'Cryptographic PKI Systems', score: 88, level: 'Intermediate Fellow', color: 'bg-indigo-500' },
    { name: 'Sovereign Cloud Topology', score: 86, level: 'Active Progression', color: 'bg-amber-500' },
  ];

  const inProgressCourses = COURSE_MODULES.filter(m => (m.completionPercent || 0) < 100);
  const completedCourses = COURSE_MODULES.filter(m => (m.completionPercent || 0) === 100);

  return (
    <div className="w-full min-h-screen py-8 sm:py-12 bg-[var(--surface)] text-[var(--on-surface)] transition-colors">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Officer Identity & Readiness Header or Guest Welcome */}
        {currentUser ? (
          <div className="bg-[var(--surface-container-low)] p-6 sm:p-8 rounded-2xl border border-[var(--outline-variant)]/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[var(--primary)] shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 p-1 bg-[var(--secondary)] rounded-full text-white ring-2 ring-[var(--surface)]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-[var(--on-surface)]">
                    {currentUser.name}
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--surface-container-high)] text-[var(--primary)] border border-[var(--outline-variant)]/30">
                    {currentUser.clearanceLevel} Clearance
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--on-surface-variant)] mt-0.5">
                  {currentUser.role} • {currentUser.department}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs font-mono text-[var(--on-surface-variant)]">
                  <span>{currentUser.govId}</span>
                  <span>•</span>
                  <span className="text-[var(--primary)] font-semibold">{currentUser.ministry}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-[var(--outline-variant)]/30">
              <div className="text-right">
                <div className="text-xs text-[var(--on-surface-variant)] font-medium">Digital Readiness Index</div>
                <div className="text-2xl sm:text-3xl font-bold text-[var(--secondary)]">
                  {currentUser.completionRate}%
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('certification')}
                className="px-4 py-2 rounded-xl bg-[var(--primary-container)] text-white text-xs sm:text-sm font-semibold hover:opacity-90 flex items-center gap-1.5 shadow-sm"
              >
                <Award className="w-4 h-4" />
                <span>Verifiable Diplomas</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-[var(--surface-container-high)] via-[var(--surface-container)] to-[var(--surface-container-lowest)] p-6 sm:p-8 rounded-3xl border border-[var(--outline-variant)]/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fresh Guest Session • Skill Bridge</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--on-surface)] tracking-tight">
                Skill Bridge Learner Workspace
              </h1>
              <p className="text-xs sm:text-sm text-[var(--on-surface-variant)] leading-relaxed">
                Create a fresh civil servant registration or sign in with your ministerial credentials to save competencies, track live XP, and synchronize cohort applications with Cloud Firestore.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigateTab('login')}
                className="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs sm:text-sm font-bold hover:opacity-90 flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Register Fresh Account / Sign In</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('courses-modules')}
                className="px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--outline-variant)] hover:bg-[var(--surface-container)] text-xs sm:text-sm font-bold text-[var(--on-surface)] transition-colors cursor-pointer"
              >
                Explore Syllabus
              </button>
            </div>
          </div>
        )}

        {/* Competency Mapping & Active Simulation Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Real-time Competency Progress (2 cols) */}
          <div className="lg:col-span-2 bg-[var(--surface-container-low)] p-6 rounded-2xl border border-[var(--outline-variant)]/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[var(--primary)]" />
                  <h2 className="text-lg font-bold text-[var(--on-surface)]">
                    Real-Time Competency Telemetry
                  </h2>
                </div>
                <span className="text-xs text-[var(--on-surface-variant)] font-mono">
                  ISO 4.0 Standard Baseline
                </span>
              </div>
              <p className="text-xs text-[var(--on-surface-variant)] mb-6">
                Evaluated through automated diagnostic assessments, containerized sandbox runs, and peer policy reviews across federal agencies.
              </p>

              <div className="space-y-4">
                {competencies.map((comp, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[var(--on-surface)]">{comp.name}</span>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-[var(--on-surface-variant)]">{comp.level}</span>
                        <span className="font-bold text-[var(--on-surface)]">{comp.score}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-[var(--surface-container)] rounded-full h-2 overflow-hidden">
                      <div
                        className={`${comp.color} h-2 rounded-full transition-all duration-700`}
                        style={{ width: `${comp.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--outline-variant)]/40 flex items-center justify-between text-xs text-[var(--on-surface-variant)]">
              <span>Updated 12 mins ago via Zero-Trust Auditing Node</span>
              <button
                type="button"
                onClick={() => onNavigateTab('courses-modules')}
                className="font-semibold text-[var(--primary)] hover:underline flex items-center gap-1"
              >
                <span>Bridge remaining gaps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Simulation Lab Card (1 col) */}
          <div className="bg-gradient-to-br from-[var(--surface-container-high)] to-[var(--surface-container)] p-6 rounded-2xl border border-[var(--outline-variant)]/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--secondary)] pulse-dot"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
                  Live Sandbox Exercise
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--on-surface)] mb-2">
                Crisis Failover Simulation Pod
              </h3>
              <p className="text-xs text-[var(--on-surface-variant)] leading-relaxed mb-4">
                Assigned scenario: <strong>Perimeter Partitioning in Central Registry</strong>. Mitigate synthetic packet dropouts and route DNS through sovereign fallback mesh.
              </p>
              
              <div className="p-3 bg-[var(--surface)]/80 backdrop-blur-sm rounded-xl border border-[var(--outline-variant)]/30 space-y-2 mb-4 font-mono text-[11px]">
                <div className="flex justify-between text-[var(--on-surface-variant)]">
                  <span>Target Mesh:</span>
                  <span className="font-bold text-[var(--on-surface)]">Cluster-04 North</span>
                </div>
                <div className="flex justify-between text-[var(--on-surface-variant)]">
                  <span>Authorized Token:</span>
                  <span className="text-[var(--secondary)]">AUTH_OK_2026</span>
                </div>
                <div className="flex justify-between text-[var(--on-surface-variant)]">
                  <span>Time Envelope:</span>
                  <span className="text-amber-500 font-bold">14m remaining</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab('landing-overview')}
              className="w-full py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs font-semibold hover:opacity-90 flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>Launch Virtual Terminal</span>
            </button>
          </div>

        </div>

        {/* Active In-Progress Courses & Cohort Sync */}
        <div className="bg-[var(--surface-container-low)] p-6 rounded-2xl border border-[var(--outline-variant)]/40 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[var(--outline-variant)]/40">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setSelectedTrackTab('active')}
                className={`text-sm font-bold pb-1 border-b-2 transition-colors ${
                  selectedTrackTab === 'active'
                    ? 'border-[var(--primary)] text-[var(--primary)]'
                    : 'border-transparent text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]'
                }`}
              >
                In-Progress Modules ({inProgressCourses.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedTrackTab('completed')}
                className={`text-sm font-bold pb-1 border-b-2 transition-colors ${
                  selectedTrackTab === 'completed'
                    ? 'border-[var(--primary)] text-[var(--primary)]'
                    : 'border-transparent text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]'
                }`}
              >
                Mastered & Accredited ({completedCourses.length})
              </button>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab('courses-modules')}
              className="text-xs font-semibold text-[var(--primary)] hover:underline flex items-center gap-1"
            >
              <span>Explore All Modules</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(selectedTrackTab === 'active' ? inProgressCourses : completedCourses).map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--outline-variant)]/40 hover:border-[var(--primary)]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--secondary)] bg-[var(--surface-container)] px-2 py-0.5 rounded">
                      {c.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-[var(--primary)]">
                      {c.completionPercent}% Completed
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[var(--on-surface)] mb-1">
                    {c.title}
                  </h4>
                  <p className="text-xs text-[var(--on-surface-variant)] line-clamp-2 mb-3">
                    {c.description}
                  </p>
                  
                  <div className="w-full bg-[var(--surface-container)] rounded-full h-1.5 overflow-hidden mb-3">
                    <div
                      className="bg-[var(--primary)] h-1.5 rounded-full"
                      style={{ width: `${c.completionPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--outline-variant)]/30 text-xs">
                  <span className="text-[var(--on-surface-variant)]">{c.isoAccreditation}</span>
                  <button
                    type="button"
                    onClick={() => onNavigateTab('courses-modules')}
                    className="font-semibold text-[var(--primary)] hover:underline flex items-center gap-1"
                  >
                    <span>{selectedTrackTab === 'active' ? 'Resume Unit' : 'Review Syllabus'}</span>
                    <Play className="w-3 h-3 fill-current" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Institutional Cohort Applications & Records Section */}
        <div className="bg-[var(--surface-container-low)] p-6 rounded-2xl border border-[var(--outline-variant)]/40 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--outline-variant)]/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[var(--surface-container)] text-[var(--primary)]">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--on-surface)] flex items-center gap-2">
                  <span>Official Cohort Applications & Enrolments</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold">
                    Verified Sync
                  </span>
                </h3>
                <p className="text-xs text-[var(--on-surface-variant)]">
                  Active departmental submissions and executive learning tracks.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab('courses-modules')}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface)] hover:bg-[var(--surface-container)] text-[var(--on-surface)] flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
            >
              <span>Explore Tracks</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {isLoadingRegistrations ? (
            <div className="py-6 text-center text-xs text-[var(--on-surface-variant)]">
              Loading verified institutional records...
            </div>
          ) : cohortRegistrations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cohortRegistrations.map((reg) => (
                <div key={reg.id} className="p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--outline-variant)]/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[var(--secondary)]">{reg.id}</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      {reg.status}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[var(--on-surface)]">{reg.cohortTrack}</div>
                  <div className="text-[11px] text-[var(--on-surface-variant)]">{reg.ministry}</div>
                  <div className="text-[10px] text-[var(--on-surface-variant)] italic">"{reg.justification}"</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center space-y-2">
              <p className="text-xs text-[var(--on-surface-variant)]">
                No active department cohort applications recorded for this officer yet.
              </p>
              <button
                type="button"
                onClick={() => onNavigateTab('landing-overview')}
                className="text-xs font-bold text-[var(--primary)] hover:underline"
              >
                Submit a Cohort Intake Application
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
