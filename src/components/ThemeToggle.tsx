import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Moon, Sun, Check } from 'lucide-react';
import type { ThemeMode } from '../hooks/useTheme';

interface ThemeToggleProps {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  cycleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  setTheme,
  cycleTheme
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popup if clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeOptions: { id: ThemeMode; label: string; desc: string; icon: typeof Zap; color: string }[] = [
    {
      id: 'default',
      label: 'DEFAULT',
      desc: 'Kinetic Orange Signature',
      icon: Zap,
      color: '#FF4D00'
    },
    {
      id: 'dark',
      label: 'DARK',
      desc: 'Stealth Cyber Black',
      icon: Moon,
      color: '#00E5FF'
    },
    {
      id: 'light',
      label: 'LIGHT',
      desc: 'Studio Clean Paper',
      icon: Sun,
      color: '#FFB703'
    }
  ];

  const currentOption = themeOptions.find(t => t.id === theme) || themeOptions[0];
  const CurrentIcon = currentOption.icon;

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Main Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        onContextMenu={(e) => {
          e.preventDefault();
          cycleTheme();
        }}
        className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#000000] text-white border-2 border-[#000000] hover:bg-white hover:text-black font-mono text-xs font-bold transition-all shadow-xl flex items-center gap-1.5 cursor-pointer"
        title={`Current Theme: ${currentOption.label} (Click to change)`}
        aria-label={`Theme mode: ${currentOption.label}`}
        aria-expanded={isOpen}
      >
        <CurrentIcon 
          className="w-4 h-4" 
          style={{ color: currentOption.color, fill: currentOption.id === 'default' ? currentOption.color : 'none' }} 
        />
        <span className="hidden xl:inline text-white font-black tracking-wider">
          {currentOption.label}
        </span>
      </motion.button>

      {/* 3-Mode Popover Segmented Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 w-56 p-2 bg-[#000000] text-white border-2 border-white rounded-2xl shadow-[6px_6px_0px_#FF4D00] z-50 select-none"
          >
            <div className="px-3 py-1.5 border-b border-white/20 mb-1 flex items-center justify-between">
              <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#FF4D00]">
                // COLOR THEME
              </span>
              <span className="font-mono text-[9px] text-white/50">
                3 MODES
              </span>
            </div>

            <div className="space-y-1">
              {themeOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = theme === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setTheme(opt.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl font-mono text-xs text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white text-black font-black shadow-[2px_2px_0px_#FF4D00]'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div 
                        className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
                          isSelected ? 'border-black bg-black' : 'border-white/20 bg-white/5'
                        }`}
                      >
                        <Icon 
                          className="w-3.5 h-3.5" 
                          style={{ color: opt.color, fill: opt.id === 'default' ? opt.color : 'none' }} 
                        />
                      </div>
                      <div>
                        <div className="font-bold tracking-tight leading-tight">
                          {opt.label}
                        </div>
                        <div className={`text-[10px] ${isSelected ? 'text-black/70' : 'text-white/50'}`}>
                          {opt.desc}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 stroke-[3] text-[#FF4D00]" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
