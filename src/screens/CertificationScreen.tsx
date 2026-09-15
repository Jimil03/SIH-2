import React, { useState } from 'react';
import { CREDENTIALS_LIST } from '../data/mockData';
import { CredentialRecord } from '../types';
import { 
  ShieldCheck, 
  QrCode, 
  Hash, 
  Search, 
  CheckCircle2, 
  ExternalLink, 
  Download, 
  Printer, 
  X, 
  Award, 
  Lock, 
  Cpu, 
  Calendar 
} from 'lucide-react';

export const CertificationScreen: React.FC = () => {
  const [credentials, setCredentials] = useState<CredentialRecord[]>(CREDENTIALS_LIST);
  const [inspectCert, setInspectCert] = useState<CredentialRecord | null>(null);
  const [verifyInput, setVerifyInput] = useState('CAP-2026-SOV-8492');
  const [verificationResult, setVerificationResult] = useState<{
    status: 'idle' | 'verifying' | 'verified' | 'not_found';
    record?: CredentialRecord;
  }>({ status: 'idle' });

  const handleRunVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyInput.trim()) return;

    setVerificationResult({ status: 'verifying' });
    setTimeout(() => {
      const match = credentials.find(
        (c) => c.serialNumber.toLowerCase() === verifyInput.trim().toLowerCase()
      );
      if (match) {
        setVerificationResult({ status: 'verified', record: match });
      } else {
        setVerificationResult({ status: 'not_found' });
      }
    }, 600);
  };

  return (
    <div className="w-full min-h-screen py-8 sm:py-12 bg-[var(--surface)] text-[var(--on-surface)] transition-colors">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-container)] text-[var(--primary)] text-xs font-semibold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Public Key Infrastructure (PKI) Ledger</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--on-surface)] tracking-tight">
            Cryptographic Credentials & Accreditation
          </h1>
          <p className="text-sm sm:text-base text-[var(--on-surface-variant)] mt-2 max-w-2xl leading-relaxed">
            Tamper-proof verifiable diplomas integrated with open government public key infrastructure. Verified by third-party agency auditors and cryptographic state ledgers.
          </p>
        </div>

        {/* Interactive Verification Endpoint Banner */}
        <div className="bg-[var(--surface-container-low)] p-6 sm:p-8 rounded-2xl border border-[var(--outline-variant)]/40 shadow-sm">
          <div className="max-w-2xl">
            <h2 className="text-lg font-bold text-[var(--on-surface)] mb-1 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[var(--primary)]" />
              <span>Instant QR & Serial Verification Endpoint</span>
            </h2>
            <p className="text-xs sm:text-sm text-[var(--on-surface-variant)] mb-4 leading-relaxed">
              Inter-agency recruiters and directorates can audit digital credentials against the cryptographic state consensus ledger.
            </p>

            <form onSubmit={handleRunVerify} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" />
                <input
                  type="text"
                  value={verifyInput}
                  onChange={(e) => setVerifyInput(e.target.value)}
                  placeholder="Enter credential serial (e.g. CAP-2026-SOV-8492)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[var(--surface)] border border-[var(--outline-variant)]/50 text-[var(--on-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs sm:text-sm font-semibold hover:opacity-90 shadow-sm flex items-center justify-center gap-2 shrink-0"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Audit on Ledger</span>
              </button>
            </form>

            {/* Live Verification Output */}
            {verificationResult.status === 'verifying' && (
              <div className="mt-4 p-3.5 bg-[var(--surface)] rounded-xl border border-[var(--outline-variant)]/30 text-xs text-[var(--on-surface-variant)] animate-pulse flex items-center gap-2 font-mono">
                <Cpu className="w-4 h-4 text-[var(--primary)] animate-spin" />
                <span>Querying 34 federated validator nodes & computing Merkle tree hash...</span>
              </div>
            )}

            {verificationResult.status === 'verified' && verificationResult.record && (
              <div className="mt-4 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/30 text-xs space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    IMMUTABLE RECORD VALIDATED: GENUINE
                  </span>
                  <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-300">
                    Block #{verificationResult.record.ledgerBlockHeight}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px] text-[var(--on-surface)]">
                  <div><strong>Awarded to:</strong> {verificationResult.record.recipientName} ({verificationResult.record.recipientGovId})</div>
                  <div><strong>Issuing Body:</strong> {verificationResult.record.issuingMinistry}</div>
                  <div className="sm:col-span-2 truncate"><strong>Signature Hash:</strong> {verificationResult.record.sha256Hash}</div>
                </div>
              </div>
            )}

            {verificationResult.status === 'not_found' && (
              <div className="mt-4 p-3.5 bg-rose-500/10 rounded-xl border border-rose-500/30 text-xs text-rose-600 dark:text-rose-400">
                No matching diploma found with serial <strong>{verifyInput}</strong>. Ensure serial matches registered certificate format.
              </div>
            )}
          </div>
        </div>

        {/* Verifiable Credentials List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {credentials.map((cert) => (
            <div
              key={cert.id}
              className="interactive-card bg-[var(--surface-container-low)] rounded-2xl p-6 border border-[var(--outline-variant)]/40 shadow-sm flex flex-col justify-between group"
            >
              <div>
                {/* Header Stamp */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    {cert.status}
                  </span>
                  <span className="text-[11px] font-mono text-[var(--on-surface-variant)]">
                    {cert.serialNumber}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[var(--on-surface)] mb-2 group-hover:text-[var(--primary)] transition-colors leading-snug">
                  {cert.title}
                </h3>

                <p className="text-xs text-[var(--on-surface-variant)] mb-4">
                  {cert.issuingMinistry}
                </p>

                {/* Cryptographic metadata box */}
                <div className="p-3 bg-[var(--surface)] rounded-xl border border-[var(--outline-variant)]/30 space-y-1.5 text-[11px] font-mono text-[var(--on-surface-variant)] mb-4">
                  <div className="flex justify-between">
                    <span>Standard:</span>
                    <span className="font-bold text-[var(--on-surface)]">{cert.isoStandard}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Issued:</span>
                    <span>{cert.issuanceDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Block Height:</span>
                    <span className="text-[var(--primary)]">#{cert.ledgerBlockHeight}</span>
                  </div>
                  <div className="truncate pt-1 text-[10px] text-slate-400">
                    Hash: {cert.sha256Hash.substring(0, 24)}...
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--outline-variant)]/40 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setInspectCert(cert)}
                  className="text-xs font-semibold text-[var(--primary)] hover:underline flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>View Digital Diploma</span>
                </button>

                <div className="p-2 rounded-lg bg-[var(--surface-container)] text-[var(--on-surface)] hover:bg-[var(--surface-container-high)] cursor-pointer" title="Scan QR Verification">
                  <QrCode className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Diploma Viewer Modal */}
      {inspectCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-xl bg-[var(--surface-container-lowest)] rounded-2xl border-2 border-[var(--primary)] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Certificate Header */}
            <div className="p-4 bg-[var(--primary)] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--secondary)]" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Sovereign Digital Credential Registry
                </span>
              </div>
              <button
                type="button"
                onClick={() => setInspectCert(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Official Diploma Frame */}
            <div className="p-8 text-center space-y-4 bg-gradient-to-b from-[var(--surface)] to-[var(--surface-container-low)] relative">
              <div className="w-16 h-16 rounded-full bg-[var(--primary-container)] text-white flex items-center justify-center mx-auto shadow-md">
                <Award className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--secondary)]">
                  Ministry Digital Transformation & Capacity Initiative
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--on-surface)]">
                  Certificate of Ministerial Competency
                </h3>
                <p className="text-xs text-[var(--on-surface-variant)]">
                  This official verifiable credential is conferred upon
                </p>
              </div>

              <div className="py-2">
                <span className="text-xl font-bold text-[var(--primary)] tracking-tight">
                  {inspectCert.recipientName}
                </span>
                <div className="text-xs font-mono text-[var(--on-surface-variant)] mt-0.5">
                  {inspectCert.recipientGovId} • {inspectCert.issuingMinistry}
                </div>
              </div>

              <div className="p-4 bg-[var(--surface-container-lowest)] rounded-xl border border-[var(--outline-variant)]/40 shadow-sm max-w-md mx-auto">
                <div className="text-sm font-bold text-[var(--on-surface)]">
                  {inspectCert.title}
                </div>
                <div className="text-xs text-[var(--secondary)] font-semibold mt-1">
                  {inspectCert.isoStandard}
                </div>
              </div>

              {/* QR & Hash Stamp */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--outline-variant)]/40 text-left font-mono text-[10px] text-[var(--on-surface-variant)]">
                <div className="space-y-0.5">
                  <div>Serial: <strong>{inspectCert.serialNumber}</strong></div>
                  <div>Issuance: {inspectCert.issuanceDate}</div>
                  <div>Block: #{inspectCert.ledgerBlockHeight}</div>
                </div>
                <div className="w-16 h-16 bg-white p-1 rounded-lg border border-slate-300 shadow-sm flex items-center justify-center">
                  <QrCode className="w-14 h-14 text-slate-800" />
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-[var(--surface-container-low)] border-t border-[var(--outline-variant)]/40 flex items-center justify-between">
              <span className="text-[11px] text-[var(--on-surface-variant)]">
                Tamper-Evident SHA-256 Ledger Verified
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert('Certificate PDF generated and signed cryptographically.')}
                  className="px-3 py-1.5 rounded-lg border border-[var(--outline-variant)] text-xs font-semibold hover:bg-[var(--surface-container)] flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInspectCert(null)}
                  className="px-4 py-1.5 rounded-lg bg-[var(--primary)] text-white text-xs font-semibold hover:opacity-90"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
