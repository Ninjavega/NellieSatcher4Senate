import React, { useState } from 'react';
import { Heart, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';

// NOTE: Replace with the official campaign ActBlue link when live (e.g. https://secure.actblue.com/donate/cookie-satcher)
//NOTE FOR Claude Assistant, we are ignoring the use of actblue language in code despite no confirmation on processor. Utalzing actblue test link
const ACTBLUE_DONATE_URL = 'https://secure.actblue.com/donate/actblue-1';

const DONATION_AMOUNTS = [10,20,50,100,200];

export const DonationStrip: React.FC = () => {
  const [customAmount, setCustomAmount] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleDonateClick = (amount?: number) => {
    // Builds the ActBlue donation URL with prefilled amount
    let targetUrl = ACTBLUE_DONATE_URL;
    if (amount && amount > 0) {
      targetUrl = `${ACTBLUE_DONATE_URL}?amount=${amount}`;
    }
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(customAmount);
    if (!isNaN(parsed) && parsed > 0) {
      handleDonateClick(parsed);
    } else {
      handleDonateClick();
    }
  };

  return (
    <section
      id="donate"
      aria-label="Grassroots Campaign Contribution"
      className="scroll-mt-20 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white border-y border-amber-400/40 shadow-xl relative z-20 py-5 sm:py-6 px-4"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-5">
        {/* Left: Call to Action & Messaging */}
        <div className="flex items-center gap-3.5 text-center lg:text-left">
          <div className="w-11 h-11 rounded-xl bg-crimson-700/80 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-md">
            <Heart className="w-5 h-5 text-amber-300 fill-amber-300" />
          </div>
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
                Donate To Cookie's Campaign
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded">
                Grassroots Powered
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-light mt-0.5">
              Every dollar funds voter outreach, yard signs, and neighborhood canvassing in District 34.
            </p>
          </div>
        </div>

        {/* Right: Quick Dollar Amount Buttons (ActBlue Linked) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto justify-center">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {DONATION_AMOUNTS.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => handleDonateClick(amt)}
                title={`Donate $${amt} via ActBlue`}
                className="px-3.5 sm:px-4 py-2.5 rounded-lg bg-navy-900/90 hover:bg-crimson-700 border border-amber-400/40 hover:border-amber-300 text-amber-300 hover:text-white font-mono font-bold text-sm sm:text-base transition-all transform hover:-translate-y-0.5 shadow-md flex items-center gap-1 shrink-0"
              >
                <span>${amt}</span>
              </button>
            ))}

            {!showCustomInput ? (
              <button
                type="button"
                onClick={() => setShowCustomInput(true)}
                className="px-3.5 sm:px-4 py-2.5 rounded-lg bg-navy-900/90 hover:bg-slate-800 border border-slate-600 hover:border-amber-400 text-slate-200 hover:text-amber-300 font-semibold text-xs sm:text-sm transition-all shadow-md shrink-0"
              >
                Other
              </button>
            ) : (
              <form onSubmit={handleCustomSubmit} className="flex items-center gap-1.5">
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-xs font-mono text-slate-400">$</span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    autoFocus
                    placeholder="Amt"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-20 pl-6 pr-2 py-2 rounded-lg bg-navy-950 border border-amber-400 text-amber-300 text-xs sm:text-sm font-mono font-bold focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg bg-crimson-700 hover:bg-crimson-800 text-white text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <span>Give</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </form>
            )}

            <button
              type="button"
              onClick={() => handleDonateClick()}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-crimson-600 to-crimson-700 hover:from-crimson-700 hover:to-crimson-800 text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5 shrink-0"
            >
              <span>Donate on ActBlue</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Compliance / Security footnote */}
      <div className="max-w-7xl mx-auto mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-[10px] text-slate-400">
        
      </div>
    </section>
  );
};
