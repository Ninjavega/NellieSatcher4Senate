import React from 'react';
import { Mail, Phone, MapPin, Shield } from 'lucide-react';

interface FooterProps {
  onOpenDonate: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDonate, onOpenAdmin }) => {
  return (
    <footer className="bg-navy-950 text-white border-t border-amber-500/30 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-amber-400 bg-crimson-700 flex items-center justify-center font-serif font-bold text-amber-300 text-base shadow">
                NS
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white leading-tight">
                  Nellie "Cookie" Satcher
                </h3>
                <p className="text-amber-400 text-xs font-semibold tracking-wider uppercase">
                  {/* Candidate for Mississippi State Senate District 34 */}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Candidate for Mississippi State Senate District 34 • Special Election
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>District 34 HQ · Main Street Commons</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-300">
              Campaign Links
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <a href="#about" className="hover:text-amber-300 transition-colors">
                About Nellie
              </a>
              <a href="#commitments" className="hover:text-amber-300 transition-colors">
                Platform Commitments
              </a>
              <a href="#election" className="hover:text-amber-300 transition-colors">
                Voter Hub &amp; Precincts
              </a>
              <a href="#events" className="hover:text-amber-300 transition-colors">
                Upcoming Events
              </a>
            </div>
          </div>

          {/* Campaign Actions */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-300">
              Take Action
            </h4>
            <div className="space-y-2">
              <button
                onClick={onOpenDonate}
                className="w-full py-2.5 px-4 bg-crimson-700 hover:bg-crimson-800 text-white font-bold rounded-lg text-xs tracking-wider uppercase transition-colors text-center shadow"
              >
                Donate To Campaign
              </button>
              <a
                href="https://www.sos.ms.gov/elections-voting/voter-registration-information"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2.5 px-4 bg-navy-900 hover:bg-navy-800 text-amber-300 border border-amber-400/40 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors text-center"
              >
                Register to Vote
              </a>
              <button
                onClick={onOpenAdmin}
                className="w-full py-2 px-3 text-slate-400 hover:text-slate-200 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>
        </div>

        {/* Campaign Disclosure & Disclaimer */}
        <div className="mt-8 text-center space-y-3 text-xs text-slate-400 max-w-2xl mx-auto">
          <div className="inline-block p-3 border border-slate-800 rounded-lg text-slate-300 uppercase tracking-widest font-bold text-[11px]">
            Political authorization disclaimer pending campaign approval.
          </div>
          <p className="text-[11px] text-slate-500">
            © 2026 Nellie "Cookie" Satcher. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
