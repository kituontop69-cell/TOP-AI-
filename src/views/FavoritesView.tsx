import React from 'react';
import type { AITool } from '../types';
import { ToolCard } from '../components/ToolCard';
import { ArrowRight } from 'lucide-react';

interface FavoritesViewProps {
  tools: AITool[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectTool: (tool: AITool) => void;
  onOpenTool: (tool: AITool) => void;
  onExploreClick: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  tools,
  favorites,
  onToggleFavorite,
  onSelectTool,
  onOpenTool,
  onExploreClick
}) => {
  const favoriteTools = tools.filter(t => favorites.includes(t.id));

  return (
    <div className="bg-[#FF4D00] text-black min-h-screen pt-28 pb-20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-2 border-black">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-black block mb-2">
              // USER VAULT // PERSISTENT BOOKMARKS
            </span>
            <h1 className="font-display text-4xl sm:text-6xl text-black uppercase tracking-tight">
              SAVED FAVORITES
            </h1>
          </div>

          <div className="font-mono text-xs font-bold uppercase bg-black text-white px-4 py-2 rounded-full border-2 border-black">
            [{favoriteTools.length} TOOLS BOOKMARKED]
          </div>
        </div>

        {/* Grid or Empty State */}
        {favoriteTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteTools.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={true}
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
              YOUR PERSONAL VAULT IS EMPTY
            </h3>
            <p className="font-mono text-xs text-white/70 mb-8 leading-relaxed">
              No entries saved yet. Tap the heart indicator on any tool in the archive to store it here for instant access.
            </p>
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FF4D00] text-black font-display text-sm uppercase tracking-tight hover:bg-white transition-all shadow-[4px_4px_0px_#FFFFFF]"
            >
              <span>EXPLORE ALL AI TOOLS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
