import React, { useState, useEffect, useCallback } from 'react';
import { ActiveTab, AITool, FilterState } from './types';
import { toolStorage, STORAGE_CHANGE_EVENT } from './services/toolStorage';
import { analytics } from './services/analytics';
import { usePWA } from './hooks/usePWA';
import { useTheme } from './hooks/useTheme';

// Components
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { ToolDetailModal } from './components/ToolDetailModal';
import { ReportModal } from './components/ReportModal';
import { IOSInstallModal } from './components/IOSInstallModal';
import { OfflineBanner } from './components/OfflineBanner';
import { AdminDashboard } from './components/AdminDashboard';
import { CreatorModal } from './components/CreatorModal';
import { CinematicPreloader, PRELOADER_CONFIG } from './components/CinematicPreloader';
import { PWAInstallHint } from './components/PWAInstallHint';

// Views
import { HomeView } from './views/HomeView';
import { ExploreView } from './views/ExploreView';
import { CategoriesView } from './views/CategoriesView';
import { TrendingView } from './views/TrendingView';
import { NewToolsView } from './views/NewToolsView';
import { FavoritesView } from './views/FavoritesView';
import { ModesView } from './views/ModesView';
import { isSecretAdminTrigger } from './services/adminTrigger';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [tools, setTools] = useState<AITool[]>(() => toolStorage.getAllTools());
  const [favorites, setFavorites] = useState<string[]>(() => toolStorage.getFavorites());
  const [recentlyUsed, setRecentlyUsed] = useState<AITool[]>(() => toolStorage.getRecentlyUsed());

  // Administrative Authorization State (Checked against secure session storage)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('aivault_admin_auth') === 'true';
  });

  // Track if hidden trigger discovery unlocked the login gate
  const [isUnlockedGate, setIsUnlockedGate] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('aivault_admin_auth') === 'true';
  });

  const handleOpenAdminGateway = useCallback(() => {
    setIsUnlockedGate(true);
    setActiveTab('admin');
  }, []);

  // 3-Mode Theme Engine: 'default' (Kinetic Orange) | 'dark' (Cyber Stealth) | 'light' (Studio Paper)
  const { theme, setTheme, cycleTheme } = useTheme();

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'all',
    pricingType: 'all',
    requiresLogin: 'all',
    mobileFriendly: 'all',
    quickFilter: 'all',
    sortBy: 'popularity'
  });

  // Modals state
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [reportTool, setReportTool] = useState<AITool | null>(null);
  const [showCreatorModal, setShowCreatorModal] = useState(false);

  // Cinematic 5-Second Emergency Preloader State
  const [isLoadingPreloader, setIsLoadingPreloader] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    if (PRELOADER_CONFIG.SHOW_EVERY_LOAD) return true;
    return !localStorage.getItem(PRELOADER_CONFIG.STORAGE_KEY);
  });

  const handlePreloaderComplete = useCallback(() => {
    setIsLoadingPreloader(false);
    if (!PRELOADER_CONFIG.SHOW_EVERY_LOAD) {
      try {
        localStorage.setItem(PRELOADER_CONFIG.STORAGE_KEY, 'true');
      } catch {}
    }
  }, []);

  // First-visit Creator popup trigger (runs cleanly after cinematic preloader finishes)
  useEffect(() => {
    if (isLoadingPreloader) return;
    const hasSeen = localStorage.getItem('aivault_creator_popup_dismissed');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setShowCreatorModal(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isLoadingPreloader]);

  // PWA hook
  const {
    isInstallable,
    isInstalled,
    isIOS,
    isOnline,
    showIOSGuide,
    setShowIOSGuide,
    showInstallHint,
    triggerInstallHint,
    dismissInstallHint,
    promptInstall
  } = usePWA();

  // Trigger First-time PWA Installation Guidance Arrow once preloader & creator modal are clear
  useEffect(() => {
    if (isLoadingPreloader || showCreatorModal) return;
    const hintTimer = setTimeout(() => {
      triggerInstallHint();
    }, 600);
    return () => clearTimeout(hintTimer);
  }, [isLoadingPreloader, showCreatorModal, triggerInstallHint]);

  // Sync tools & state on custom storage event
  const refreshStorage = useCallback(() => {
    setTools(toolStorage.getAllTools());
    setFavorites(toolStorage.getFavorites());
    setRecentlyUsed(toolStorage.getRecentlyUsed());
  }, []);

  useEffect(() => {
    window.addEventListener(STORAGE_CHANGE_EVENT, refreshStorage);
    return () => window.removeEventListener(STORAGE_CHANGE_EVENT, refreshStorage);
  }, [refreshStorage]);

  // Deep linking: read initial URL params (e.g. ?tool=perplexity or ?cat=ai-coding)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const toolParam = params.get('tool');
      const catParam = params.get('category');
      const qParam = params.get('q');

      if (toolParam) {
        const found = toolStorage.getToolBySlug(toolParam) || toolStorage.getToolById(toolParam);
        if (found) setSelectedTool(found);
      } else if (catParam) {
        setFilters(prev => ({ ...prev, category: catParam }));
        setActiveTab('explore');
      } else if (qParam) {
        setFilters(prev => ({ ...prev, searchQuery: qParam }));
        setActiveTab('explore');
      }
    } catch {}
  }, []);

  // Update dynamic document title for SEO
  useEffect(() => {
    if (selectedTool) {
      document.title = `${selectedTool.name} — Free AI Directory | AI Vault`;
    } else {
      switch (activeTab) {
        case 'explore':
          document.title = 'Explore Free AI Tools & Directory — AI Vault';
          break;
        case 'categories':
          document.title = 'AI Categories & Ecosystem Hub — AI Vault';
          break;
        case 'trending':
          document.title = 'Trending Free AI Tools — AI Vault';
          break;
        case 'new':
          document.title = 'Recently Added AI Tools — AI Vault';
          break;
        case 'favorites':
          document.title = 'My Saved Tools — AI Vault';
          break;
        case 'modes':
          document.title = 'AI Modes — What Do You Want To Do? | AI Vault';
          break;
        case 'admin':
          document.title = 'Admin Portal — AI Vault';
          break;
        default:
          document.title = 'AI Vault — Discover Free & Free-Tier AI Tools & Websites';
      }
    }
  }, [activeTab, selectedTool]);

  // Keyboard shortcut: '/' opens search, 'Esc' closes modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setActiveTab('explore');
      } else if (e.key === 'Escape') {
        setSelectedTool(null);
        setReportTool(null);
        setShowIOSGuide(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setShowIOSGuide]);

  // Actions
  const handleToggleFavorite = (id: string) => {
    const isNowFav = toolStorage.toggleFavorite(id);
    if (isNowFav) {
      analytics.track('favorite_added', { toolId: id });
    }
  };

  const handleOpenTool = (tool: AITool) => {
    toolStorage.recordClick(tool.id);
    analytics.track('tool_opened', { toolId: tool.id, url: tool.url });
  };

  const handleSelectTool = (tool: AITool) => {
    toolStorage.recordView(tool.id);
    setSelectedTool(tool);
  };

  const handleSelectCategory = (categoryId: string) => {
    if (categoryId === 'all') {
      setActiveTab('categories');
    } else {
      setFilters(prev => ({ ...prev, category: categoryId }));
      setActiveTab('explore');
      analytics.track('category_viewed', { categoryId });
    }
  };

  const handleSelectQuickFilter = (quickFilter: string) => {
    setFilters(prev => ({
      ...prev,
      quickFilter: quickFilter as any,
      category: 'all'
    }));
    setActiveTab('explore');
    analytics.track('filter_applied', { quickFilter });
  };

  const handleSearchHero = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
    // Search Privacy: The secret admin trigger is intercepted locally.
    // It must NEVER be tracked to analytics, saved to search history, or route publicly.
    if (isSecretAdminTrigger(query)) {
      return;
    }
    if (query.trim() && activeTab !== 'explore') {
      setActiveTab('explore');
      analytics.track('search_performed', { query });
    }
  };

  return (
    <div className="min-h-screen flex flex-col theme-page-bg theme-page-text selection:bg-black selection:text-[#FF4D00] pb-safe md:pb-0">
      {/* Cinematic 5-Second Emergency Preloader */}
      {isLoadingPreloader && (
        <CinematicPreloader onComplete={handlePreloaderComplete} />
      )}

      {/* Offline banner */}
      <OfflineBanner isOnline={isOnline} />

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length}
        onOpenSearch={() => {
          setActiveTab('explore');
        }}
        isOnline={isOnline}
        isInstallable={isInstallable}
        isInstalled={isInstalled}
        onInstallClick={promptInstall}
        onOpenCreator={() => setShowCreatorModal(true)}
        isInstallHighlighted={showInstallHint && !isInstalled}
        theme={theme}
        setTheme={setTheme}
        cycleTheme={cycleTheme}
        isAdmin={isAdminAuthenticated}
      />

      {/* View router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            tools={tools}
            searchQuery={filters.searchQuery}
            setSearchQuery={handleSearchHero}
            activeQuickFilter={filters.quickFilter}
            onSelectQuickFilter={handleSelectQuickFilter}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            recentlyUsed={recentlyUsed}
            onClearRecent={() => toolStorage.clearRecentlyUsed()}
            onSelectTool={handleSelectTool}
            onOpenTool={handleOpenTool}
            onSelectCategory={handleSelectCategory}
            onViewAll={() => setActiveTab('explore')}
            isInstalled={isInstalled}
            onInstallClick={promptInstall}
            onOpenAdminLogin={handleOpenAdminGateway}
          />
        )}

        {activeTab === 'explore' && (
          <ExploreView
            tools={tools}
            filters={filters}
            setFilters={setFilters}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectTool={handleSelectTool}
            onOpenTool={handleOpenTool}
            onOpenAdminLogin={handleOpenAdminGateway}
          />
        )}

        {activeTab === 'categories' && (
          <CategoriesView
            tools={tools}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {activeTab === 'modes' && (
          <ModesView
            tools={tools}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectTool={handleSelectTool}
            onOpenTool={handleOpenTool}
          />
        )}

        {activeTab === 'trending' && (
          <TrendingView
            tools={tools}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectTool={handleSelectTool}
            onOpenTool={handleOpenTool}
          />
        )}

        {activeTab === 'new' && (
          <NewToolsView
            tools={tools}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectTool={handleSelectTool}
            onOpenTool={handleOpenTool}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesView
            tools={tools}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectTool={handleSelectTool}
            onOpenTool={handleOpenTool}
            onExploreClick={() => setActiveTab('explore')}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            onBackToHome={() => setActiveTab('home')}
            onLogout={() => {
              setIsAdminAuthenticated(false);
              setIsUnlockedGate(false);
              sessionStorage.removeItem('aivault_admin_auth');
              setActiveTab('home');
            }}
            onAuthenticated={() => {
              setIsAdminAuthenticated(true);
              setIsUnlockedGate(true);
            }}
            isUnlockedGate={isUnlockedGate || isAdminAuthenticated}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onInstallClick={promptInstall}
        isInstalled={isInstalled}
        onOpenCreator={() => setShowCreatorModal(true)}
        isAdmin={isAdminAuthenticated}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length}
        theme={theme}
        cycleTheme={cycleTheme}
        isAdmin={isAdminAuthenticated}
      />

      {/* Modals */}
      <ToolDetailModal
        tool={selectedTool}
        isOpen={Boolean(selectedTool)}
        onClose={() => setSelectedTool(null)}
        isFavorite={selectedTool ? favorites.includes(selectedTool.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onOpenReport={tool => setReportTool(tool)}
        onLaunch={handleOpenTool}
      />

      <ReportModal
        tool={reportTool}
        isOpen={Boolean(reportTool)}
        onClose={() => setReportTool(null)}
      />

      <IOSInstallModal
        isOpen={showIOSGuide}
        onClose={() => setShowIOSGuide(false)}
      />

      {/* Creator Spotlight / Welcome Modal */}
      <CreatorModal
        isOpen={showCreatorModal}
        onClose={() => setShowCreatorModal(false)}
      />

      {/* PWA First-time Installation Guidance Pointer */}
      {showInstallHint && !isInstalled && (
        <PWAInstallHint
          isIOS={isIOS}
          onInstallClick={promptInstall}
          onDismiss={dismissInstallHint}
        />
      )}

    </div>
  );
}

export default App;
