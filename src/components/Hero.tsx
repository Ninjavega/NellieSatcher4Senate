import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Clock, Heart } from 'lucide-react';
import { CAMPAIGN_IMAGES } from '../assets/images';
import { CampaignStats } from '../types/campaign';

interface HeroProps {
  stats: CampaignStats | null;
  onOpenDonate: () => void;
}

export const Hero: React.FC<HeroProps> = ({ stats, onOpenDonate }) => {
  // Target: December 22, 2026 07:00:00 AM CST
  const electionDate = new Date('December 22, 2026 07:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = electionDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        isPassed: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [electionDate]);

  return (
    <section className="relative bg-navy-950 text-white overflow-hidden min-h-[88vh] flex flex-col justify-center">
      {/* Background with Ambient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={CAMPAIGN_IMAGES.communityBackdrop}
          alt="District 34 Community Gathering"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-25 object-center"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs md:text-sm font-semibold tracking-wider">
              <span>District 34 Senate Campaign</span>
              <span aria-hidden="true">·</span>
              <span>General Election</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-balance">
              <span className="block text-white">People First.</span>
              <span className="gold-gradient-text block mt-1">Progress Always.</span>
            </h1>

            <p className="font-serif italic text-xl md:text-2xl text-slate-200 leading-snug">
              "A Stronger District 34 Through Experienced Leadership, Real Solutions &amp; A Brighter Tomorrow."
            </p>

            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Nellie "Cookie" Satcher is running for District 34 Senate to deliver transparent, community-centered representation that puts families, education, and local economic growth first.
            </p>

            {/* Main Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#volunteer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-crimson-600 via-crimson-700 to-crimson-800 hover:from-crimson-700 hover:to-crimson-900 text-white font-bold text-base shadow-xl hover:shadow-red-900/40 transition-all transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" />
                <span>Join The Campaign</span>
              </a>
              <a
                href="#commitments"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-navy-900/80 hover:bg-navy-900 border border-amber-400/40 text-amber-300 font-semibold text-base transition-all text-center backdrop-blur-sm flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                <span>View Platform Details</span>
              </a>
              <button
                onClick={onOpenDonate}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-navy-950 font-bold text-base transition-all text-center flex items-center justify-center gap-2 shadow-lg"
              >
                <Heart className="w-5 h-5 fill-navy-950" />
                <span>Donate</span>
              </button>
            </div>

            {/* Countdown Mini Block */}
            <div className="pt-6 border-t border-slate-700/60 mt-6">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs uppercase tracking-widest text-slate-300 font-semibold mb-3">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Countdown to Election Day: Tuesday, Dec 22, 2026</span>
              </div>

              {timeLeft.isPassed ? (
                <div className="text-amber-300 font-bold text-lg">
                  Election Day is Today! Polls are open 7:00 AM – 7:00 PM.
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2.5 max-w-sm mx-auto lg:mx-0 text-center font-mono tabular-nums">
                  <div className="bg-navy-900/90 border border-amber-400/25 rounded-lg p-2.5">
                    <span className="block text-2xl font-bold text-amber-300">
                      {timeLeft.days}
                    </span>
                    <span className="text-[10px] uppercase font-sans tracking-wider text-slate-400">
                      Days
                    </span>
                  </div>
                  <div className="bg-navy-900/90 border border-amber-400/25 rounded-lg p-2.5">
                    <span className="block text-2xl font-bold text-amber-300">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-sans tracking-wider text-slate-400">
                      Hours
                    </span>
                  </div>
                  <div className="bg-navy-900/90 border border-amber-400/25 rounded-lg p-2.5">
                    <span className="block text-2xl font-bold text-amber-300">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-sans tracking-wider text-slate-400">
                      Mins
                    </span>
                  </div>
                  <div className="bg-navy-900/90 border border-amber-400/25 rounded-lg p-2.5">
                    <span className="block text-2xl font-bold text-amber-300">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-sans tracking-wider text-slate-400">
                      Secs
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Candidate Portrait Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-amber-400 via-crimson-600 to-navy-700 opacity-50 blur-lg" />
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
      <div className="bg-navy-900/90 border-t border-slate-800 py-4 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Grassroots Raised</div>
            <div className="text-xl md:text-2xl font-bold text-amber-300 font-mono tabular-nums">
              ${stats ? (stats.fundsRaised).toLocaleString() : '28,450+'}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Active Volunteers</div>
            <div className="text-xl md:text-2xl font-bold text-white font-mono tabular-nums">
              {stats ? stats.volunteersCount : '188+'}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Signs Requested</div>
            <div className="text-xl md:text-2xl font-bold text-white font-mono tabular-nums">
              {stats ? stats.yardSignsRequested : '315+'}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Platform Focus</div>
            <div className="text-xl md:text-2xl font-bold text-amber-300 font-serif">
              100% Non-Partisan
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
