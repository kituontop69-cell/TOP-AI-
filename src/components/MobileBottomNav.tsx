import React from 'react';
import type { ActiveTab } from '../types';
import type { ThemeMode } from '../hooks/useTheme';
import { Home, Search, LayoutGrid, Heart, Sparkles, ShieldCheck, Zap, Moon, Sun } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  favoritesCount: number;
  theme?: ThemeMode;
  cycleTheme?: () => void;
  isAdmin?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  theme,
  cycleTheme,
  isAdmin = false
}) => {
  // Normal Navigation: HOME | FIND | CATS | FAVS | MODES
  // Admin Navigation (when authenticated): HOME | FIND | CATS | FAVS | MODES | ADMIN
  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'explore', label: 'FIND', icon: Search },
    { id: 'categories', label: 'CATS', icon: LayoutGrid },
    { id: 'favorites', label: 'FAVS', icon: Heart, badge: favoritesCount },
    { id: 'modes', label: 'MODES', icon: Sparkles },
    ...(isAdmin ? [{ id: 'admin' as ActiveTab, label: 'ADMIN', icon: ShieldCheck }] : [])
  ];

  return (
    <nav className="md:hidden fixed bottom-4 left-3 right-3 z-50 pointer-events-auto">
      <div className="bg-[#000000] text-white border-2 border-white/20 rounded-full px-2 py-2 shadow-2xl flex items-center justify-around">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isAdminItem = item.id === 'admin';

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center px-2 sm:px-3 py-1 rounded-full transition-all duration-150 cursor-pointer ${
                isActive
                  ? isAdminItem
                    ? 'bg-[#FF4D00] text-black font-bold'
                    : 'bg-white text-black font-bold'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 ${isAdminItem && !isActive ? 'text-[#FF4D00]' : ''}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 px-1 py-0.2 bg-[#FF4D00] text-black text-[9px] font-mono font-black rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="font-mono text-[9px] mt-0.5 tracking-tighter">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Optional Mobile Theme Quick Switcher */}
        {cycleTheme && theme && (
          <button
            onClick={cycleTheme}
            className="relative flex flex-col items-center justify-center px-2 py-1 rounded-full text-white/90 hover:text-white transition-all cursor-pointer select-none active:scale-95"
            title={`Active Theme: ${theme.toUpperCase()} (Tap to switch)`}
            aria-label="Switch theme mode"
          >
            <div className="relative">
              {theme === 'default' && <Zap className="w-4 h-4 text-[#FF4D00] fill-[#FF4D00]" />}
              {theme === 'dark' && <Moon className="w-4 h-4 text-[#00E5FF] fill-[#00E5FF]" />}
              {theme === 'light' && <Sun className="w-4 h-4 text-[#FFB703] fill-[#FFB703]" />}
            </div>
            <span className="font-mono text-[9px] mt-0.5 tracking-tighter uppercase font-bold text-[#FF4D00]">
              {theme === 'default' ? 'DEF' : theme.toUpperCase()}
            </span>
          </button>
        )}
      </div>
    </nav>
  );
};
