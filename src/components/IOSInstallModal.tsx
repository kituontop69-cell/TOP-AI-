import React from 'react';
import { X, Share, PlusSquare, Compass, Smartphone, Check } from 'lucide-react';

interface IOSInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IOSInstallModal: React.FC<IOSInstallModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity" 
      />

      <div className="relative w-full max-w-md bg-[#000000] text-white border-2 border-white shadow-[8px_8px_0px_#FF4D00] p-6 sm:p-7 z-10 select-none">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white text-black hover:bg-[#FF4D00] transition-colors border-2 border-black"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 bg-[#FF4D00] text-black border-2 border-white flex items-center justify-center font-display text-xl flex-shrink-0">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display text-lg font-black text-white uppercase tracking-tight">
              INSTALL ON APPLE IOS
            </h3>
            <span className="font-mono text-[10px] text-[#FF4D00] uppercase block">
              SAFARI ADD TO HOME SCREEN MANUAL
            </span>
          </div>
        </div>

        {/* Safari Notice */}
        <div className="p-3 bg-white/10 border-2 border-white/20 mb-5 font-mono text-xs text-white/90">
          <Compass className="w-4 h-4 text-[#FF4D00] inline mr-1.5" />
          <span>Apple requires launching this site inside native <strong>Safari</strong> to install.</span>
        </div>

        {/* Steps */}
        <div className="space-y-3 mb-6 font-mono text-xs">
          <div className="flex items-start gap-3 p-3 bg-white/5 border border-white/10">
            <span className="w-6 h-6 bg-[#FF4D00] text-black font-bold flex items-center justify-center flex-shrink-0">
              01
            </span>
            <div className="text-white/90">
              Open <strong className="text-white">aivault.app</strong> inside Safari.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white/5 border border-white/10">
            <span className="w-6 h-6 bg-[#FF4D00] text-black font-bold flex items-center justify-center flex-shrink-0">
              02
            </span>
            <div className="text-white/90 flex-1">
              Tap the <strong className="text-white">Share</strong> button at bottom:
              <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 bg-black text-[#FF4D00] border border-[#FF4D00] font-bold">
                <Share className="w-3.5 h-3.5" />
                <span>SHARE (SQUARE + ARROW)</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white/5 border border-white/10">
            <span className="w-6 h-6 bg-[#FF4D00] text-black font-bold flex items-center justify-center flex-shrink-0">
              03
            </span>
            <div className="text-white/90 flex-1">
              Scroll down and tap:
              <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-black font-bold">
                <PlusSquare className="w-3.5 h-3.5" />
                <span>ADD TO HOME SCREEN</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white/5 border border-white/10">
            <span className="w-6 h-6 bg-[#FF4D00] text-black font-bold flex items-center justify-center flex-shrink-0">
              04
            </span>
            <div className="text-white/90">
              Tap <strong className="text-white">ADD</strong> in top right. AI Vault will launch in native fullscreen mode.
            </div>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#FF4D00] text-black font-display text-sm uppercase tracking-tight border-2 border-black hover:bg-white transition-all shadow-[4px_4px_0px_#FFFFFF]"
        >
          CONFIRM &amp; CLOSE
        </button>

      </div>
    </div>
  );
};
