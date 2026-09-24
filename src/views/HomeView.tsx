import React from 'react';
import type { AITool } from '../types';
import { Hero } from '../components/Hero';
import { SkewedMarquee } from '../components/SkewedMarquee';
import { ToolListItem } from '../components/ToolListItem';
import { ToolCard } from '../components/ToolCard';
import { CategoryCard } from '../components/CategoryCard';
import { CATEGORIES } from '../data/categories';
import { 
  Flame, 
  History, 
  Trash2, 
  ArrowRight,
  Code,
  Film,
  Unlock,
  Sparkles,
  Layers
} from 'lucide-react';

interface HomeViewProps {
  tools: AITool[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeQuickFilter: string;
  onSelectQuickFilter: (filter: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  recentlyUsed: AITool[];
  onClearRecent: () => void;
  onSelectTool: (tool: AITool) => void;
  onOpenTool: (tool: AITool) => void;
  onSelectCategory: (categoryId: string) => void;
  onViewAll: () => void;
  isInstalled: boolean;
  onInstallClick: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  tools,
  searchQuery,
  setSearchQuery,
  activeQuickFilter,
  onSelectQuickFilter,
  favorites,
  onToggleFavorite,
  recentlyUsed,
  onClearRecent,
  onSelectTool,
  onOpenTool,
  onSelectCategory,
  onViewAll
}) => {
  const trendingTools = tools.filter(t => t.trending).slice(0, 6);
  const freeNoLoginTools = tools.filter(t => !t.requiresLogin && (t.pricingType === 'free' || t.pricingType === 'open-source')).slice(0, 6);
  const codingTools = tools.filter(t => t.category.includes('ai-coding') || t.category.includes('developer-tools')).slice(0, 6);
  const videoTools = tools.filter(t => t.category.includes('ai-video')).slice(0, 6);

  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat.id] = tools.filter(t => t.category.includes(cat.id) || t.category.includes(cat.slug)).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="theme-page-bg theme-page-text space-y-0 select-none">
      
