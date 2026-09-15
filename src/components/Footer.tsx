import React from 'react';
import { Shield, Lock, FileText, LifeBuoy } from 'lucide-react';

interface FooterProps {
  onOpenGuidelines?: () => void;
  onOpenPrivacy?: () => void;
  onOpenHelpdesk?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenGuidelines,
  onOpenPrivacy,
  onOpenHelpdesk,
}) => {
  return (
    <footer className="w-full bg-[var(--surface-container-low)] border-t border-[var(--outline-variant)]/40 py-10 transition-colors">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo and Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-semibold text-base text-[var(--primary)] tracking-tight">
            Skill Bridge
          </span>
          <span className="hidden sm:inline text-[var(--outline-variant)]">|</span>
          <span className="text-[var(--on-surface-variant)] text-xs">
            © 2026 Ministry for Digital Transformation. All institutional rights reserved.
          </span>
        </div>

        {/* Institutional Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-medium text-[var(--on-surface-variant)]">
          <button
            type="button"
            onClick={onOpenGuidelines}
            className="hover:text-[var(--on-surface)] transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Institutional Guidelines</span>
          </button>

          <button
            type="button"
            onClick={onOpenPrivacy}
            className="hover:text-[var(--on-surface)] transition-colors flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Data Privacy Framework</span>
          </button>

          <button
            type="button"
            onClick={onOpenHelpdesk}
            className="hover:text-[var(--on-surface)] transition-colors flex items-center gap-1.5"
          >
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Officer Helpdesk</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
