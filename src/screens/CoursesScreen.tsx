import React, { useState } from 'react';
import { COURSE_MODULES } from '../data/mockData';
import { CourseModule } from '../types';
import { 
  Search, 
  Clock, 
  Users, 
  Award, 
  ChevronRight, 
  Play, 
  CheckCircle2, 
  X, 
  Sparkles,
  ShieldCheck,
  Flame,
  Zap,
  Trophy,
  Target,
  RotateCcw,
  BookMarked,
  ArrowUpRight,
  Compass
} from 'lucide-react';

export const CoursesScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'In Progress' | 'Mastered'>('All');
  const [activeModuleModal, setActiveModuleModal] = useState<CourseModule | null>(null);
  
  // Daily Micro-Challenge Gamification State
  const [showDailyDrill, setShowDailyDrill] = useState(false);
  const [drillAnswer, setDrillAnswer] = useState<number | null>(null);
  const [drillSuccess, setDrillSuccess] = useState(false);
  const [userXp, setUserXp] = useState(2450);
  const [streakDays, setStreakDays] = useState(14);
  const [hasCompletedDaily, setHasCompletedDaily] = useState(false);

  // Module Modal Interactive State
  const [activeUnitIndex, setActiveUnitIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const categories = [
    'All',
    'Sovereign Cloud',
    'AI Governance',
    'Incident Triage',
    'Cryptographic Systems',
    'Data Policy',
  ];

  // Calculate Overall Progress
  const totalModules = COURSE_MODULES.length;
  const completedModulesCount = COURSE_MODULES.filter(m => (m.completionPercent || 0) === 100).length;
  const totalCompletionPercent = Math.round(
    COURSE_MODULES.reduce((sum, m) => sum + (m.completionPercent || 0), 0) / totalModules
  );

  const filteredModules = COURSE_MODULES.filter((m) => {
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    let matchesStatus = true;
    if (statusFilter === 'In Progress') {
      matchesStatus = (m.completionPercent || 0) > 0 && (m.completionPercent || 0) < 100;
    } else if (statusFilter === 'Mastered') {
      matchesStatus = (m.completionPercent || 0) === 100;
    }

    return matchesCategory && matchesSearch && matchesStatus;
  });

  const handleCompleteDailyDrill = (index: number) => {
    setDrillAnswer(index);
    if (index === 1) { // correct answer
      setDrillSuccess(true);
      if (!hasCompletedDaily) {
        setUserXp(prev => prev + 100);
        setStreakDays(prev => prev + 1);
        setHasCompletedDaily(true);
      }
    } else {
      setDrillSuccess(false);
    }
  };

  return (
    <div className="w-full min-h-screen py-6 sm:py-10 bg-[var(--surface)] text-[var(--on-surface)] transition-colors">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* EYE-CATCHING, GAMIFIED HERO SECTION */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--surface-container-high)] via-[var(--surface-container)] to-[var(--surface-container-lowest)] p-6 sm:p-8 lg:p-10 border border-[var(--outline-variant)]/40 shadow-xl">
          
          {/* Ambient decorative glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-[var(--secondary)]/15 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 rounded-full bg-[var(--primary)]/15 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left Column: Energetic Title & Badges */}
            <div className="flex-1 space-y-4 text-center lg:text-left">
              
              {/* Gamification Status Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold shadow-sm">
                  <Flame className="w-3.5 h-3.5 fill-current animate-pulse" />
                  <span>{streakDays}-Day Study Streak!</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-xs font-bold">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>{userXp.toLocaleString()} XP Earned</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 text-[var(--secondary)] text-xs font-bold">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Level 4 Fellow</span>
                </div>
              </div>

              {/* Punchy Headline (Less boring text, more excitement) */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--on-surface)] tracking-tight leading-tight">
                Level Up Your <span className="text-[var(--primary)]">Digital Sovereignty</span>
              </h1>

              <p className="text-sm sm:text-base text-[var(--on-surface-variant)] max-w-xl leading-relaxed">
                Transform complex federal cloud policies and AI governance into fast, bite-sized interactive quests with live scenario simulators.
              </p>

              {/* Quick Fun Action: Daily Micro-Drill Trigger */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button
                  type="button"
                  onClick={() => setShowDailyDrill(!showDailyDrill)}
                  className="interactive-btn px-5 py-2.5 rounded-xl bg-[var(--secondary)] text-white font-bold text-xs sm:text-sm hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{hasCompletedDaily ? 'Review Today\'s Brain Drill' : '⚡ 60-Sec Quick Brain Drill (+100 XP)'}</span>
                </button>

                <div className="text-xs text-[var(--on-surface-variant)] flex items-center gap-1.5 font-medium">
                  <Target className="w-4 h-4 text-[var(--primary)]" />
                  <span>Next milestone: ISO 4.0 Architect Pin</span>
                </div>
              </div>
            </div>

            {/* Right Column: Total Completion Percentage & Mastery Ring */}
            <div className="w-full lg:w-auto shrink-0 flex justify-center">
              <div className="bg-[var(--surface)]/90 backdrop-blur-md p-6 rounded-2xl border border-[var(--outline-variant)]/50 shadow-lg flex flex-col items-center text-center w-full max-w-xs transition-all">
                
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--on-surface-variant)] mb-2">
                  Total Track Mastery
                </span>

                {/* Circular Progress Ring */}
                <div className="relative w-32 h-32 flex items-center justify-center my-2">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="9"
                      className="text-[var(--surface-container)]"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="9"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * totalCompletionPercent) / 100}
                      strokeLinecap="round"
                      className="text-[var(--secondary)] transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-[var(--on-surface)] tracking-tight">
                      {totalCompletionPercent}%
                    </span>
                    <span className="text-[10px] font-bold text-[var(--secondary)] uppercase">
                      Completed
                    </span>
                  </div>
                </div>

                {/* Progress Stats Summary */}
                <div className="w-full mt-3 pt-3 border-t border-[var(--outline-variant)]/40 grid grid-cols-2 gap-2 text-center text-xs">
                  <div>
                    <div className="font-extrabold text-[var(--on-surface)]">
                      {completedModulesCount}/{totalModules}
                    </div>
                    <div className="text-[10px] text-[var(--on-surface-variant)]">Modules Mastered</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-[var(--secondary)]">
                      {totalModules - completedModulesCount} Active
                    </div>
                    <div className="text-[10px] text-[var(--on-surface-variant)]">In-Flight Quests</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Interactive Daily Micro-Drill Card (Pops down smoothly) */}
          {showDailyDrill && (
            <div className="mt-6 pt-6 border-t border-[var(--outline-variant)]/40 animate-in fade-in slide-in-from-top-3">
              <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--secondary)]/40 shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[var(--secondary)]/20 text-[var(--secondary)]">
                      <Zap className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--on-surface)]">
                        Daily Micro-Drill: Zero-Trust Perimeter Triage
                      </h4>
                      <p className="text-xs text-[var(--on-surface-variant)]">
                        Answer correctly to extend your streak and bank +100 XP!
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDailyDrill(false)}
                    className="p-1 rounded-lg text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm font-medium text-[var(--on-surface)] mb-3 bg-[var(--surface-container-low)] p-3 rounded-xl border border-[var(--outline-variant)]/30">
                  ⚡ <em>"A regional sovereign node detects unsanctioned foreign routing in its failover cache. What is the immediate automated defensive policy?"</em>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    'Wait 24 hours for scheduled maintenance review',
                    'Sever gateway node & failover to air-gapped mesh',
                    'Broadcast raw unencrypted keys to peer nodes',
                  ].map((option, idx) => {
                    const isSelected = drillAnswer === idx;
                    const isCorrect = idx === 1;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleCompleteDailyDrill(idx)}
                        className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border flex items-center justify-between ${
                          isSelected
                            ? isCorrect
                              ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-[1.01]'
                              : 'bg-rose-500 text-white border-rose-600 shadow-md'
                            : 'bg-[var(--surface-container-low)] border-[var(--outline-variant)]/40 text-[var(--on-surface)] hover:bg-[var(--surface-container)]'
                        }`}
                      >
                        <span>{option}</span>
                        {isSelected && isCorrect && <CheckCircle2 className="w-4 h-4 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>

                {drillAnswer !== null && (
                  <div className={`mt-3 p-3 rounded-xl text-xs font-medium flex items-center justify-between ${
                    drillSuccess 
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                      : 'bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-300'
                  }`}>
                    <span>
                      {drillSuccess 
                        ? '🎉 Perfect! Automated isolation triggered. +100 XP banked and streak extended!'
                        : '❌ Incorrect triage. In sovereign systems, air-gapped failover must be instantaneous.'}
                    </span>
                    {drillSuccess && (
                      <span className="font-bold text-[11px] bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                        +100 XP
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* INTERACTIVE CONTROLS & FILTER BAR */}
        <div className="bg-[var(--surface-container-low)] p-4 sm:p-5 rounded-2xl border border-[var(--outline-variant)]/40 shadow-sm space-y-4">
          
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search quests, skills, or ISO standards..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-[var(--surface)] border border-[var(--outline-variant)]/50 text-[var(--on-surface)] placeholder-[var(--on-surface-variant)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
              />
            </div>

            {/* Status Pills Filter */}
            <div className="flex items-center gap-1.5 p-1 bg-[var(--surface)] rounded-xl border border-[var(--outline-variant)]/40 shrink-0">
              {(['All', 'In Progress', 'Mastered'] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === status
                      ? 'bg-[var(--primary-container)] text-white shadow-sm'
                      : 'text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[var(--on-surface)] text-[var(--surface)] shadow-sm'
                      : 'bg-[var(--surface)] text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] border border-[var(--outline-variant)]/40'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* DYNAMIC COURSE MODULES GRID WITH PROMINENT VISUAL PROGRESS BARS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => {
            const percent = module.completionPercent || 0;
            const isMastered = percent === 100;
            const isStarted = percent > 0;

            return (
              <div
                key={module.id}
                className="interactive-card bg-[var(--surface-container-low)] hover:bg-[var(--surface)] rounded-3xl p-6 border border-[var(--outline-variant)]/40 shadow-sm flex flex-col justify-between group transition-all relative overflow-hidden"
              >
                {/* Mastered celebratory ribbon */}
                {isMastered && (
                  <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
                    <div className="bg-[var(--secondary)] text-white text-[9px] font-black uppercase py-1 text-center transform rotate-45 translate-x-7 translate-y-3 shadow-md tracking-wider">
                      Mastered
                    </div>
                  </div>
                )}

                <div>
                  {/* Category Pill & XP reward */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[var(--surface-container)] text-[var(--primary)] border border-[var(--outline-variant)]/30">
                      {module.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                      <Zap className="w-3 h-3 fill-current" />
                      +{isMastered ? '500' : '350'} XP
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-base sm:text-lg font-extrabold text-[var(--on-surface)] group-hover:text-[var(--primary)] transition-colors mb-2 leading-snug">
                    {module.title}
                  </h3>

                  {/* ISO Standard badge */}
                  <div className="flex items-center gap-1.5 text-xs text-[var(--on-surface-variant)] mb-4">
                    <Award className="w-3.5 h-3.5 text-[var(--secondary)]" />
                    <span className="font-semibold text-[11px]">{module.isoAccreditation}</span>
                  </div>

                  {/* VISUAL PROGRESS BAR & COMPLETION STATUS */}
                  <div className="p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--outline-variant)]/40 shadow-inner mb-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[var(--on-surface)] flex items-center gap-1">
                        {isMastered ? (
                          <>
                            <Trophy className="w-3.5 h-3.5 text-[var(--secondary)]" />
                            <span className="text-[var(--secondary)]">Quest Mastered</span>
                          </>
                        ) : isStarted ? (
                          <>
                            <Flame className="w-3.5 h-3.5 text-amber-500 fill-current" />
                            <span>In Progress</span>
                          </>
                        ) : (
                          <>
                            <Compass className="w-3.5 h-3.5 text-[var(--primary)]" />
                            <span>Ready to Launch</span>
                          </>
                        )}
                      </span>
                      <span className="font-mono font-black text-sm text-[var(--primary)]">
                        {percent}%
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full bg-[var(--surface-container-high)] rounded-full h-3 overflow-hidden p-0.5 border border-[var(--outline-variant)]/30">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out shadow-sm ${
                          isMastered 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                            : percent > 50 
                            ? 'bg-gradient-to-r from-[var(--primary)] to-blue-400' 
                            : 'bg-gradient-to-r from-amber-500 to-yellow-400'
                        }`}
                        style={{ width: `${Math.max(percent, 4)}%` }}
                      />
                    </div>

                    {/* Milestone Unit Indicators */}
                    <div className="flex items-center justify-between text-[10px] text-[var(--on-surface-variant)] pt-0.5">
                      <span>{module.syllabus.length} Interactive Units</span>
                      <span>{isMastered ? 'All Units Completed' : `${Math.round((percent / 100) * module.syllabus.length)} of ${module.syllabus.length} cleared`}</span>
                    </div>
                  </div>

                  {/* Quick Skill Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {module.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[var(--surface-container)] text-[var(--on-surface-variant)]"
                      >
                        {skill}
                      </span>
                    ))}
                    {module.skills.length > 3 && (
                      <span className="text-[10px] text-[var(--on-surface-variant)] self-center font-medium">
                        +{module.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-[var(--outline-variant)]/40 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--on-surface-variant)]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{module.durationHours}h total</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveModuleModal(module);
                      setActiveUnitIndex(0);
                      setQuizAnswer(null);
                      setQuizSubmitted(false);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                      isMastered
                        ? 'bg-[var(--surface-container-high)] text-[var(--on-surface)] hover:bg-[var(--surface)] border border-[var(--outline-variant)]'
                        : 'bg-[var(--primary-container)] text-white hover:opacity-95'
                    }`}
                  >
                    <span>{isMastered ? 'Review Quest 🏆' : isStarted ? 'Resume Mission' : 'Start Quest'}</span>
                    <Play className="w-3 h-3 fill-current" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {filteredModules.length === 0 && (
          <div className="p-12 text-center bg-[var(--surface-container-low)] rounded-3xl border border-[var(--outline-variant)]/40 mt-4 space-y-3">
            <Search className="w-12 h-12 text-[var(--on-surface-variant)] mx-auto opacity-50" />
            <h4 className="text-lg font-bold text-[var(--on-surface)]">No modules found</h4>
            <p className="text-xs text-[var(--on-surface-variant)] max-w-sm mx-auto">
              No course matches your filter. Clear your search or change categories to see available curriculum quests.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setStatusFilter('All');
              }}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-[var(--primary)] text-white hover:opacity-90"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* GAMIFIED MISSION / MODULE VIEWER MODAL */}
      {activeModuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-2xl bg-[var(--surface-container-lowest)] rounded-3xl border border-[var(--outline-variant)] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-[var(--outline-variant)]/40 flex items-start justify-between bg-[var(--surface-container-low)]">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[var(--primary-container)] text-white uppercase tracking-wider">
                    {activeModuleModal.category}
                  </span>
                  <span className="text-xs font-mono text-[var(--secondary)] font-bold">
                    {activeModuleModal.id}
                  </span>
                  <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-current" /> +500 XP
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[var(--on-surface)]">
                  {activeModuleModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModuleModal(null)}
                className="p-2 rounded-xl text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Progress Summary in Modal */}
              <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--outline-variant)]/40 flex items-center justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Your Mission Progress</span>
                    <span className="text-[var(--primary)]">{activeModuleModal.completionPercent || 0}% Cleared</span>
                  </div>
                  <div className="w-full bg-[var(--surface-container)] rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] h-2.5 rounded-full"
                      style={{ width: `${activeModuleModal.completionPercent || 0}%` }}
                    />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] text-[var(--on-surface-variant)] uppercase font-bold">Standard</div>
                  <div className="text-xs font-extrabold text-[var(--secondary)]">ISO 4.0 Verified</div>
                </div>
              </div>

              {/* Mission Objectives (Fun & Concise) */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[var(--primary)] mb-2 flex items-center gap-1.5">
                  <Compass className="w-4 h-4" />
                  <span>Mission Objectives & Briefing</span>
                </h4>
                <p className="text-sm text-[var(--on-surface-variant)] leading-relaxed">
                  {activeModuleModal.description}
                </p>
              </div>

              {/* Interactive Unit Navigation */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[var(--primary)] mb-3 flex items-center gap-1.5">
                  <BookMarked className="w-4 h-4" />
                  <span>Curriculum Units & Checkpoints</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                  {activeModuleModal.syllabus.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveUnitIndex(idx)}
                      className={`p-3 rounded-xl text-left border text-xs font-bold transition-all ${
                        activeUnitIndex === idx
                          ? 'bg-[var(--primary-container)] text-white border-[var(--primary)] shadow-sm'
                          : 'bg-[var(--surface)] text-[var(--on-surface)] border-[var(--outline-variant)]/40 hover:bg-[var(--surface-container)]'
                      }`}
                    >
                      <div className="text-[10px] opacity-80 mb-0.5">Unit {idx + 1}</div>
                      <div className="truncate">{s.unit}</div>
                    </button>
                  ))}
                </div>

                {/* Selected Unit Content Box */}
                <div className="p-4 rounded-2xl bg-[var(--surface-container-low)] border border-[var(--outline-variant)]/40 space-y-2">
                  <div className="text-xs font-bold text-[var(--on-surface)]">
                    Topics Mastered in {activeModuleModal.syllabus[activeUnitIndex]?.unit}:
                  </div>
                  <div className="space-y-1.5">
                    {activeModuleModal.syllabus[activeUnitIndex]?.topics.map((t, tidx) => (
                      <div key={tidx} className="flex items-center gap-2 text-xs text-[var(--on-surface-variant)]">
                        <CheckCircle2 className="w-4 h-4 text-[var(--secondary)] shrink-0" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive Knowledge Challenge Checkpoint */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[var(--surface-container)] to-[var(--surface-container-low)] border border-[var(--outline-variant)]/40 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-[var(--on-surface)]">
                    Interactive Unit Checkpoint Challenge
                  </h4>
                  <span className="text-[10px] bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold px-2 py-0.5 rounded-full ml-auto">
                    +50 XP
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-[var(--on-surface)] mb-3">
                  Under ISO 4.0 sovereign standards, what is the mandatory time threshold for propagating cryptographic key revocation across federated validator nodes?
                </p>

                <div className="space-y-2">
                  {[
                    'Within 120 seconds with Merkle receipt proof',
                    '24 hours through asynchronous batch jobs',
                    'Manual review by Directorate chief only',
                  ].map((option, optIdx) => {
                    const isSelected = quizAnswer === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => !quizSubmitted && setQuizAnswer(optIdx)}
                        className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between border ${
                          isSelected
                            ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm'
                            : 'bg-[var(--surface)] text-[var(--on-surface)] border-[var(--outline-variant)]/40 hover:bg-[var(--surface-container-low)]'
                        }`}
                      >
                        <span>{option}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button
                    type="button"
                    disabled={quizAnswer === null}
                    onClick={() => setQuizSubmitted(true)}
                    className="mt-3 px-5 py-2 text-xs font-bold rounded-xl bg-[var(--secondary)] text-white hover:opacity-90 disabled:opacity-50 shadow-sm cursor-pointer"
                  >
                    Submit Response
                  </button>
                ) : (
                  <div className="mt-3 p-3 bg-emerald-500/15 rounded-xl border border-emerald-500/30 text-xs text-[var(--on-surface)] flex items-center justify-between">
                    <div>
                      <span className="font-black text-emerald-600 dark:text-emerald-400">
                        ✓ Correct!
                      </span>{' '}
                      Sovereign protocols mandate a 120-second threshold with cryptographic proof.
                    </div>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 bg-white/40 px-2 py-0.5 rounded-md">
                      +50 XP
                    </span>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[var(--surface-container-low)] border-t border-[var(--outline-variant)]/40 flex items-center justify-between">
              <span className="text-xs text-[var(--on-surface-variant)] flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[var(--secondary)]" />
                Accredited for Continuing Civil Service Units (CEU)
              </span>
              <button
                type="button"
                onClick={() => setActiveModuleModal(null)}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-[var(--primary)] text-white hover:opacity-90 cursor-pointer"
              >
                Close Module
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
