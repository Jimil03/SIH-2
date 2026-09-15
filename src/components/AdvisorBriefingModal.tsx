import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle, ShieldCheck } from 'lucide-react';

interface AdvisorBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdvisorBriefingModal: React.FC<AdvisorBriefingModalProps> = ({ isOpen, onClose }) => {
  const [scheduled, setScheduled] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2026-09-22');
  const [selectedTime, setSelectedTime] = useState('10:00 AM UTC');

  if (!isOpen) return null;

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduled(true);
    setTimeout(() => {
      setScheduled(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[var(--surface-container-lowest)] rounded-2xl border border-[var(--outline-variant)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[var(--outline-variant)]/40 flex items-center justify-between bg-[var(--surface-container-low)]">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[var(--primary)]" />
            <h3 className="text-base font-bold text-[var(--on-surface)]">
              Schedule Advisor Briefing
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

        {scheduled ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[var(--on-surface)]">
              Briefing Session Confirmed!
            </h4>
            <p className="text-xs text-[var(--on-surface-variant)]">
              A ministerial advisor invitation has been dispatched to your calendar with zero-trust video mesh link.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSchedule} className="p-5 space-y-4">
            <p className="text-xs text-[var(--on-surface-variant)] leading-relaxed">
              Connect directly with a Senior Fellow from the Ministry Digital Transformation Advisory Board to tailor a capability roadmap for your team.
            </p>

            <div>
              <label className="block text-xs font-semibold text-[var(--on-surface)] mb-1">
                Preferred Briefing Date
              </label>
              <input
                type="date"
                required
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--outline-variant)] bg-[var(--surface)] text-[var(--on-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--on-surface)] mb-1">
                Time Slot
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--outline-variant)] bg-[var(--surface)] text-[var(--on-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option>09:00 AM UTC (Brussels / Geneva / London)</option>
                <option>11:30 AM UTC (Morning Executive Window)</option>
                <option>02:00 PM UTC (Washington / Ottawa / Berlin)</option>
                <option>04:30 PM UTC (Late Afternoon Strategic Review)</option>
              </select>
            </div>

            <div className="p-3 bg-[var(--surface-container-low)] rounded-lg text-xs text-[var(--on-surface-variant)] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--secondary)] shrink-0" />
              <span>Conducted on sovereign encrypted communications bridge.</span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[var(--outline-variant)]/40">
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
                Confirm Briefing
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