      {/* 1. Typographic Hero Section */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeQuickFilter={activeQuickFilter}
        onSelectQuickFilter={onSelectQuickFilter}
        totalToolsCount={tools.length}
      />

      {/* 2. Skewed Infinite Marquee Section (-2deg, 2 Rows) */}
      <SkewedMarquee />

      {/* Main Container Content */}
      <div id="directory-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        
        {/* 3. Recently Used Section (If Any) */}
        {recentlyUsed.length > 0 && (
          <section className="bg-[#000000] text-white border-2 border-[#000000] p-6 sm:p-8 shadow-[8px_8px_0px_#000000]">
            <div className="flex items-center justify-between gap-4 mb-6 border-b-2 border-white/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FF4D00] text-black">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl text-white uppercase tracking-tight">
                    RECENTLY LAUNCHED
                  </h2>
                  <span className="font-mono text-xs text-[#FF4D00] uppercase">
                    LOCAL RUNTIME HISTORY
                  </span>
                </div>
              </div>

              <button
                onClick={onClearRecent}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-white/30 hover:border-[#FF4D00] text-white/70 hover:text-[#FF4D00] font-mono text-xs uppercase transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">PURGE HISTORY</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentlyUsed.slice(0, 3).map(tool => (
                <ToolCard
                  key={`recent-${tool.id}`}
                  tool={tool}
                  isFavorite={favorites.includes(tool.id)}
                  onToggleFavorite={onToggleFavorite}
                  onOpenTool={onOpenTool}
                  onSelectTool={onSelectTool}
                  variant="black"
                />
              ))}
            </div>
          </section>
        )}

        {/* 4. Vertical Service List Section: Featured AI Discoveries (Prompt Requirement) */}
        <section className="bg-[#000000] text-white border-2 border-[#000000] shadow-[10px_10px_0px_#000000] p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b-2 border-white/20">
            <div>
              <span className="font-mono text-xs font-bold text-[#FF4D00] uppercase tracking-widest block mb-1">
                // ARCHIVE FEED // CURATED SELECTION
              </span>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
                FEATURED AI TOOLS
              </h2>
            </div>

            <button
              onClick={onViewAll}
              className="px-6 py-3 rounded-full bg-white text-black hover:bg-[#FF4D00] hover:text-black font-display text-xs sm:text-sm uppercase tracking-tight transition-all self-start md:self-auto flex items-center gap-2"
            >
              <span>EXPLORE ALL {tools.length} TOOLS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive List with leading number and reveal arrow */}
          <div className="divide-y divide-white/20">
            {tools.slice(0, 8).map((tool, idx) => (
              <ToolListItem
                key={tool.id}
                tool={tool}
                index={idx}
                isFavorite={favorites.includes(tool.id)}
                onToggleFavorite={onToggleFavorite}
                onOpenTool={onOpenTool}
                onSelectTool={onSelectTool}
              />
            ))}
          </div>
        </section>

        {/* 5. Trending Tools Grid */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b-2 border-[#000000]">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-black block mb-1">
                // TOP ENGAGEMENT // POPULAR LAUNCHES
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-black uppercase tracking-tight">
                TRENDING AI TOOLS
              </h2>
            </div>

            <button
              onClick={onViewAll}
              className="px-5 py-2.5 rounded-full bg-black text-white hover:bg-white hover:text-black font-mono text-xs font-bold uppercase transition-all self-start sm:self-auto"
            >
              VIEW FULL INDEX [→]
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingTools.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={favorites.includes(tool.id)}
                onToggleFavorite={onToggleFavorite}
                onOpenTool={onOpenTool}
                onSelectTool={onSelectTool}
                variant="black"
              />
            ))}
          </div>
        </section>

        {/* 6. Browse by Category Grid */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b-2 border-[#000000]">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-black block mb-1">
                // DOMAIN TAXONOMY // 20 SECTORS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-black uppercase tracking-tight">
                CATEGORIES
              </h2>
            </div>

            <button
              onClick={() => onSelectCategory('all')}
              className="px-5 py-2.5 rounded-full bg-black text-white hover:bg-white hover:text-black font-mono text-xs font-bold uppercase transition-all self-start sm:self-auto"
            >
              ALL 20 CATEGORIES [→]
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.slice(0, 8).map((cat, idx) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                toolCount={categoryCounts[cat.id] || 0}
                onSelect={onSelectCategory}
                index={idx}
              />
            ))}
          </div>
        </section>

        {/* 7. Zero Login Tools Section */}
        <section className="bg-[#000000] text-white border-2 border-[#000000] p-6 sm:p-10 shadow-[10px_10px_0px_#000000]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b-2 border-white/20">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#FF4D00] block mb-1">
                // ZERO FRICTION // NO SIGN UP REQUIRED
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight">
                NO-LOGIN AI TOOLS
              </h2>
            </div>

            <button
              onClick={() => onSelectQuickFilter('no-login')}
              className="px-5 py-2.5 rounded-full bg-[#FF4D00] text-black hover:bg-white font-mono text-xs font-bold uppercase transition-all self-start sm:self-auto"
            >
              FILTER NO-LOGIN [→]
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeNoLoginTools.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={favorites.includes(tool.id)}
                onToggleFavorite={onToggleFavorite}
                onOpenTool={onOpenTool}
                onSelectTool={onSelectTool}
                variant="black"
              />
            ))}
          </div>
        </section>

        {/* 8. AI Coding & Autonomous Agents */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b-2 border-[#000000]">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-black block mb-1">
                // DEVELOPER SYSTEMS // CODE SYNTHESIS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-black uppercase tracking-tight">
                AI CODING &amp; AGENTS
              </h2>
            </div>

            <button
              onClick={() => onSelectCategory('ai-coding')}
              className="px-5 py-2.5 rounded-full bg-black text-white hover:bg-white hover:text-black font-mono text-xs font-bold uppercase transition-all self-start sm:self-auto"
            >
              CODING HUB [→]
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {codingTools.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={favorites.includes(tool.id)}
                onToggleFavorite={onToggleFavorite}
                onOpenTool={onOpenTool}
                onSelectTool={onSelectTool}
                variant="black"
              />
            ))}
          </div>
        </section>

        {/* 9. AI Video & Motion Generation */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b-2 border-[#000000]">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-black block mb-1">
                // MOTION SYNTHESIS // GENERATIVE VIDEO
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-black uppercase tracking-tight">
                AI VIDEO &amp; 3D
              </h2>
            </div>

            <button
              onClick={() => onSelectCategory('ai-video')}
              className="px-5 py-2.5 rounded-full bg-black text-white hover:bg-white hover:text-black font-mono text-xs font-bold uppercase transition-all self-start sm:self-auto"
            >
              VIDEO HUB [→]
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoTools.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={favorites.includes(tool.id)}
                onToggleFavorite={onToggleFavorite}
                onOpenTool={onOpenTool}
                onSelectTool={onSelectTool}
                variant="black"
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
