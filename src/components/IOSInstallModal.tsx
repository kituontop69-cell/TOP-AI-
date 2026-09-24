import React, { useEffect } from 'react';
import { X, Share, PlusSquare, Smartphone, Check, ArrowUpRight } from 'lucide-react';

interface IOSInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IOSInstallModal: React.FC<IOSInstallModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ios-modal-title"
    >
      {/* Dark backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        aria-hidden="true"
      />

      {/* Modal card: AI Vault orange background with bold black neo-brutalist framing */}
      <div className="relative w-full max-w-lg bg-[#FF4D00] text-black border-t-4 sm:border-4 border-black sm:rounded-2xl shadow-[8px_8px_0px_#000000] p-6 sm:p-8 z-10 select-none pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] pt-[calc(1.5rem+env(safe-area-inset-top,0px))] animate-in fade-in slide-in-from-bottom-6 duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black text-white hover:bg-white hover:text-black transition-colors border-2 border-black cursor-pointer shadow-[2px_2px_0px_#000000]"
          aria-label="Close installation instructions"
        >
          <X className="w-4 h-4 stroke-[3]" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 pr-8">
          <div className="w-12 h-12 bg-black text-[#FF4D00] rounded-xl border-2 border-black flex items-center justify-center font-display text-xl flex-shrink-0 shadow-[3px_3px_0px_#FFFFFF]">
            <Smartphone className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-mono text-[11px] font-black uppercase tracking-wider bg-black text-white px-2.5 py-0.5 rounded-full inline-block mb-1">
              APPLE iOS / iPADOS
            </span>
            <h3 id="ios-modal-title" className="font-display text-xl sm:text-2xl font-black text-black uppercase tracking-tight leading-none">
              INSTALL AI VAULT
            </h3>
          </div>
        </div>

        {/* Browser Guidance Note */}
        <div className="p-3 bg-black text-white rounded-xl border-2 border-black mb-5 font-mono text-xs flex items-center justify-between shadow-[3px_3px_0px_#FFFFFF]">
          <span className="text-white/90">
            Open in native <strong>Safari</strong> for full standalone experience.
          </span>
          <ArrowUpRight className="w-4 h-4 text-[#FF4D00] flex-shrink-0 ml-2" />
        </div>

        {/* Steps Cards: White/Black High-Contrast Cards */}
        <div className="space-y-3 mb-6 font-mono text-xs">
          
          {/* Step 1 */}
          <div className="flex items-center gap-3.5 p-3.5 bg-white text-black rounded-xl border-2 border-black shadow-[4px_4px_0px_#000000]">
            <span className="w-8 h-8 rounded-lg bg-black text-[#FF4D00] font-black flex items-center justify-center flex-shrink-0 font-display text-sm">
              01
            </span>
            <div className="flex-1 font-bold">
              <span>Tap the <strong className="underline decoration-[#FF4D00] decoration-2">Share</strong> button in Safari</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#FF4D00] border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_#000000]">
              <Share className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-3.5 p-3.5 bg-white text-black rounded-xl border-2 border-black shadow-[4px_4px_0px_#000000]">
            <span className="w-8 h-8 rounded-lg bg-black text-[#FF4D00] font-black flex items-center justify-center flex-shrink-0 font-display text-sm">
              02
            </span>
            <div className="flex-1 font-bold">
              <span>Scroll down and tap <strong className="underline decoration-[#FF4D00] decoration-2">Add to Home Screen</strong></span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-black border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0px_#FFFFFF]">
              <PlusSquare className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-center gap-3.5 p-3.5 bg-white text-black rounded-xl border-2 border-black shadow-[4px_4px_0px_#000000]">
            <span className="w-8 h-8 rounded-lg bg-black text-[#FF4D00] font-black flex items-center justify-center flex-shrink-0 font-display text-sm">
              03
            </span>
            <div className="flex-1 font-bold">
              <span>Tap <strong className="underline decoration-[#FF4D00] decoration-2">Add</strong> in top-right to launch standalone app</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-black border-2 border-black flex items-center justify-center text-[#FF4D00] shadow-[2px_2px_0px_#FFFFFF]">
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
          </div>

        </div>

        {/* Action Button: "GOT IT" */}
        <button
          onClick={onClose}
          className="w-full py-4 rounded-xl bg-black text-white font-display text-base uppercase tracking-tight border-2 border-black hover:bg-white hover:text-black transition-all shadow-[5px_5px_0px_#000000] active:scale-[0.98] cursor-pointer"
        >
          GOT IT, LET'S GO →
        </button>

      </div>
    </div>
  );
};
