import React, { useState } from 'react';
import { Menu, X, Heart, Shield } from 'lucide-react';
import msFlag from '../assets/images/msflag.jpg';

interface NavbarProps {
  onOpenDonate: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDonate, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-navy-950/95 backdrop-blur-md border-b border-amber-500/20 text-white shadow-lg transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="flex items-center gap-3 group shrink-0 whitespace-nowrap"
          >
            <div className="w-10 h-10 rounded-full border border-amber-400 bg-crimson-700 overflow-hidden flex items-center justify-center font-serif font-bold text-amber-300 text-base shadow-md group-hover:scale-105 transition-transform shrink-0">
              <img
                src={msFlag}
                alt="Mississippi state flag"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-white leading-tight">
                Nellie "Cookie" Satcher
              </span>
              <span className="text-[10px] md:text-xs text-amber-400 font-semibold tracking-wider uppercase">
                District 34 Senate
              </span>
            </div>
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a
              href="#about"
              className="text-slate-200 hover:text-amber-300 transition-colors whitespace-nowrap"
            >
              About Nellie
            </a>
            <a
              href="#commitments"
              className="text-slate-200 hover:text-amber-300 transition-colors whitespace-nowrap"
            >
              Commitments
            </a>
            <a
              href="#election"
              className="text-slate-200 hover:text-amber-300 transition-colors whitespace-nowrap"
            >
              Voter Hub
            </a>
            <a
              href="#events"
              className="text-slate-200 hover:text-amber-300 transition-colors whitespace-nowrap"
            >
              Events
            </a>
            <a
              href="#volunteer"
              className="text-slate-200 hover:text-amber-300 transition-colors whitespace-nowrap"
            >
              Get Involved
            </a>
          </div>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center space-x-3 shrink-0">
            <button
              onClick={onOpenAdmin}
              title="Campaign Headquarters Dashboard"
              className="px-3 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>HQ Portal</span>
            </button>
            <button
              onClick={onOpenDonate}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-crimson-600 to-crimson-700 hover:from-crimson-700 hover:to-crimson-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2 whitespace-nowrap"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Donate</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenDonate}
              className="px-3 py-1.5 rounded-lg bg-crimson-700 text-white font-bold text-xs"
            >
              Donate
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-navy-900 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-900 border-b border-amber-500/20 px-4 pt-3 pb-6 space-y-3 text-base font-medium">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-200 hover:text-amber-300 hover:bg-navy-800"
          >
            About Nellie
          </a>
          <a
            href="#commitments"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-200 hover:text-amber-300 hover:bg-navy-800"
          >
            Commitments & Platform
          </a>
          <a
            href="#election"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-200 hover:text-amber-300 hover:bg-navy-800"
          >
            Voter Hub & Precincts
          </a>
          <a
            href="#events"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-200 hover:text-amber-300 hover:bg-navy-800"
          >
            Campaign Events
          </a>
          <a
            href="#volunteer"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-200 hover:text-amber-300 hover:bg-navy-800"
          >
            Volunteer & Yard Signs
          </a>
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDonate();
              }}
              className="w-full text-center py-2.5 rounded-lg bg-crimson-700 text-white font-bold"
            >
              Donate to Campaign
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full text-center py-2 rounded-lg border border-slate-700 text-slate-300 text-xs font-semibold"
            >
              Campaign HQ Portal
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
