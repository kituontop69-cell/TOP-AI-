import React, { useState } from 'react';
import type { AITool } from '../types';
import { getPricingConfig } from '../utils/pricing';
import { CATEGORIES } from '../data/categories';
import { 
  X, 
  ExternalLink, 
  Heart, 
  Share2, 
  AlertTriangle, 
  CheckCircle2, 
  Smartphone, 
  Lock, 
  Unlock, 
  Calendar, 
  Star, 
  ShieldCheck, 
  Check,
  Building,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ToolDetailModalProps {
  tool: AITool | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenReport: (tool: AITool) => void;
  onLaunch: (tool: AITool) => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({
  tool,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onOpenReport,
  onLaunch
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !tool) return null;

  const pricing = getPricingConfig(tool.pricingType);

  const categoryNames = tool.category.map(catId => {
    const found = CATEGORIES.find(c => c.id === catId || c.slug === catId);
    return found ? found.name : catId;
  });

  const handleLaunch = () => {
    onLaunch(tool);
    window.open(tool.url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    const shareData = {
      title: `${tool.name} — AI VAULT`,
      text: `${tool.name}: ${tool.description}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(tool.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    }
  };

  const handleToggleFav = () => {
    const next = !isFavorite;
    onToggleFavorite(tool.id);
    if (next) {
      try {
        confetti({
          particleCount: 25,
          spread: 45,
          colors: ['#FF4D00', '#FFFFFF', '#000000']
        });
      } catch {}
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#000000] text-white border-2 border-white shadow-[10px_10px_0px_#FF4D00] p-6 sm:p-8 z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-white text-black hover:bg-[#FF4D00] border-2 border-black transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6 pr-10">
          <div className="w-14 h-14 bg-[#FF4D00] text-black border-2 border-white flex items-center justify-center font-display text-xl tracking-tight flex-shrink-0">
            {tool.name.slice(0, 2).toUpperCase()}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl text-white tracking-tight uppercase">
                {tool.name}
              </h2>
              {tool.verified && (
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#FF4D00] text-black rounded-full">
                  VERIFIED
                </span>
              )}
            </div>

            {tool.developerOrCompany && (
              <span className="font-mono text-xs text-white/60 uppercase block mt-1">
                ORGANIZATION // {tool.developerOrCompany}
              </span>
            )}

            <div className="flex items-center gap-2 mt-3">
              <span className={`px-3 py-0.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider ${pricing.badgeBg} ${pricing.badgeText} ${pricing.badgeBorder}`}>
                {pricing.label}
              </span>

              {tool.rating && (
                <span className="font-mono text-xs text-black bg-white px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-black text-black" />
                  <span>{tool.rating.toFixed(1)}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Breakdown Callout */}
        {tool.pricingDetails && (
          <div className="mb-5 p-3.5 bg-white/5 border border-white/20 font-mono text-xs text-white/90">
            <span className="text-[#FF4D00] font-bold uppercase mr-1">[PRICING NOTE]:</span>
            <span>{tool.pricingDetails}</span>
          </div>
        )}

        {/* Descriptions */}
        <div className="mb-6 space-y-3">
          <p className="font-body text-sm sm:text-base text-white/90 leading-relaxed">
            {tool.longDescription || tool.description}
          </p>
          {tool.longDescription && (
            <p className="font-body text-xs text-white/60 leading-relaxed">
              {tool.description}
            </p>
          )}
        </div>

        {/* Key Features */}
        {tool.keyFeatures && tool.keyFeatures.length > 0 && (
          <div className="mb-6">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF4D00] mb-2.5">
              // ARCHIVE HIGHLIGHTS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tool.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 font-mono text-xs bg-white/5 p-2 border border-white/10">
                  <Check className="w-3.5 h-3.5 text-[#FF4D00] flex-shrink-0" />
                  <span className="text-white/80">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Specification Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-white/5 border border-white/10 mb-6 font-mono text-xs">
          <div>
            <span className="text-white/50 block text-[10px] uppercase">LOGIN SPEC</span>
            <span className="font-bold text-white uppercase">
              {tool.requiresLogin ? 'REQUIRED' : 'NONE (OPEN)'}
            </span>
          </div>

          <div>
            <span className="text-white/50 block text-[10px] uppercase">MOBILE SPEC</span>
            <span className="font-bold text-white uppercase">
              {tool.mobileFriendly ? 'COMPATIBLE' : 'DESKTOP'}
            </span>
          </div>

          <div>
            <span className="text-white/50 block text-[10px] uppercase">LAST AUDITED</span>
            <span className="font-bold text-white">
              {tool.lastChecked}
            </span>
          </div>

          <div>
            <span className="text-white/50 block text-[10px] uppercase">DOMAINS</span>
            <span className="font-bold text-[#FF4D00] truncate block uppercase">
              {categoryNames[0] || 'GENERAL'}
            </span>
          </div>
        </div>

        {/* Official URL Banner */}
        <div className="p-3 bg-[#FF4D00]/10 border border-[#FF4D00] mb-6 font-mono text-xs text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#FF4D00] flex-shrink-0" />
          <span>
            OFFICIAL DESTINATION: <strong className="text-[#FF4D00] underline">{tool.url}</strong>
          </span>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleLaunch}
            className="w-full sm:flex-1 py-4 px-6 bg-[#FF4D00] hover:bg-white text-black font-display text-sm sm:text-base tracking-tight uppercase border-2 border-black transition-all flex items-center justify-center gap-2 hover:scale-102 active:scale-98 shadow-[4px_4px_0px_#FFFFFF]"
          >
            <span>LAUNCH OFFICIAL SERVICE</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleToggleFav}
              className={`flex-1 sm:flex-initial py-3.5 px-5 border-2 font-mono text-xs font-bold uppercase transition-all rounded-full ${
                isFavorite
                  ? 'bg-[#FF4D00] text-black border-[#FF4D00]'
                  : 'bg-black text-white border-white hover:bg-white hover:text-black'
              }`}
            >
              {isFavorite ? 'SAVED [★]' : 'SAVE [☆]'}
            </button>

            <button
              onClick={handleShare}
              className="py-3.5 px-4 bg-black text-white hover:bg-white hover:text-black border-2 border-white font-mono text-xs font-bold uppercase transition-all rounded-full"
              title="Share tool"
            >
              {copied ? 'COPIED!' : 'SHARE'}
            </button>

            <button
              onClick={() => onOpenReport(tool)}
              className="p-3.5 bg-black text-white/60 hover:text-[#FF4D00] border-2 border-white/30 hover:border-[#FF4D00] transition-colors rounded-full"
              title="Report inaccurate information"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
