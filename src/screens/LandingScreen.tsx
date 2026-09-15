import React from 'react';
import { 
  NavigationTab, 
  ThemeMode 
} from '../types';
import { HeroShaderBackground } from '../components/HeroShaderBackground';
import { SandboxTerminal } from '../components/SandboxTerminal';
import { 
  UserPlus, 
  BookOpen, 
  ShieldCheck, 
  Star, 
  Users, 
  CheckCircle, 
  Landmark, 
  Award, 
  BrainCircuit, 
  Network, 
  Shield, 
  LineChart, 
  ArrowRight, 
  HardDrive, 
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';

interface LandingScreenProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenCohortModal: () => void;
  onOpenAdvisorModal: () => void;
  themeMode: ThemeMode;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onNavigateTab,
  onOpenCohortModal,
  onOpenAdvisorModal,
  themeMode,
}) => {
  const isDark = themeMode === 'dark';

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION WITH INTERACTIVE WEBGL SHADER & NETWORK OVERLAY */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[var(--surface)] via-[var(--surface-container-low)] to-[var(--surface)] pt-10 pb-20 lg:pt-16 lg:pb-28">
        
        {/* Dynamic Wave & Network Canvas Background */}
        <HeroShaderBackground isDark={isDark} />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          
          {/* Institutional Initiative Badge */}
          <div className="anim-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--surface-container)]/90 backdrop-blur-sm shadow-sm mb-6 border border-[var(--outline-variant)]/40">
            <span className="w-2 h-2 rounded-full bg-[var(--secondary)] pulse-dot"></span>
            <span className="text-[11px] text-[var(--secondary)] uppercase tracking-widest font-bold">
              Ministry Digital Transformation & Capacity Initiative
            </span>
          </div>

          {/* Main Impact Headline */}
          <h1 className="anim-fade-in-up font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--on-surface)] max-w-4xl tracking-tight mb-6 leading-tight">
            Empowering Public Servants with Next-Gen Digital Competencies
          </h1>

          {/* Supporting Copy */}
          <p className="anim-fade-in-up text-base sm:text-lg text-[var(--on-surface-variant)] max-w-2xl mb-10 leading-relaxed font-normal">
            Equipping civil service leaders with cutting-edge analytics, sovereign cloud management, and AI governance. Accelerated learning frameworks backed by real-time credentialing and ministerial accreditation.
          </p>

          {/* Action Bar */}
          <div className="anim-fade-in-up flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
            <button
              type="button"
              onClick={onOpenCohortModal}
              className="interactive-btn relative group overflow-hidden px-7 py-3.5 bg-[var(--primary-container)] text-white font-semibold text-sm sm:text-base rounded-lg shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Get Started / Register</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"></div>
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab('courses-modules')}
              className="interactive-btn px-6 py-3.5 bg-[var(--surface-container)] hover:bg-[var(--surface-container-high)] text-[var(--primary)] font-semibold text-sm sm:text-base rounded-lg shadow-sm border border-[var(--outline-variant)]/40 flex items-center gap-2 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Course Catalog</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab('auth-portal')}
              className="interactive-btn px-6 py-3.5 bg-transparent hover:bg-[var(--surface-container-low)] text-[var(--on-surface)] font-semibold text-sm sm:text-base rounded-lg border border-transparent hover:border-[var(--outline-variant)]/30 flex items-center gap-2 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-[var(--secondary)]" />
              <span>Ministry SSO Login</span>
            </button>
          </div>

          {/* Live Credential Trust Indicator */}
          <div className="anim-fade-in-up flex items-center gap-4 text-left p-3.5 sm:p-4 rounded-xl bg-[var(--surface)]/90 backdrop-blur-md shadow-sm border border-[var(--outline-variant)]/40 hover:shadow-md transition-shadow max-w-md">
            <div className="flex -space-x-3 overflow-hidden shrink-0">
              <img 
                className="inline-block h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-[var(--surface)]" 
                alt="Senior government officer" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcjtV6Ri5t17P5gHVaLfjR_g-ZiybML1Un6PCEQ3L8ZLpl-XvNfT5cY_YrgV7N-cbLvRQ6wRGjTs5Z3iVhp7UEXprxjHnzO9tGKfnroFHtkIynaBtnk0_IA7L1NcSWO97V4yc_jSnbrIsieqWAaLa6kXARuN4iL3QXVJWlmQzmyNCR8QKDe-h3BCuNXpK_ZmmUQgKnB3uprlfVtphV86ApLIVDv9Kxsca4sYPPslQgEWM3wb_Oj7KsWg" 
              />
              <img 
                className="inline-block h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-[var(--surface)]" 
                alt="Female civil servant" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA14eIvwJMhVwT9ABKf_PF07FF9C0k-REUL8fvFBr_Q8e1wHbObH0nPz2Xqno4xnRYwUqDMKU-fudKbJZeLZmkgpzFDafvMvm-WHw1bwYQRCLt2p6hqcDzj71NdKx1lktjGRJLrAmnfvSekTjLyrnsxRUDlSntKh1xIJygFTQ7l-BySsSsnMyboqZrCTgq0U71KpzYt6M73QPdrV8GoJ2UgmnbXGKue4Vdp287YoXAbxy3ZWBmDReeSfw" 
              />
              <img 
                className="inline-block h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-[var(--surface)]" 
                alt="Young technology director" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH175oDxBaXeieYbezNJC3UFsQF_axRCWAmK8BeXYdlRiZ3FsgD8Fr47b6QD_paUP6x4_Y0CjGE6tw1oxuLLzK9eMK-dXk3HpSSnfmOzmZtxf4YhfTLTxst4pPEtgcbJT_KKXOOwrV1zRV-EcFLvrNnA_cLtahEgj3qy7PxLKZ12_LtFrOqgDhq4KKfAnii5G_vO6UZPpgytX5VPJRkf47ZOIxl21oIZk-xwL9aad7paWCo5BX7LBMaw" 
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[var(--secondary)]">
                <Star className="w-4 h-4 fill-[var(--secondary)] text-[var(--secondary)]" />
                <span className="text-xs font-bold text-[var(--on-surface)]">
                  Standard 4.0 ISO Certified
                </span>
              </div>
              <span className="text-xs text-[var(--on-surface-variant)]">
                Continuous cohort intake running across 14 central departments
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* LIVE IMPACT STATS BANNER */}
      <section className="w-full bg-[var(--surface-container-high)] py-10 relative z-20 -mt-6 shadow-sm transition-colors">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Stat Item 1 */}
            <div className="flex flex-col p-6 bg-[var(--surface)] rounded-xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group border border-[var(--outline-variant)]/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[var(--on-surface-variant)] uppercase tracking-wider font-semibold">
                  Trained Personnel
                </span>
                <Users className="w-5 h-5 text-[var(--primary)] group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-[var(--primary)]">137,610</span>
                <span className="text-2xl font-bold text-[var(--primary)]">+</span>
              </div>
              <p className="text-xs text-[var(--on-surface-variant)] mt-1">
                Certified active public servants across regions
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary)]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
            </div>

            {/* Stat Item 2 */}
            <div className="flex flex-col p-6 bg-[var(--surface)] rounded-xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group border border-[var(--outline-variant)]/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[var(--on-surface-variant)] uppercase tracking-wider font-semibold">
                  Course Completion
                </span>
                <CheckCircle className="w-5 h-5 text-[var(--secondary)] group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-[var(--secondary)]">95.0</span>
                <span className="text-2xl font-bold text-[var(--secondary)]">%</span>
              </div>
              <div className="w-full bg-[var(--surface-container)] rounded-full h-1.5 mt-3 overflow-hidden">
                <div className="bg-[var(--secondary)] h-1.5 rounded-full w-[95.0%] transition-all duration-1000"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--secondary)]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
            </div>

            {/* Stat Item 3 */}
            <div className="flex flex-col p-6 bg-[var(--surface)] rounded-xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group border border-[var(--outline-variant)]/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[var(--on-surface-variant)] uppercase tracking-wider font-semibold">
                  Participating Ministries
                </span>
                <Landmark className="w-5 h-5 text-[var(--primary)] group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-[var(--primary)]">34</span>
                <span className="text-xl font-bold text-[var(--primary)] pl-1">Federated</span>
              </div>
              <p className="text-xs text-[var(--on-surface-variant)] mt-1">
                Inter-ministerial network sharing curricula
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary)]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
            </div>

            {/* Stat Item 4 */}
            <div className="flex flex-col p-6 bg-[var(--surface)] rounded-xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group border border-[var(--outline-variant)]/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[var(--on-surface-variant)] uppercase tracking-wider font-semibold">
                  Program Modules
                </span>
                <Award className="w-5 h-5 text-[var(--tertiary)] group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-[var(--tertiary)]">404</span>
                <span className="text-2xl font-bold text-[var(--tertiary)]">+</span>
              </div>
              <p className="text-xs text-[var(--on-surface-variant)] mt-1">
                Rigorous, peer-vetted digital skill modules
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--tertiary)]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE FRAMEWORK PILLARS SECTION */}
      <section className="py-20 lg:py-24 bg-[var(--surface)] max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full transition-colors">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-4">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest text-[var(--primary-container)] font-bold">
              Core Framework Pillars
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--on-surface)] mt-2">
              Engineered for High-Trust Institutional Upskilling
            </h2>
          </div>
          <p className="text-sm text-[var(--on-surface-variant)] max-w-md">
            Designed to meet civil service compliance, cryptographic audit trails, and multi-disciplinary operational readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Feature Card 1 */}
          <div className="interactive-card group relative p-7 sm:p-8 rounded-xl bg-[var(--surface-container-low)] hover:bg-[var(--surface)] shadow-sm flex flex-col justify-between overflow-hidden border border-[var(--outline-variant)]/30 hover:border-[var(--primary)]/40">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-[var(--primary-container)] text-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-[var(--primary)] transition-all duration-300">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--on-surface)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                Adaptive Learning Paths
              </h3>
              <p className="text-sm text-[var(--on-surface-variant)] mb-6 leading-relaxed">
                AI-driven diagnostic assessments analyze ministerial duty profiles and pinpoint skill deficits, dynamically calibrating coursework to bridge capability gaps rapidly.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--on-surface)]">
                  <CheckCircle className="w-4 h-4 text-[var(--secondary)] fill-[var(--secondary)]/10" />
                  <span>Automated Baseline Assessment</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--on-surface)]">
                  <CheckCircle className="w-4 h-4 text-[var(--secondary)] fill-[var(--secondary)]/10" />
                  <span>Dynamic Scenario Emulation</span>
                </div>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => onNavigateTab('courses-modules')}
              className="relative z-10 pt-4 flex items-center gap-2 text-[var(--primary)] text-sm font-semibold cursor-pointer group-hover:translate-x-1.5 transition-transform duration-300 text-left"
            >
              <span>Explore Diagnostic Suite</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125"></div>
          </div>

          {/* Feature Card 2 */}
          <div className="interactive-card group relative p-7 sm:p-8 rounded-xl bg-[var(--surface-container-low)] hover:bg-[var(--surface)] shadow-sm flex flex-col justify-between overflow-hidden border border-[var(--outline-variant)]/30 hover:border-[var(--secondary)]/40">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-[var(--secondary)] text-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-[var(--secondary-container)] group-hover:text-[var(--on-secondary-container)] transition-all duration-300">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--on-surface)] mb-3 group-hover:text-[var(--secondary)] transition-colors">
                Ministry Cohort Collaboration
              </h3>
              <p className="text-sm text-[var(--on-surface-variant)] mb-6 leading-relaxed">
                Cross-functional project breakout rooms connecting data analysts, policy leads, and operational commanders to tackle sovereign technology challenges together.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--on-surface)]">
                  <CheckCircle className="w-4 h-4 text-[var(--secondary)] fill-[var(--secondary)]/10" />
                  <span>Encrypted Multi-Agency Workspaces</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--on-surface)]">
                  <CheckCircle className="w-4 h-4 text-[var(--secondary)] fill-[var(--secondary)]/10" />
                  <span>Peer Policy Review Channels</span>
                </div>
              </div>
            </div>
            <button 
              type="button"
              onClick={onOpenCohortModal}
              className="relative z-10 pt-4 flex items-center gap-2 text-[var(--secondary)] text-sm font-semibold cursor-pointer group-hover:translate-x-1.5 transition-transform duration-300 text-left"
            >
              <span>Join Inter-Ministerial Hubs</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--secondary)]/5 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125"></div>
          </div>

          {/* Feature Card 3 */}
          <div className="interactive-card group relative p-7 sm:p-8 rounded-xl bg-[var(--surface-container-low)] hover:bg-[var(--surface)] shadow-sm flex flex-col justify-between overflow-hidden border border-[var(--outline-variant)]/30 hover:border-[var(--primary)]/40">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-[var(--tertiary-container)] text-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-[var(--tertiary)] transition-all duration-300">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--on-surface)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                Cryptographic Credentials
              </h3>
              <p className="text-sm text-[var(--on-surface-variant)] mb-6 leading-relaxed">
                Tamper-proof verifiable diplomas integrated with open government public key infrastructure (PKI) for effortless third-party agency credential verification.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--on-surface)]">
                  <CheckCircle className="w-4 h-4 text-[var(--secondary)] fill-[var(--secondary)]/10" />
                  <span>Instant QR Verification Endpoint</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--on-surface)]">
                  <CheckCircle className="w-4 h-4 text-[var(--secondary)] fill-[var(--secondary)]/10" />
                  <span>Immutable Ledger Audit Records</span>
                </div>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => onNavigateTab('certification')}
              className="relative z-10 pt-4 flex items-center gap-2 text-[var(--on-surface)] text-sm font-semibold cursor-pointer group-hover:translate-x-1.5 transition-transform duration-300 text-left"
            >
              <span>Validate Credentials</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--tertiary)]/5 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125"></div>
          </div>

          {/* Feature Card 4 */}
          <div className="interactive-card group relative p-7 sm:p-8 rounded-xl bg-[var(--surface-container-low)] hover:bg-[var(--surface)] shadow-sm flex flex-col justify-between overflow-hidden border border-[var(--outline-variant)]/30 hover:border-[var(--primary)]/40">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-[var(--primary-container)] transition-all duration-300">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--on-surface)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                Real-time Competency Mapping
              </h3>
              <p className="text-sm text-[var(--on-surface-variant)] mb-6 leading-relaxed">
                Provides executive leadership and human capital directors deep visibility into digital readiness metrics across directorates and provincial branches.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--on-surface)]">
                  <CheckCircle className="w-4 h-4 text-[var(--secondary)] fill-[var(--secondary)]/10" />
                  <span>Heatmap Visualization of Skills</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--on-surface)]">
                  <CheckCircle className="w-4 h-4 text-[var(--secondary)] fill-[var(--secondary)]/10" />
                  <span>Strategic Workforce Planning Data</span>
                </div>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => onNavigateTab('learner-dashboard')}
              className="relative z-10 pt-4 flex items-center gap-2 text-[var(--primary)] text-sm font-semibold cursor-pointer group-hover:translate-x-1.5 transition-transform duration-300 text-left"
            >
              <span>View Telemetry Overview</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125"></div>
          </div>

        </div>
      </section>

      {/* IMMERSIVE INTERACTIVE WORKSPACE PREVIEW */}
      <section className="w-full bg-[var(--surface-container-lowest)] py-16 lg:py-20 border-y border-[var(--outline-variant)]/30 transition-colors">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--surface-container)] p-6 sm:p-10 lg:p-12 rounded-2xl flex flex-col lg:flex-row items-center gap-10 lg:gap-12 shadow-sm border border-[var(--outline-variant)]/40">
            
            {/* Left Content Description */}
            <div className="flex-1 w-full">
              <span className="text-xs text-[var(--secondary)] uppercase font-bold tracking-wider">
                Simulated Scenarios
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--on-surface)] mt-2 mb-4">
                Practice Crisis Response in Virtual Sandboxes
              </h2>
              <p className="text-sm sm:text-base text-[var(--on-surface-variant)] mb-6 leading-relaxed">
                Train against simulated critical infrastructure cyber incidents, emergency disaster communications, and large-scale public data migration initiatives in secure containerized environments.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-3 p-3.5 bg-[var(--surface)] rounded-xl shadow-sm border border-[var(--outline-variant)]/30 hover:border-[var(--primary)]/40 transition-colors">
                  <div className="p-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--on-surface)]">Zero-Risk Sandbox</div>
                    <div className="text-xs text-[var(--on-surface-variant)]">Isolated sovereign cloud nodes</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 bg-[var(--surface)] rounded-xl shadow-sm border border-[var(--outline-variant)]/30 hover:border-[var(--secondary)]/40 transition-colors">
                  <div className="p-2 rounded-lg bg-[var(--secondary)]/10 text-[var(--secondary)]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--on-surface)]">Automated Feedback</div>
                    <div className="text-xs text-[var(--on-surface-variant)]">Live telemetry and guidance</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Terminal Sandbox */}
            <div className="flex-1 w-full flex justify-center">
              <SandboxTerminal />
            </div>

          </div>
        </div>
      </section>

      {/* DEPARTMENT ONBOARDING CALL TO ACTION BANNER */}
      <section className="w-full bg-[var(--surface)] py-16 lg:py-20 transition-colors">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-container)] p-8 sm:p-12 md:p-16 text-white shadow-xl">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-white/15 backdrop-blur-sm">
                Unified Public Sector Rollout
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                Accelerate Your Directorate's Digital Maturity
              </h2>
              <p className="text-sm sm:text-base text-white/80 mb-8 leading-relaxed">
                Deploy specialized training cohorts across your division. Connect your department’s identity provider for instant SSO provisioning and administrative dashboards.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={onOpenCohortModal}
                  className="interactive-btn w-full sm:w-auto px-8 py-3.5 bg-[var(--secondary)] text-white hover:bg-[var(--secondary)]/90 font-semibold text-sm sm:text-base rounded-lg shadow-md transition-transform flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Layers className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>Register Department Cohort</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenAdvisorModal}
                  className="interactive-btn w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base rounded-lg backdrop-blur-sm border border-white/15 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Schedule Advisor Briefing</span>
                </button>
              </div>
            </div>

            {/* Decorative Ambient Shapes */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none blur-2xl"></div>
            <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-[var(--secondary)]/10 pointer-events-none blur-xl"></div>
          </div>
        </div>
      </section>

    </div>
  );
};
