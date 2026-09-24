import React from 'react';
import type { AITool } from '../types';
import { ToolCard } from '../components/ToolCard';

interface TrendingViewProps {
  tools: AITool[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectTool: (tool: AITool) => void;
  onOpenTool: (tool: AITool) => void;
}

export const TrendingView: React.FC<TrendingViewProps> = ({
  tools,
  favorites,
  onToggleFavorite,
  onSelectTool,
  onOpenTool
}) => {
  const trendingTools = [...tools].sort((a, b) => {
    const scoreA = (a.popularity || 0) * 2 + (a.clicks || 0);
    const scoreB = (b.popularity || 0) * 2 + (b.clicks || 0);
    return scoreB - scoreA;
  });

  return (
    <div className="theme-page-bg theme-page-text min-h-screen pt-28 pb-20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-2 border-black">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-black block mb-2">
              // TELEMETRY // REAL-TIME RANKING
            </span>
            <h1 className="font-display text-4xl sm:text-6xl text-black uppercase tracking-tight">
              TRENDING TOOLS
            </h1>
          </div>

          <div className="font-mono text-xs font-bold uppercase bg-black text-white px-4 py-2 rounded-full border-2 border-black">
            ORDER // ENGAGEMENT SCORE
          </div>
        </div>

        {/* Grid */}
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

      </div>
    </div>
  );
};
