import React from 'react';
import { Handshake, ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import { CAMPAIGN_IMAGES } from '../assets/images';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Photo & Community Quote Frame */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100">
                <img
                  src={CAMPAIGN_IMAGES.districtmap}
                  alt="Nellie Cookie Satcher listening to District 34 community members"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>

              <div className="mt-5 bg-navy-950 text-white p-5 rounded-xl border-t-2 border-amber-400 shadow-md">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
                  <Award className="w-4 h-4" />
                  <span>The Cookie Satcher Promise</span>
                </div>
                <p className="font-serif italic text-sm text-slate-200 leading-relaxed">
                  "Quote Needed"
                </p>
                <div className="mt-2 text-xs text-amber-400 font-bold">— Nellie "Cookie" Satcher</div>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-crimson-700 uppercase tracking-widest bg-crimson-50 px-3 py-1 rounded-md">
              Experienced Leadership · Community First
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 leading-tight text-balance">
              A Dedicated Voice for District 34 Driven by Integrity &amp; Proven Results
            </h2>

            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              Nellie “Cookie” Satcher is a graduate of William Carey University with a Master’s in Business Administration and a BS in Psychology. She previously served as Human Resources Director for the City of Laurel and as Branch Director at the Mississippi Department of Employment Security (MDES). She has also led the International Association of Workforce Professionals (IAWP) as president for the state of Mississippi and as area president representing Mississippi, Alabama, and Tennessee.
            </p>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                <div className="p-2.5 bg-navy-950 text-amber-300 rounded-lg shrink-0">
                  <Handshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-navy-950">Economic Growth</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Quote Needed
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                <div className="p-2.5 bg-crimson-700 text-white rounded-lg shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-navy-950">Accountability &amp; Transperancy</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Committed to transparent governance, and keeping District 34 fully informed.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                <div className="p-2.5 bg-navy-900 text-amber-400 rounded-lg shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-navy-950">Non-Partisan Coalition</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Uniting neighbors across all backgrounds to secure state funding for district roads, schools, and healthcare.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                <div className="p-2.5 bg-amber-400 text-navy-950 rounded-lg shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-navy-950">Uplift & Empower Stronger Families</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    A leader whose family lives, works right here in the heart of our community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
