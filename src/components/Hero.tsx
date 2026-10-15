import React, { useState } from 'react';
import { Vote, Heart, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import { CAMPAIGN_IMAGES } from '../assets/images';
import { CampaignStats } from '../types/campaign';

// NOTE: Replace with the official campaign ActBlue link when live (e.g. https://secure.actblue.com/donate/cookie-satcher)
const ACTBLUE_DONATE_URL = 'https://secure.actblue.com/donate/actblue-1';

const DONATION_AMOUNTS = [10, 25, 50, 100, 250];

interface HeroProps {
  stats: CampaignStats | null;
  onOpenDonate: () => void;
}

export const Hero: React.FC<HeroProps> = ({ stats, onOpenDonate }) => {
  const [customAmount, setCustomAmount] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleDonateClick = (amount?: number) => {
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

  const scrollToDonate = () => {
    const el = document.getElementById('donate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-navy-950 text-white overflow-hidden min-h-[88vh] flex flex-col justify-center">
      {/* Background with Ambient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={CAMPAIGN_IMAGES.backgroundimg}
          alt="Mississippi State Capitol Building"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-50 object-center"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs md:text-sm font-semibold tracking-wider">
              <span className="flex items-center gap-1.5 text-[10px] md:text-xs text-amber-400 font-semibold tracking-wider uppercase">
  Candidate for Mississippi State Senate — District 34
</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-balance">
              <span className="block text-white">Leadership,</span>
              <span className="gold-gradient-text block mt-1">Experience & Commitment.</span>
            </h1>

            <p className="font-serif italic text-xl md:text-2xl text-slate-200 leading-snug">
              "A Stronger District 34 Through Experienced Leadership, Real Solutions &amp; A Brighter Tomorrow."
            </p>

            {/* Main Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="https://www.sos.ms.gov/elections-voting/voter-registration-information"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-crimson-600 via-crimson-700 to-crimson-800 hover:from-crimson-700 hover:to-crimson-900 text-white font-bold text-base shadow-xl hover:shadow-red-900/40 transition-all transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
              >
                <Vote className="w-5 h-5" />
                <span>Register to Vote</span>
              </a>
              <button
                onClick={scrollToDonate}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-navy-900/80 hover:bg-navy-900 border border-amber-400/40 text-amber-300 font-semibold text-base transition-all text-center backdrop-blur-sm flex items-center justify-center gap-2 shadow-lg hover:-translate-y-0.5"
              >
                <Heart className="w-5 h-5 fill-amber-300" />
                <span>Donate</span>
              </button>
            </div>

            {/* Embedded Grassroots Donation Panel (Replaces Countdown) */}
            <div
              id="donate"
              className="pt-6 border-t border-slate-700/60 mt-6 scroll-mt-24"
            >
              <div className="bg-navy-900/90 border border-amber-400/35 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-sm space-y-3.5 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-crimson-700/80 border border-amber-400/40 flex items-center justify-center shrink-0">
                      <Heart className="w-5 h-5 text-amber-300 fill-amber-300" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                        Help Fuel Cookie's Campaign
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-300">
                        Every dollar counts towards a better tomorrow
                      </p>
                    </div>
                  </div>
                  <span className="self-start sm:self-auto text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded">
                    Null
                  </span>
                </div>

                {/* Preset Dollar Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  {DONATION_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleDonateClick(amt)}
                      title={`Donate $${amt} via ActBlue`}
                      className="flex-1 min-w-[50px] py-2 px-2.5 rounded-lg bg-navy-950 hover:bg-crimson-700 border border-amber-400/40 hover:border-amber-300 text-amber-300 hover:text-white font-mono font-bold text-sm sm:text-base transition-all transform hover:-translate-y-0.5 shadow flex items-center justify-center"
                    >
                      ${amt}
                    </button>
                  ))}

                  {!showCustomInput ? (
                    <button
                      type="button"
                      onClick={() => setShowCustomInput(true)}
                      className="py-2 px-3 rounded-lg bg-navy-950 hover:bg-slate-800 border border-slate-600 hover:border-amber-400 text-slate-200 hover:text-amber-300 text-xs sm:text-sm font-semibold transition-all shadow"
                    >
                      Other
                    </button>
                  ) : (
                    <form onSubmit={handleCustomSubmit} className="flex items-center gap-1.5">
                      <div className="relative">
                        <span className="absolute left-2 top-2 text-xs font-mono text-slate-400">$</span>
                        <input
                          type="number"
                          min="1"
                          step="1"
                          autoFocus
                          placeholder="Amt"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="w-16 pl-5 pr-1 py-1.5 rounded-lg bg-navy-950 border border-amber-400 text-amber-300 text-xs font-mono font-bold focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-2.5 py-1.5 rounded-lg bg-crimson-700 hover:bg-crimson-800 text-white text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <span>Give</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </form>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDonateClick()}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gradient-to-r from-crimson-600 to-crimson-700 hover:from-crimson-700 hover:to-crimson-800 text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <span>More Options To Give</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-[10px] text-slate-400">
                  
                
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Candidate Portrait Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 sm:-inset-2 rounded-2xl bg-gradient-to-tr from-amber-400 via-crimson-600 to-navy-700 opacity-50 blur-md sm:blur-lg" />
              <div className="relative rounded-2xl overflow-hidden border border-amber-400/50 shadow-2xl bg-navy-900 aspect-[3/4]">
                <img
                  src={CAMPAIGN_IMAGES.portrait}
                  alt="Nellie Cookie Satcher Candidate for District 34 Senate"
                  referrerPolicy="no-referrer"
                  className="w-[210%] h-full max-w-none object-cover object-top -translate-x-[52%] hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-transparent p-6 text-center">
                  <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
                    Nellie "Cookie" Satcher
                  </h2>
                  <p className="text-amber-300 text-xs font-semibold tracking-wider uppercase mt-1">
                    Candidate for State Senate · District 34
                  </p>
                  <p className="text-slate-300 text-xs italic mt-1 font-serif">
                    "Together We Can Make a Difference!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Impact Strip */}
      
    </section>
  );
};
