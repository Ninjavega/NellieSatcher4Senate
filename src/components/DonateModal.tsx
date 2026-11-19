import React from 'react';
import { Heart, X, ExternalLink, ShieldCheck } from 'lucide-react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ACTBLUE_DONATE_URL = 'https://secure.actblue.com/donate/nellie-satcher-1';

export const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl border-2 border-amber-400 my-8 text-center animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close donation modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 bg-crimson-100 text-crimson-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Heart className="w-7 h-7 fill-crimson-700" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 leading-tight">
          Support Nellie's Campaign
        </h3>

        <p className="text-slate-600 text-sm mt-3 leading-relaxed">
          Contributions directly fund grassroots voter outreach, neighborhood canvassing, and lawn signs across Mississippi Senate District 34.
        </p>

        <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2.5">
          <div className="flex items-start gap-2.5 text-xs text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Contributions are securely processed online.</span>
          </div>
        </div>

        <div className="space-y-3">
          <a
            href={ACTBLUE_DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-crimson-600 via-crimson-700 to-crimson-800 hover:from-crimson-700 hover:to-crimson-900 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 text-base flex items-center justify-center gap-2"
          >
            <span>Donate Online via ActBlue</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-slate-500 hover:text-slate-800 text-xs font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>

        <p className="text-[10px] text-slate-400 mt-5 border-t border-slate-100 pt-3">
          Federal & Mississippi election regulations apply. Contributions are not tax-deductible for income tax purposes.
        </p>
      </div>
    </div>
  );
};
