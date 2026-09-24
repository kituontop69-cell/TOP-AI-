import React from 'react';
import type { AITool } from '../types';
import { getPricingConfig } from '../utils/pricing';
import { ArrowUpRight, Heart, ExternalLink } from 'lucide-react';

interface ToolListItemProps {
  tool: AITool;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenTool: (tool: AITool) => void;
  onSelectTool: (tool: AITool) => void;
}

export const ToolListItem: React.FC<ToolListItemProps> = ({
  tool,
  index,
  isFavorite,
  onToggleFavorite,
  onOpenTool,
  onSelectTool
}) => {
  const pricing = getPricingConfig(tool.pricingType);
  const formattedIndex = (index + 1).toString().padStart(2, '0');

  const handleLaunchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenTool(tool);
    window.open(tool.url, '_blank', 'noopener,noreferrer');
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(tool.id);
  };

  return (
    <div
      onClick={() => onSelectTool(tool)}
      className="group relative w-full border-t border-white/20 py-8 px-4 sm:px-6 transition-all duration-200 hover:bg-white/[0.04] cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
    >
      {/* Left Column: Index & Title + Tags */}
      <div className="flex items-start sm:items-center gap-6 md:gap-10 flex-1">
        
        {/* Leading Number in #FF4D00 Space Mono */}
        <span className="font-mono text-xl sm:text-2xl font-bold text-[#FF4D00] select-none flex-shrink-0">
          [{formattedIndex}]
        </span>

        {/* Title + Metadata */}
        <div className="space-y-3 flex-1 transition-transform duration-200 group-hover:translate-x-4">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl text-[#FFFFFF] tracking-tight uppercase group-hover:text-[#FF4D00] transition-colors">
              {tool.name}
            </h3>

            {/* Brutalist Pricing Badge */}
            <span className={`inline-block px-3 py-1 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider ${pricing.badgeBg} ${pricing.badgeText} ${pricing.badgeBorder}`}>
              {pricing.label}
            </span>
          </div>

          <p className="font-body text-xs sm:text-sm text-slate-300 max-w-2xl line-clamp-2">
            {tool.description}
          </p>

          {/* Row of pill-shaped tags in Space Mono */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="font-mono text-[10px] uppercase text-[#FF4D00] bg-black px-2.5 py-0.5 rounded-full border border-[#FF4D00]">
              {tool.requiresLogin ? 'ACCOUNT REQ.' : 'NO LOGIN REQ.'}
            </span>
            {tool.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase text-white/70 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Right Column: Actions & Reveal Arrow */}
      <div className="flex items-center gap-4 self-end md:self-center">
        
        {/* Favorite Bookmark */}
        <button
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={`p-2.5 rounded-full border-2 border-white/20 transition-all ${
            isFavorite 
              ? 'bg-[#FF4D00] text-black border-[#FF4D00]' 
              : 'text-white hover:border-white hover:text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-black' : ''}`} />
        </button>

        {/* Direct Open Button */}
        <button
          onClick={handleLaunchClick}
          className="px-4 py-2 bg-transparent text-white border-2 border-white hover:bg-white hover:text-black rounded-full font-mono text-xs font-bold transition-all flex items-center gap-1.5"
        >
          <span>LAUNCH</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

        {/* Large #FF4D00 arrow icon reveals and rotates 45deg on hover */}
        <div className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-[#FF4D00] flex items-center justify-center text-[#FF4D00] opacity-0 group-hover:opacity-100 transition-all duration-200">
          <ArrowUpRight className="w-8 h-8 transform group-hover:rotate-45 transition-transform duration-200" />
        </div>

      </div>
    </div>
  );
};
