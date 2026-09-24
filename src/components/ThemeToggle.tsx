import React from 'react';
import { motion } from 'motion/react';
import { Zap, Moon, Sun } from 'lucide-react';
import type { ThemeMode } from '../hooks/useTheme';

interface ThemeToggleProps {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  cycleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  cycleTheme
}) => {
  const themeOptions: Record<ThemeMode, { label: string; icon: typeof Zap; color: string; nextLabel: string }> = {
    default: {
      label: 'DEFAULT',
      icon: Zap,
      color: '#FF4D00',
      nextLabel: 'DARK'
    },
    dark: {
      label: 'DARK',
      icon: Moon,
      color: '#00E5FF',
      nextLabel: 'LIGHT'
    },
    light: {
      label: 'LIGHT',
      icon: Sun,
      color: '#FFB703',
      nextLabel: 'DEFAULT'
    }
  };

  const currentOption = themeOptions[theme] || themeOptions.default;
  const CurrentIcon = currentOption.icon;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={cycleTheme}
      className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-[#000000] text-white border-2 border-[#000000] hover:bg-white hover:text-black transition-all shadow-xl flex items-center gap-1.5 cursor-pointer select-none"
      title={`Active Theme: ${currentOption.label}. Tap to switch to ${currentOption.nextLabel} mode.`}
      aria-label={`Current Theme: ${currentOption.label}. Tap to switch to ${currentOption.nextLabel} mode.`}
    >
      <CurrentIcon 
        className="w-4 h-4 flex-shrink-0" 
        style={{ color: currentOption.color, fill: theme === 'default' ? currentOption.color : 'none' }} 
      />
      <span className="font-mono text-[10px] sm:text-xs font-black tracking-wider uppercase text-white">
        {currentOption.label}
      </span>
    </motion.button>
  );
};
