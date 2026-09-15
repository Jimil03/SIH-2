import React from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, Clock, ExternalLink } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: any) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: 'New ISO 4.0 Credential Verified',
      description: 'Your verifiable diploma for "Executive AI Governance & Public Algorithmic Oversight" is anchored on the state ledger.',
      time: '12 minutes ago',
      type: 'success',
      icon: ShieldCheck,
      actionTab: 'certification',
      actionLabel: 'View Diploma',
    },
    {
      id: 2,
      title: 'Crisis Sandbox Exercise Scheduled',
      description: 'Federal inter-ministerial cyber drill begins tomorrow at 09:00 UTC. Check your zero-trust workstation connectivity.',
      time: '2 hours ago',
      type: 'warning',
      icon: AlertTriangle,
      actionTab: 'learner-dashboard',
      actionLabel: 'Pre-flight Check',
    },
    {
      id: 3,
      title: 'Cohort Intake 2026/Q3 Active',
      description: '14 central departments have federated curricula. 1,420 new civic leaders joined the sovereign cloud module.',
      time: '1 day ago',
      type: 'info',
      icon: CheckCircle2,
      actionTab: 'courses-modules',
      actionLabel: 'Explore Modules',
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[var(--surface-container-lowest)] rounded-2xl border border-[var(--outline-variant)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[var(--outline-variant)]/40 flex items-center justify-between bg-[var(--surface-container-low)]">
          <div>
            <h3 className="text-base font-bold text-[var(--on-surface)]">
              Ministerial Dispatch & Notifications
            </h3>
            <p className="text-xs text-[var(--on-surface-variant)]">
              High-trust alerts and operational cohort dispatches
            </p>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-[420px] overflow-y-auto">
          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                className="p-3.5 rounded-xl bg-[var(--surface-container-low)] border border-[var(--outline-variant)]/30 hover:border-[var(--primary)]/40 transition-all flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-[var(--surface)] text-[var(--primary)] shadow-sm shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-[var(--secondary)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-[var(--on-surface)] truncate">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-[var(--on-surface-variant)] flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--on-surface-variant)] mt-1 leading-relaxed">
                    {item.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateToTab(item.actionTab);
                    }}
                    className="mt-2 text-xs font-semibold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{item.actionLabel}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-[var(--surface-container-low)] border-t border-[var(--outline-variant)]/40 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90"
          >
            Acknowledge All
          </button>
        </div>
      </div>
    </div>
  );
};
