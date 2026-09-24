import React from 'react';
import type { AITool, FilterState } from '../types';
import { ToolCard } from '../components/ToolCard';
import { FilterBar } from '../components/FilterBar';
import { QuickFilters } from '../components/QuickFilters';
import { Search, RotateCcw } from 'lucide-react';

interface ExploreViewProps {
  tools: AITool[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectTool: (tool: AITool) => void;
  onOpenTool: (tool: AITool) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  tools,
  filters,
  setFilters,
  favorites,
  onToggleFavorite,
  onSelectTool,
  onOpenTool
}) => {
  const filteredTools = tools.filter(tool => {
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      const nameMatch = tool.name.toLowerCase().includes(q);
      const descMatch = tool.description.toLowerCase().includes(q) || (tool.longDescription && tool.longDescription.toLowerCase().includes(q));
      const catMatch = tool.category.some(c => c.toLowerCase().includes(q));
      const tagMatch = tool.tags.some(t => t.toLowerCase().includes(q));
      const devMatch = tool.developerOrCompany ? tool.developerOrCompany.toLowerCase().includes(q) : false;
      const featMatch = tool.keyFeatures ? tool.keyFeatures.some(f => f.toLowerCase().includes(q)) : false;

      if (!nameMatch && !descMatch && !catMatch && !tagMatch && !devMatch && !featMatch) {
        return false;
      }
    }

    if (filters.category !== 'all') {
      const hasCat = tool.category.includes(filters.category) || tool.category.some(c => c === filters.category);
      if (!hasCat) return false;
    }

    if (filters.pricingType !== 'all') {
      if (tool.pricingType !== filters.pricingType) return false;
    }

    if (filters.requiresLogin !== 'all') {
      if (tool.requiresLogin !== filters.requiresLogin) return false;
    }

    if (filters.mobileFriendly !== 'all') {
      if (tool.mobileFriendly !== filters.mobileFriendly) return false;
    }

    if (filters.quickFilter === 'free' && tool.pricingType !== 'free') return false;
    if (filters.quickFilter === 'no-login' && tool.requiresLogin) return false;
    if (filters.quickFilter === 'free-credits' && tool.pricingType !== 'free-credits') return false;
    if (filters.quickFilter === 'free-tier' && tool.pricingType !== 'free-tier') return false;
    if (filters.quickFilter === 'popular' && (tool.popularity || 0) < 92) return false;

    return true;
  });

  filteredTools.sort((a, b) => {
    if (filters.sortBy === 'popularity') {
      return (b.popularity || 0) - (a.popularity || 0);
    }
    if (filters.sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    }
    if (filters.sortBy === 'newest') {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    }
    if (filters.sortBy === 'alphabetical') {
      return a.name.localeCompare(b.name);
    }
    if (filters.sortBy === 'verified') {
      return (b.verified ? 1 : 0) - (a.verified ? 1 : 0);
    }
    return 0;
  });

  const handleReset = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      pricingType: 'all',
      requiresLogin: 'all',
      mobileFriendly: 'all',
      quickFilter: 'all',
      sortBy: 'popularity'
    });
  };

  return (
    <div className="theme-page-bg theme-page-text min-h-screen pt-28 pb-20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-2 border-black">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-black block mb-2">
              // INDEX QUERY // REAL-TIME DISCOVERY
            </span>
            <h1 className="font-display text-4xl sm:text-6xl text-black uppercase tracking-tight">
              EXPLORE ARCHIVE
            </h1>
          </div>

          <div className="w-full md:w-80">
            <div className="flex items-center bg-white border-2 border-black px-3.5 py-2.5 shadow-[4px_4px_0px_#000000]">
              <Search className="w-4 h-4 text-black mr-2.5 flex-shrink-0" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={e => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                placeholder="FILTER QUERY..."
                className="w-full bg-transparent font-mono text-xs font-bold uppercase text-black focus:outline-none placeholder-black/40"
              />
            </div>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex justify-start sm:justify-center overflow-x-auto no-scrollbar">
          <QuickFilters
            activeFilter={filters.quickFilter}
            onSelect={f => setFilters(prev => ({ ...prev, quickFilter: f as any }))}
          />
        </div>

        {/* Advanced Filter Bar */}
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          totalMatches={filteredTools.length}
        />

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map(tool => (
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
        ) : (
          <div className="text-center py-20 bg-black text-white border-2 border-black p-8 max-w-lg mx-auto shadow-[8px_8px_0px_#000000]">
            <h3 className="font-display text-2xl uppercase tracking-tight mb-2">
              ZERO MATCHES IN ARCHIVE
            </h3>
            <p className="font-mono text-xs text-white/70 mb-6">
              Adjust search parameters or clear filters to view catalog.
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF4D00] text-black font-display text-xs uppercase tracking-tight hover:bg-white transition-all shadow-[4px_4px_0px_#FFFFFF]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RESET ALL CRITERIA</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
