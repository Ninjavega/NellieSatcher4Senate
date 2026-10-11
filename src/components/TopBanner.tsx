import React from 'react';

export const TopBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-navy-950 via-crimson-800 to-navy-950 text-white text-xs md:text-sm py-2.5 px-4 text-center font-semibold tracking-wider border-b border-amber-400/30">
      <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-2 md:gap-3">
        <a
          href="#donate"
          className="bg-amber-400 hover:bg-amber-300 text-navy-950 text-[10px] md:text-xs px-2.5 py-0.5 rounded font-black tracking-widest uppercase transition-colors shadow-sm"
        >
          DONATE
        </a>
        <span className="tracking-widest">
          OUR COMMUNITY ★ OUR PEOPLE ★ OUR PRIORITIES
        </span>
        
      </div>
    </div>
  );
};
