import React from 'react';
import type { ActiveTab } from '../types';
import { 
  Search, 
  Download, 
  Heart, 
  Flame, 
  ShieldCheck, 
  WifiOff,
  Zap,
  ArrowUpRight
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  favoritesCount: number;
  onOpenSearch: () => void;
  isOnline: boolean;
  isInstallable: boolean;
  isInstalled: boolean;
  onInstallClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  onOpenSearch,
  isOnline,
  isInstalled,
  onInstallClick
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pb-2 select-none pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Left: Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 cursor-pointer group bg-[#000000] text-white px-3.5 py-1.5 rounded-full border-2 border-[#000000] shadow-xl hover:bg-white hover:text-[#000000] transition-all"
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
        </div>

        {/* Center: Floating Black Pill Navigation (Prompt Requirement) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#000000] border-2 border-[#000000] rounded-full p-1.5 shadow-2xl">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3.5 py-1.5 rounded-full font-mono text-[12px] font-bold tracking-tight transition-all ${
              activeTab === 'home'
                ? 'bg-white text-[#000000]'
                : 'text-white hover:bg-white hover:text-[#000000]'
            }`}
          >
            HOME
          </button>

          <button
            onClick={() => setActiveTab('explore')}
            className={`px-3.5 py-1.5 rounded-full font-mono text-[12px] font-bold tracking-tight transition-all ${
              activeTab === 'explore'
                ? 'bg-white text-[#000000]'
                : 'text-white hover:bg-white hover:text-[#000000]'
            }`}
          >
            EXPLORE
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`px-3.5 py-1.5 rounded-full font-mono text-[12px] font-bold tracking-tight transition-all ${
              activeTab === 'categories'
                ? 'bg-white text-[#000000]'
                : 'text-white hover:bg-white hover:text-[#000000]'
            }`}
          >
            CATEGORIES
          </button>

          <button
            onClick={() => setActiveTab('trending')}
            className={`px-3.5 py-1.5 rounded-full font-mono text-[12px] font-bold tracking-tight transition-all ${
              activeTab === 'trending'
                ? 'bg-white text-[#000000]'
                : 'text-white hover:bg-white hover:text-[#000000]'
            }`}
          >
            TRENDING
          </button>

          <button
            onClick={() => setActiveTab('new')}
            className={`px-3.5 py-1.5 rounded-full font-mono text-[12px] font-bold tracking-tight transition-all ${
              activeTab === 'new'
                ? 'bg-white text-[#000000]'
                : 'text-white hover:bg-white hover:text-[#000000]'
            }`}
          >
            NEW
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-[12px] font-bold tracking-tight transition-all ${
              activeTab === 'favorites'
                ? 'bg-white text-[#000000]'
                : 'text-white hover:bg-white hover:text-[#000000]'
            }`}
          >
            <span>FAVORITES</span>
            {favoritesCount > 0 && (
              <span className="text-[#FF4D00] font-black">
                [{favoritesCount}]
              </span>
            )}
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#000000] text-white border-2 border-[#000000] hover:bg-white hover:text-[#000000] font-mono text-xs font-bold transition-all shadow-xl flex items-center gap-1.5"
            title="Search directory"
            aria-label="Search directory"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">FIND</span>
          </button>

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
              onClick={onInstallClick}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FFFFFF] text-[#000000] border-2 border-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] rounded-full font-mono text-xs font-bold shadow-xl active:scale-95 transition-all"
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
