import React, { useEffect, useRef, useState, useMemo } from 'react';
import { PRELOADER_CONFIG } from './config';
import { Zap } from 'lucide-react';
import './CinematicPreloader.css';

interface CinematicPreloaderProps {
  onComplete: () => void;
}

export const CinematicPreloader: React.FC<CinematicPreloaderProps> = ({ onComplete }) => {
  // Master progress value: 0 to 100
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasFinishedRef = useRef(false);

  // Calculate current status text from master progress
  const currentStatusText = useMemo(() => {
    for (const item of PRELOADER_CONFIG.STATUS_MESSAGES) {
      if (progress <= item.threshold) {
        return item.text;
      }
    }
    return 'SYSTEM READY';
  }, [progress]);

  // Master Synchronized Animation Controller (Single clock loop)
  useEffect(() => {
    let animationFrameId: number;
    const duration = PRELOADER_CONFIG.DURATION_MS;
    const startTime = performance.now();

    // Initialize Audio without violating browser autoplay policies
    try {
      const audio = new Audio(PRELOADER_CONFIG.AUDIO_PATH);
      audio.volume = 0.9;
      audioRef.current = audio;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked by browser policy or file not yet placed - continue visually without interruption
        });
      }
    } catch {
      // Audio initialization handled safely
    }

    const updateFrame = (now: number) => {
      if (hasFinishedRef.current) return;

      const elapsed = now - startTime;
      const rawProgress = Math.min(1, Math.max(0, elapsed / duration));
      
      // Continuous progress 0 to 100 with smooth cinematic easing
      const current = rawProgress * 100;
      setProgress(current);

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(updateFrame);
      } else {
        // Exactly 5000ms reached
        triggerExit();
      }
    };

    animationFrameId = requestAnimationFrame(updateFrame);

    return () => {
      cancelAnimationFrame(animationFrameId);
      cleanupAudio();
    };
  }, []);

  const cleanupAudio = () => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = '';
      } catch {}
      audioRef.current = null;
    }
  };

  const triggerExit = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setProgress(100);
    setIsExiting(true);

    cleanupAudio();

    // Allow brief cool-white flash / smooth fade (350ms) to unveil main site
    setTimeout(() => {
      onComplete();
    }, 380);
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerExit();
  };

  // Normalized progress ratio p in [0, 1]
  const p = progress / 100;

  // Realistic Emergency Light Strobes Evaluator
  // Mathematically calculated from single master progress
  const lightValues = useMemo(() => {
    if (p >= 0.90) {
      // Final Climax Phase: Both emergency lights surge simultaneously
      const surge = Math.min(1, (p - 0.90) / 0.10);
      const flash = p >= 0.985 ? Math.sin(((p - 0.985) / 0.015) * Math.PI) : 0;
      return {
        red: 0.75 + surge * 0.25,
        blue: 0.75 + surge * 0.25,
        ambient: 0.5 + surge * 0.5,
        flash,
        flare: 0.4 + surge * 0.6
      };
    }

    // Alternating Emergency Rhythm:
    // Realistic multi-strobe sequence (Red double-pulse -> Blue double-pulse)
    // 7 alternating sweeps across the 5-second duration
    const cycle = (p * 7) % 2; // alternates between [0, 1) and [1, 2)
    let red = 0.04; // subtle residual ambient light
    let blue = 0.04;

    if (cycle < 1) {
      // Red active window: realistic dual-peak emergency strobe
      const sub = cycle;
      const pulse1 = Math.exp(-Math.pow((sub - 0.20) / 0.09, 2));
      const pulse2 = Math.exp(-Math.pow((sub - 0.52) / 0.09, 2));
      red = Math.max(pulse1, pulse2 * 1.15);
    } else {
      // Blue active window: dual-peak response strobe
      const sub = cycle - 1;
      const pulse1 = Math.exp(-Math.pow((sub - 0.20) / 0.09, 2));
      const pulse2 = Math.exp(-Math.pow((sub - 0.52) / 0.09, 2));
      blue = Math.max(pulse1, pulse2 * 1.15);
    }

    // Power ramp increases intensity smoothly towards the second half
    const powerScale = 0.45 + p * 0.55;
    const finalRed = Math.min(1, red * powerScale);
    const finalBlue = Math.min(1, blue * powerScale);

    return {
      red: finalRed,
      blue: finalBlue,
      ambient: (finalRed + finalBlue) * 0.35,
      flash: 0,
      flare: Math.max(finalRed, finalBlue) * 0.65
    };
  }, [p]);

  // Circular SVG ring geometry
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference * (1 - p);

  // Formatted 2-digit percentage
  const formattedPercent = Math.min(100, Math.floor(progress)).toString().padStart(2, '0');

  return (
    <div 
      className={`cinematic-preloader-root flex flex-col items-center justify-center transition-all duration-300 ${
        isExiting ? 'opacity-0 scale-[1.03] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      role="progressbar"
      aria-label="AI Vault System Initializing"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-live="polite"
    >
      {/* Deep Atmospheric Background & Film Vignette */}
      <div className="cinematic-atmosphere" />
      <div className="cinematic-vignette" />

      {/* Volumetric Left Red Emergency Light */}
      <div 
        className="emergency-beam-red"
        style={{
          opacity: lightValues.red,
          transform: `rotate(${6 + lightValues.red * 4}deg) skewY(-3deg) scale(${0.92 + lightValues.red * 0.12})`
        }}
      />

      {/* Volumetric Right Blue Emergency Light */}
      <div 
        className="emergency-beam-blue"
        style={{
          opacity: lightValues.blue,
          transform: `rotate(${-6 - lightValues.blue * 4}deg) skewY(3deg) scale(${0.92 + lightValues.blue * 0.12})`
        }}
      />

      {/* Screen Edge Bezel Reflections */}
      <div className="screen-rim-left" style={{ opacity: lightValues.red * 0.9 }} />
      <div className="screen-rim-right" style={{ opacity: lightValues.blue * 0.9 }} />

      {/* Anamorphic Horizontal Light Streak */}
      <div 
        className="anamorphic-flare"
        style={{ opacity: lightValues.flare * 0.7 }}
      />

      {/* Climax Flash (Brief cool-white burst at 100%) */}
      <div 
        className="climax-flash"
        style={{ opacity: lightValues.flash }}
      />

      {/* Center Environmental Bloom */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-150"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,${lightValues.ambient * 0.08}) 0%, transparent 65%)`
        }}
      />

      {/* Central HUD Core */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 max-w-lg w-full text-center">
        
        {/* AI Vault Brand Identity with dynamic red/blue environmental rim lighting */}
        <div 
          className="flex items-center gap-3 mb-8 transition-transform duration-100"
          style={{
            transform: `scale(${0.98 + p * 0.04})`,
            filter: `drop-shadow(${(-5 * lightValues.red).toFixed(1)}px 0 12px rgba(255, 30, 50, ${lightValues.red * 0.75})) drop-shadow(${(5 * lightValues.blue).toFixed(1)}px 0 12px rgba(0, 102, 255, ${lightValues.blue * 0.75}))`
          }}
        >
          <div className="w-9 h-9 rounded-full bg-[#FF4D00] flex items-center justify-center text-black font-black shadow-[0_0_18px_rgba(255,77,0,0.6)]">
            <Zap className="w-5 h-5 fill-black text-black" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-white tracking-tight uppercase">
            AI VAULT
          </h1>
        </div>

        {/* Circular Futuristic SVG Progress Ring HUD */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center my-2">
          
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 180 180">
            {/* Gradient definition: Red -> Purple -> Blue */}
            <defs>
              <linearGradient id="hudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF1E32" />
                <stop offset="50%" stopColor="#A824DC" />
                <stop offset="100%" stopColor="#0066FF" />
              </linearGradient>

              {/* Center glow filter */}
              <filter id="hudGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Inactive Outer Track */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.07)"
              strokeWidth="3.5"
            />

            {/* Inner Tech Dash Ring */}
            <circle
              cx="90"
              cy="90"
              r={radius - 9}
              fill="none"
              stroke="rgba(255, 255, 255, 0.04)"
              strokeWidth="1.5"
              strokeDasharray="3 6"
            />

            {/* Active Continuous Progress Arc */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke="url(#hudGradient)"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
              filter="url(#hudGlow)"
            />
          </svg>

          {/* Center Percentage Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
            <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tighter text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
              {formattedPercent}%
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/50 mt-1">
              STATUS CORE
            </span>
          </div>
        </div>

        {/* Dynamic System Status Indicator */}
        <div className="mt-6 flex flex-col items-center min-h-[48px] justify-center">
          <div className="flex items-center gap-2 mb-1.5">
            <span 
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: lightValues.red > lightValues.blue ? '#FF1E32' : '#0066FF',
                boxShadow: `0 0 8px ${lightValues.red > lightValues.blue ? '#FF1E32' : '#0066FF'}`
              }}
            />
            <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-white transition-opacity duration-200">
              {currentStatusText}
            </span>
          </div>

          <div className="font-mono text-[10px] text-white/40 tracking-wider">
            // RUNTIME PROTOCOL 5.0S
          </div>
        </div>

      </div>

      {/* Subtle Skip Intro Option (Unobtrusive bottom-right) */}
      <button
        onClick={handleSkip}
        className="absolute bottom-6 right-6 px-4 py-2 bg-transparent text-white/50 hover:text-white border border-white/20 hover:border-white/50 rounded-full font-mono text-[11px] font-bold tracking-wider uppercase transition-all duration-200 z-30 cursor-pointer hover:bg-white/5"
        title="Skip intro and open directory"
        aria-label="Skip cinematic intro"
      >
        SKIP INTRO →
      </button>

      {/* Bottom Subtle Build & Security Tag */}
      <div className="absolute bottom-6 left-6 font-mono text-[10px] text-white/30 hidden sm:block tracking-widest">
        SECURE VAULT GATEWAY // VERIFIED
      </div>

    </div>
  );
};
