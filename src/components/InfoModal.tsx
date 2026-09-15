import React from 'react';
import { X, Shield, Lock, LifeBuoy, FileText } from 'lucide-react';

interface InfoModalProps {
  type: 'guidelines' | 'privacy' | 'helpdesk' | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[var(--surface-container-lowest)] rounded-2xl border border-[var(--outline-variant)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[var(--outline-variant)]/40 flex items-center justify-between bg-[var(--surface-container-low)]">
          <div className="flex items-center gap-2">
            {type === 'guidelines' && <FileText className="w-5 h-5 text-[var(--primary)]" />}
            {type === 'privacy' && <Lock className="w-5 h-5 text-[var(--secondary)]" />}
            {type === 'helpdesk' && <LifeBuoy className="w-5 h-5 text-[var(--primary)]" />}
            <h3 className="text-base font-bold text-[var(--on-surface)]">
              {type === 'guidelines' && 'Institutional Guidelines & Accreditation'}
              {type === 'privacy' && 'National Data Privacy & Sovereign Cloud Framework'}
              {type === 'helpdesk' && 'Civil Service Officer Helpdesk & Support'}
            </h3>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs sm:text-sm text-[var(--on-surface-variant)] leading-relaxed max-h-[400px] overflow-y-auto">
          {type === 'guidelines' && (
            <>
              <p>
                <strong>1. Standard 4.0 ISO Governance:</strong> All digital curricula, diagnostic sandbox assessments, and ministerial accreditations adhere strictly to international public sector continuous development benchmarks.
              </p>
              <p>
                <strong>2. Inter-Ministerial Federation:</strong> Member directorates share standardized competency units across boundaries, enabling cross-agency duty transfers without redundant vetting.
              </p>
              <p>
                <strong>3. Auditability:</strong> Completed simulator modules write immutable SHA-256 validation records to the governmental credential ledger.
              </p>
            </>
          )}

          {type === 'privacy' && (
            <>
              <p>
                <strong>1. Sovereign Data Isolation:</strong> No citizen data or classified ministerial telemetry ever leaves sovereign cloud boundaries.
              </p>
              <p>
                <strong>2. Zero-Knowledge Proofs:</strong> Verifiable diplomas attest to capability thresholds without revealing test casework or confidential departmental duties.
              </p>
              <p>
                <strong>3. Encryption:</strong> All sessions utilize TLS 1.3 with AES-256-GCM and post-quantum signing algorithm suites.
              </p>
            </>
          )}

          {type === 'helpdesk' && (
            <>
              <p>
                For immediate technical dispatch regarding simulator sandbox errors, smartcard PIV sync, or inter-ministerial cohort provisioning:
              </p>
              <div className="p-3 bg-[var(--surface-container-low)] rounded-xl space-y-1 font-mono text-xs text-[var(--on-surface)]">
                <div><strong>Dispatch Hotline:</strong> +1 (800) 555-GOV-HELP (Ext. 404)</div>
                <div><strong>Secure Matrix Channel:</strong> #helpdesk:matrix.transform.gov</div>
                <div><strong>Lead Technical Officer:</strong> support@transform.gov</div>
              </div>
              <p>
                Support operates 24/7 during active national disaster simulations and inter-ministerial cohorts.
              </p>
            </>
          )}
        </div>

        <div className="p-4 bg-[var(--surface-container-low)] border-t border-[var(--outline-variant)]/40 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
