import React from 'react';
import { Search, ArrowRight, CornerDownRight } from 'lucide-react';
import { RotatingScrollIndicator } from './RotatingScrollIndicator';
import { QuickFilters } from './QuickFilters';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeQuickFilter: string;
  onSelectQuickFilter: (filter: any) => void;
  totalToolsCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  activeQuickFilter,
  onSelectQuickFilter,
  totalToolsCount
}) => {
  const scrollToExplore = () => {
    const el = document.getElementById('directory-content');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#FF4D00] text-[#000000] pt-24 sm:pt-32 pb-16 border-b-2 border-[#000000] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Technical Metadata Stamp */}
        <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider mb-6 border-b-2 border-[#000000] pb-2">
          <span>SYSTEM // DISCOVERY ARCHIVE</span>
          <span className="hidden sm:inline">INDEX REVISION 2026.09</span>
          <span>EST. OPEN SOURCE</span>
        </div>

        {/* Main Giant Headline: 15vw - 16vw Archivo Black */}
        <div className="text-center my-4 sm:my-8 select-none">
          <h1 className="font-display text-[15vw] sm:text-[14vw] md:text-[13vw] font-black leading-[0.84] tracking-[-0.05em] text-[#000000] uppercase break-words">
            AI VAULT
          </h1>
          <p className="font-mono text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest mt-3 text-black">
            YOUR GATEWAY TO THE BEST FREE &amp; OPEN-ACCESS AI TOOLS
          </p>
        </div>

        {/* 2px Solid Black Border Divider */}
        <div className="border-t-2 border-[#000000] my-8 sm:my-10" />

        {/* Metadata Row with Center 144px Rotating Scroll Indicator */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 text-center md:text-left mb-10">
          
          {/* Left Metadata */}
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold uppercase tracking-wider block text-black">
              BASED IN // GLOBAL FREE ARCHIVE
            </span>
            <p className="font-mono text-xs text-black/90 uppercase leading-relaxed max-w-xs mx-auto md:mx-0">
              Unrestricted access to cutting-edge chat, coding agents, image generators, and video synthesis.
            </p>
          </div>

          {/* Center: 144px Rotating Scroll Indicator */}
          <div className="flex justify-center">
            <RotatingScrollIndicator onClick={scrollToExplore} />
          </div>

          {/* Right Metadata */}
          <div className="space-y-1 md:text-right">
            <span className="font-mono text-xs font-bold uppercase tracking-wider block text-black">
              STATUS // {totalToolsCount}+ VERIFIED LISTINGS
            </span>
            <p className="font-mono text-xs text-black/90 uppercase leading-relaxed max-w-xs mx-auto md:ml-auto md:mr-0">
              100% Free tiers &amp; open credits. No paywall traps. Direct official links only.
            </p>
          </div>

        </div>

        {/* High-Impact Brutalist Search Box */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative flex flex-col sm:flex-row items-stretch border-2 border-[#000000] bg-[#FFFFFF] shadow-[6px_6px_0px_#000000]">
            <div className="flex items-center flex-1 px-4 py-3.5 gap-3">
              <Search className="w-5 h-5 text-black flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="SEARCH ARCHIVE (E.G. 'CODING', 'KLING', 'VIDEO', 'PERPLEXITY')..."
                className="w-full bg-transparent text-[#000000] placeholder-black/50 font-mono text-xs sm:text-sm font-bold uppercase focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="font-mono text-xs font-bold uppercase bg-black text-white px-2 py-1 rounded"
                >
                  CLEAR
                </button>
              )}
            </div>

            <button
              onClick={scrollToExplore}
              className="bg-[#000000] text-white hover:bg-[#FF4D00] hover:text-black font-display text-sm tracking-tight px-6 py-3.5 border-t-2 sm:border-t-0 sm:border-l-2 border-[#000000] flex items-center justify-center gap-2 transition-colors duration-150 uppercase"
            >
              <span>DISCOVER</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex justify-center">
          <QuickFilters
            activeFilter={activeQuickFilter}
            onSelect={onSelectQuickFilter}
          />
        </div>

      </div>
    </section>
  );
};
