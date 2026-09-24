import React, { useEffect, useState, useRef, useCallback } from 'react';
import { X, Sparkles, Download, ArrowUp } from 'lucide-react';
import './PWAInstallHint.css';

interface PWAInstallHintProps {
  isIOS: boolean;
  onInstallClick: () => void;
  onDismiss: () => void;
  targetId?: string;
  autoDismissMs?: number;
}

interface ButtonCoordinates {
  centerX: number;
  bottomY: number;
  width: number;
  height: number;
}

export const PWAInstallHint: React.FC<PWAInstallHintProps> = ({
  isIOS,
  onInstallClick,
  onDismiss,
  targetId = 'pwa-header-install-btn',
  autoDismissMs = 6000
}) => {
  const [coords, setCoords] = useState<ButtonCoordinates | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dynamically calculate the bounding rectangle of the actual Download button
  const updatePosition = useCallback(() => {
    const btn = document.getElementById(targetId);
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      setCoords({
        centerX: rect.left + rect.width / 2,
        bottomY: rect.bottom,
        width: rect.width,
        height: rect.height
      });
      setIsVisible(true);
    }
  }, [targetId]);

  useEffect(() => {
    // Initial lookup with retry mechanism in case header is rendering
    updatePosition();
    let retryCount = 0;
    const retryInterval = setInterval(() => {
      updatePosition();
      retryCount++;
      if (retryCount >= 10) clearInterval(retryInterval);
    }, 150);

    // Event listeners to handle rotation, resize, and scroll dynamically
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, { passive: true });

    // Auto-dismiss timeout (6 seconds)
    dismissTimerRef.current = setTimeout(() => {
      onDismiss();
    }, autoDismissMs);

    return () => {
      clearInterval(retryInterval);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
      if (dismissTimerRef.current) {
        clearTimeout(dismissTimerRef.current);
      }
    };
  }, [updatePosition, onDismiss, autoDismissMs]);

  if (!coords || !isVisible) return null;

  // Clamped horizontal layout to guarantee no horizontal overflow on small phones
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 380;
  const cardWidth = Math.min(270, viewportWidth - 28);
  
  // Calculate card left position: centered on button, clamped within safe margins
  const idealLeft = coords.centerX - cardWidth / 2;
  const clampedLeft = Math.max(14, Math.min(viewportWidth - cardWidth - 14, idealLeft));

  // The arrow tip X coordinate relative to the card container
  const arrowTipRelativeX = Math.max(18, Math.min(cardWidth - 18, coords.centerX - clampedLeft));

  return (
    <div className="pwa-hint-overlay" aria-live="polite">
      <div 
        className="pwa-hint-container"
        style={{
          top: `${coords.bottomY + 8}px`,
          left: `${clampedLeft}px`,
          width: `${cardWidth}px`
        }}
      >
        {/* Animated Bouncing Upward Arrow Pointing Directly at Download Button */}
        <div 
          className="pwa-hint-animated-arrow flex flex-col items-center pointer-events-none"
          style={{
            position: 'absolute',
            top: '-26px',
            left: `${arrowTipRelativeX - 12}px`,
            width: '24px'
          }}
        >
          <div className="w-6 h-6 rounded-full bg-black text-[#FF4D00] border-2 border-white flex items-center justify-center shadow-[0_0_10px_rgba(255,77,0,0.8)] pwa-arrow-head">
            <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        </div>

        {/* High-Contrast Interactive Neo-Brutalist Tooltip Card */}
        <div 
          onClick={onInstallClick}
          className="pwa-hint-card p-3 relative flex items-center gap-3 select-none"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onInstallClick();
            }
          }}
          aria-label={isIOS ? 'Install AI Vault on iPhone' : 'Tap to install AI Vault app'}
        >
          {/* Icon Badge */}
          <div className="w-8 h-8 rounded-lg bg-[#FF4D00] text-black border-2 border-white flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_#FFFFFF]">
            {isIOS ? (
              <Sparkles className="w-4 h-4 fill-black stroke-black" />
            ) : (
              <Download className="w-4 h-4 stroke-[2.5]" />
            )}
          </div>

          {/* Copy and platform-specific instructions */}
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[11px] font-black uppercase text-white tracking-wider">
                {isIOS ? 'INSTALL ON iPHONE' : 'TAP TO INSTALL'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-ping" />
            </div>
            <p className="font-mono text-[10px] text-white/70 truncate mt-0.5">
              {isIOS ? 'Tap Share → Add to Home' : 'Fast Offline Native PWA'}
            </p>
          </div>

          {/* Manual Dismiss Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            className="absolute top-2 right-2 p-1 text-white/60 hover:text-white rounded-full hover:bg-white/20 transition-colors cursor-pointer"
            title="Dismiss installation hint"
            aria-label="Dismiss hint"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </div>
  );
};
