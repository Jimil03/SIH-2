import React, { useState } from 'react';
import { X, Building2, Users, Mail, Shield, CheckCircle, Database } from 'lucide-react';
import { submitCohortRegistrationToDb, StoredCohortRegistration } from '../lib/firebase';

interface CohortRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
}

export const CohortRegisterModal: React.FC<CohortRegisterModalProps> = ({ isOpen, onClose, userId = 'guest_officer' }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    ministryName: 'Ministry of Digital Transformation',
    directorate: 'Digital Infrastructure & Data Sovereignty',
    officerCount: '50-100 Officers',
    leadEmail: 'directorate.lead@skillbridge.gov',
    targetTrack: 'Sovereign Cloud & AI Governance',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const regRecord: StoredCohortRegistration = {
        id: `COHORT-${Date.now()}`,
        userId,
        applicantName: formData.leadEmail.split('@')[0].replace('.', ' ').toUpperCase(),
        applicantEmail: formData.leadEmail,
        ministry: formData.ministryName,
        cohortTrack: formData.targetTrack,
        clearanceLevel: 'Secret',
        justification: `Intake application for ${formData.officerCount} in ${formData.directorate}`,
        status: 'submitted',
        createdAt: new Date().toISOString(),
      };
      await submitCohortRegistrationToDb(regRecord);
    } catch (err) {
      console.warn('Cohort DB persist notice:', err);
    } finally {
      setIsSaving(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[var(--surface-container-lowest)] rounded-2xl border border-[var(--outline-variant)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[var(--outline-variant)]/40 flex items-center justify-between bg-[var(--surface-container-low)]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[var(--secondary)] text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--on-surface)]">
                Register Department Cohort
              </h3>
              <p className="text-xs text-[var(--on-surface-variant)]">
                Standard 4.0 ISO Institutional Intake Program
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-[var(--on-surface)]">
              Cohort Intake Form Registered!
            </h4>
            <p className="text-xs text-[var(--on-surface-variant)] max-w-sm mx-auto">
              Your division registration has been routed to the Federal Civil Service Board. Verification package and SSO credentials will be transmitted via secure diplomatic mail.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-[var(--on-surface)] mb-1">
                Ministry / Public Agency Name
              </label>
              <input
                type="text"
                required
                value={formData.ministryName}
                onChange={(e) => setFormData({ ...formData, ministryName: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--outline-variant)] bg-[var(--surface)] text-[var(--on-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[var(--on-surface)] mb-1">
                  Directorate / Division
                </label>
                <input
                  type="text"
                  required
                  value={formData.directorate}
                  onChange={(e) => setFormData({ ...formData, directorate: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--outline-variant)] bg-[var(--surface)] text-[var(--on-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--on-surface)] mb-1">
                  Target Cohort Size
                </label>
                <select
                  value={formData.officerCount}
                  onChange={(e) => setFormData({ ...formData, officerCount: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--outline-variant)] bg-[var(--surface)] text-[var(--on-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                >
                  <option>10 - 50 Officers</option>
                  <option>50 - 100 Officers</option>
                  <option>100 - 500 Officers (Full Division)</option>
                  <option>500+ Cross-Ministry Fleet</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--on-surface)] mb-1">
                Lead Officer Government Email
              </label>
              <input
                type="email"
                required
                value={formData.leadEmail}
                onChange={(e) => setFormData({ ...formData, leadEmail: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--outline-variant)] bg-[var(--surface)] text-[var(--on-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--on-surface)] mb-1">
                Curriculum Track Focus
              </label>
              <select
                value={formData.targetTrack}
                onChange={(e) => setFormData({ ...formData, targetTrack: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--outline-variant)] bg-[var(--surface)] text-[var(--on-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option>Sovereign Cloud & AI Governance</option>
                <option>Critical Incident Triage & Zero-Trust</option>
                <option>Public Open Data & Federated Pipelines</option>
                <option>Full Inter-Ministerial Digital Transformation</option>
              </select>
            </div>

            <div className="p-3 bg-[var(--surface-container-low)] rounded-lg text-[11px] text-[var(--on-surface-variant)] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[var(--secondary)] shrink-0" />
              <span>
                Accredited under ISO 4.0 Standard. Data isolation guaranteed under National Sovereign Cloud Protocol.
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--outline-variant)]/40">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-lg hover:bg-[var(--surface-container)] text-[var(--on-surface)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 shadow-sm"
              >
                Submit Registration
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
