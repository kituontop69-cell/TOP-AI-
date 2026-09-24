import React from 'react';
import { motion } from 'motion/react';
import type { ActiveTab } from '../types';
import { 
  Search, 
  Download, 
  Heart, 
  Flame, 
  ShieldCheck, 
  WifiOff,
  Zap,
  ArrowUpRight,
  Coffee
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import type { ThemeMode } from '../hooks/useTheme';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  favoritesCount: number;
  onOpenSearch: () => void;
  isOnline: boolean;
  isInstallable: boolean;
  isInstalled: boolean;
  onInstallClick: () => void;
  onOpenCreator?: () => void;
  isInstallHighlighted?: boolean;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  cycleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  onOpenSearch,
  isOnline,
  isInstalled,
  onInstallClick,
  onOpenCreator,
  isInstallHighlighted = false,
  theme,
  setTheme,
  cycleTheme
}) => {
  const navTabs: { id: ActiveTab; label: string; count?: number }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'explore', label: 'EXPLORE' },
    { id: 'categories', label: 'CATEGORIES' },
    { id: 'trending', label: 'TRENDING' },
    { id: 'new', label: 'NEW' },
    { id: 'favorites', label: 'FAVORITES', count: favoritesCount }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pb-2 select-none pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Left: Brand Logo */}
        <motion.div 
          onClick={() => setActiveTab('home')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 cursor-pointer group bg-[#000000] text-white px-3.5 py-1.5 rounded-full border-2 border-[#000000] shadow-xl hover:bg-white hover:text-[#000000] transition-colors"
        >
          <div className="w-5 h-5 rounded-full bg-[#FF4D00] flex items-center justify-center text-black font-black text-xs">
            <Zap className="w-3 h-3 fill-black text-black" />
          </div>
          <span className="font-display text-sm tracking-tight">
            AI VAULT
          </span>
          <span className="font-mono text-[10px] text-[#FF4D00] group-hover:text-black font-bold">
            [FREE]
          </span>
        </motion.div>

        {/* Center: 21st.dev Style Floating Black Pill Dock Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#000000] border-2 border-[#000000] rounded-full p-1.5 shadow-2xl">
          {navTabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative px-3.5 py-1.5 rounded-full font-mono text-[12px] font-bold tracking-tight transition-colors z-10 select-none cursor-pointer"
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-dock-indicator"
                    className="absolute inset-0 bg-white rounded-full -z-10 shadow-[2px_2px_0px_#000000]"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className={`flex items-center gap-1 ${isActive ? 'text-[#000000]' : 'text-white hover:text-white/80'}`}>
                  {tab.label}
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className="text-[#FF4D00] font-black">
                      [{tab.count}]
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#000000] text-white border-2 border-[#000000] hover:bg-white hover:text-[#000000] font-mono text-xs font-bold transition-all shadow-xl flex items-center gap-1.5 cursor-pointer"
            title="Search directory"
            aria-label="Search directory"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">FIND</span>
          </button>

          {/* Creator Profile Button */}
          {onOpenCreator && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCreator}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#000000] text-[#FF4D00] hover:bg-[#FF4D00] hover:text-black border-2 border-[#000000] font-mono text-xs font-bold transition-all shadow-xl flex items-center gap-1.5 cursor-pointer"
              title="About the Creator (Kaushik Boruah)"
              aria-label="Creator Profile"
            >
              <img
                src="/creator-profile.png"
                alt="Kaushik"
                className="w-4 h-4 rounded-full object-cover border border-[#FF4D00]"
              />
              <span className="hidden lg:inline text-white">CREATOR</span>
            </motion.button>
          )}

          {/* Theme Mode Selector (Default / Dark / Light) */}
          <ThemeToggle
            theme={theme}
            setTheme={setTheme}
            cycleTheme={cycleTheme}
          />

          {/* Connection status badge */}
          {!isOnline && (
            <div className="flex items-center gap-1 px-2.5 py-1 bg-black text-[#FF4D00] border-2 border-black rounded-full font-mono text-[11px] font-bold">
              <WifiOff className="w-3 h-3" />
              <span>OFFLINE</span>
            </div>
          )}

          {/* Install PWA Button */}
          {!isInstalled && (
            <button
              id="pwa-header-install-btn"
              onClick={onInstallClick}
              className={`relative flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FFFFFF] text-[#000000] border-2 border-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] rounded-full font-mono text-xs font-bold shadow-xl active:scale-95 transition-all cursor-pointer ${
                isInstallHighlighted
                  ? 'ring-4 ring-black ring-offset-2 ring-offset-[#FF4D00] shadow-[0_0_20px_#000000]'
                  : ''
              }`}
              title="Install native application"
              aria-label="Install native application"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GET APP</span>
            </button>
          )}

          {/* Admin shortcut */}
          <button
            onClick={() => setActiveTab('admin')}
            className={`p-2 rounded-full border-2 border-[#000000] transition-all ${
              activeTab === 'admin'
                ? 'bg-white text-black'
                : 'bg-black text-white hover:bg-white hover:text-black'
            }`}
            title="Admin Portal"
            aria-label="Admin Portal"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
