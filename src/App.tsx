import React, { useState, useEffect, useCallback } from 'react';
import { ActiveTab, AITool, FilterState } from './types';
import { toolStorage, STORAGE_CHANGE_EVENT } from './services/toolStorage';
import { analytics } from './services/analytics';
import { usePWA } from './hooks/usePWA';

// Components
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { ToolDetailModal } from './components/ToolDetailModal';
import { ReportModal } from './components/ReportModal';
import { IOSInstallModal } from './components/IOSInstallModal';
import { OfflineBanner } from './components/OfflineBanner';
import { AdminDashboard } from './components/AdminDashboard';

// Views
import { HomeView } from './views/HomeView';
import { ExploreView } from './views/ExploreView';
import { CategoriesView } from './views/CategoriesView';
import { TrendingView } from './views/TrendingView';
import { NewToolsView } from './views/NewToolsView';
import { FavoritesView } from './views/FavoritesView';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [tools, setTools] = useState<AITool[]>(() => toolStorage.getAllTools());
  const [favorites, setFavorites] = useState<string[]>(() => toolStorage.getFavorites());
  const [recentlyUsed, setRecentlyUsed] = useState<AITool[]>(() => toolStorage.getRecentlyUsed());

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

  // PWA hook
  const {
    isInstallable,
    isInstalled,
    isIOS,
    isOnline,
    showIOSGuide,
    setShowIOSGuide,
    promptInstall
  } = usePWA();

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
    if (query.trim() && activeTab !== 'explore') {
      setActiveTab('explore');
      analytics.track('search_performed', { query });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FF4D00] text-[#000000] selection:bg-black selection:text-[#FF4D00] pb-safe md:pb-0">
      
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
          />
        )}

        {activeTab === 'categories' && (
          <CategoriesView
            tools={tools}
            onSelectCategory={handleSelectCategory}
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
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onInstallClick={promptInstall}
        isInstalled={isInstalled}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length}
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

    </div>
  );
}

export default App;
