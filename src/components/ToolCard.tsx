import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'motion/react';
import type { AITool } from '../types';
import { getPricingConfig } from '../utils/pricing';
import { Heart, ExternalLink, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ToolCardProps {
  tool: AITool;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenTool: (tool: AITool) => void;
  onSelectTool: (tool: AITool) => void;
  variant?: 'black' | 'orange' | 'white';
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  isFavorite,
  onToggleFavorite,
  onOpenTool,
  onSelectTool,
  variant = 'black'
}) => {
  const pricing = getPricingConfig(tool.pricingType);
  const isDark = variant === 'black';

  // 21st.dev Dynamic Cursor Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightBg = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, ${
    isDark ? 'rgba(255, 77, 0, 0.22)' : 'rgba(255, 77, 0, 0.15)'
  }, transparent 80%)`;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isFavorite;
    onToggleFavorite(tool.id);

    if (nextState) {
      try {
        confetti({
          particleCount: 25,
          spread: 45,
          colors: ['#FF4D00', '#000000', '#FFFFFF']
        });
      } catch {}
    }
  };

  const handleLaunchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenTool(tool);
    window.open(tool.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      onClick={() => onSelectTool(tool)}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5, transition: { type: 'spring', stiffness: 450, damping: 25 } }}
      whileTap={{ scale: 0.99 }}
      className={`group relative p-6 cursor-pointer border-2 overflow-hidden flex flex-col justify-between select-none ${
        isDark 
          ? 'bg-[#000000] text-[#FFFFFF] border-[#000000] hover:border-[#FF4D00] shadow-[5px_5px_0px_#000000] hover:shadow-[8px_8px_0px_#FF4D00]' 
          : 'bg-[#FFFFFF] text-[#000000] border-[#000000] shadow-[5px_5px_0px_#000000] hover:shadow-[8px_8px_0px_#000000]'
      } transition-colors duration-200`}
    >
      {/* 21st.dev Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{ background: spotlightBg }}
      />

      <div className="relative z-10">
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-current flex items-center justify-center font-display text-sm tracking-tight bg-[#FF4D00] text-[#000000] flex-shrink-0 shadow-[2px_2px_0px_#FFFFFF]">
              {tool.name.slice(0, 2).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-display text-lg sm:text-xl tracking-tight uppercase group-hover:text-[#FF4D00] transition-colors">
                  {tool.name}
                </h3>
                {tool.verified && (
                  <CheckCircle2 className="w-4 h-4 text-[#FF4D00] flex-shrink-0" />
                )}
              </div>
              {tool.developerOrCompany && (
                <span className="font-mono text-[10px] text-white/60 uppercase block">
                  BY {tool.developerOrCompany}
                </span>
              )}
            </div>
          </div>

          {/* Favorite button */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className={`p-2 rounded-full border-2 transition-all cursor-pointer ${
              isFavorite
                ? 'bg-[#FF4D00] text-black border-[#FF4D00]'
                : isDark
                  ? 'border-white/20 text-white hover:border-white'
                  : 'border-black/20 text-black hover:border-black'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-black' : ''}`} />
          </motion.button>
        </div>

        {/* Short Description */}
        <p className="font-body text-xs sm:text-sm text-slate-300 line-clamp-3 mb-5 leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Card Footer */}
      <div className="relative z-10">
        {/* Pricing badge & Login status */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold tracking-wider uppercase ${pricing.badgeBg} ${pricing.badgeText} ${pricing.badgeBorder}`}>
            {pricing.label}
          </span>

          <span className="px-2 py-0.5 rounded-full font-mono text-[10px] uppercase border border-current text-white/80">
            {tool.requiresLogin ? 'ACCOUNT REQ.' : 'NO LOGIN'}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-[10px] text-white/50 uppercase">
          {tool.tags.slice(0, 3).map(tag => (
            <span key={tag} className="border border-white/10 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/20">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectTool(tool)}
            className="flex-1 py-2 px-3 border-2 border-white/20 hover:border-white text-white font-mono text-xs font-bold uppercase transition-colors text-center rounded-full cursor-pointer"
          >
            DETAILS
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLaunchClick}
            className="flex-1 py-2 px-3 bg-[#FF4D00] hover:bg-white text-black font-display text-xs tracking-tight uppercase border-2 border-[#FF4D00] hover:border-white transition-all flex items-center justify-center gap-1.5 rounded-full cursor-pointer shadow-[2px_2px_0px_#FFFFFF]"
          >
            <span>LAUNCH</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
