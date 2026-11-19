import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import { CAMPAIGN_IMAGES } from '../assets/images';
import { CampaignStats } from '../types/campaign';

export const ACTBLUE_DONATE_URL = 'https://secure.actblue.com/donate/nellie-satcher-1';

interface HeroProps {
  stats: CampaignStats | null;
  onOpenDonate: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
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

            {/* Embedded Grassroots Donation Panel */}
            <div
              id="donate"
              className="pt-6 border-t border-slate-700/60 mt-6 scroll-mt-24"
            >
              <div className="bg-navy-900/90 border border-amber-400/35 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-sm space-y-3.5 text-left">
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

                {/* Direct Contribution Callout */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={ACTBLUE_DONATE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-crimson-600 via-crimson-700 to-crimson-800 hover:from-crimson-700 hover:to-crimson-900 text-white font-bold text-sm tracking-wider uppercase shadow-xl hover:shadow-red-900/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Donate Online via ActBlue</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <p className="text-xs text-slate-300">
                    Secure, instant contribution processing. Select any custom amount.
                  </p>
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
