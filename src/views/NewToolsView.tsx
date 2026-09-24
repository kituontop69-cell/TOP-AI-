import React from 'react';
import type { AITool } from '../types';
import { ToolCard } from '../components/ToolCard';

interface NewToolsViewProps {
  tools: AITool[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectTool: (tool: AITool) => void;
  onOpenTool: (tool: AITool) => void;
}

function getRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return 'ADDED TODAY';
    if (diffDays === 1) return 'ADDED YESTERDAY';
    if (diffDays < 7) return `ADDED ${diffDays} DAYS AGO`;
    if (diffDays < 30) return `ADDED ${Math.floor(diffDays / 7)} WEEKS AGO`;
    return `ADDED ${date.toISOString().split('T')[0]}`;
  } catch {
    return 'RECENT ENTRY';
  }
}

export const NewToolsView: React.FC<NewToolsViewProps> = ({
  tools,
  favorites,
  onToggleFavorite,
  onSelectTool,
  onOpenTool
}) => {
  const newTools = [...tools].sort((a, b) => {
    return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
  });

  return (
    <div className="bg-[#FF4D00] text-black min-h-screen pt-28 pb-20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-2 border-black">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-black block mb-2">
              // CHRONOLOGY // RECENT ARCHIVE ENTRIES
            </span>
            <h1 className="font-display text-4xl sm:text-6xl text-black uppercase tracking-tight">
              NEW ADDITIONS
            </h1>
          </div>

          <div className="font-mono text-xs font-bold uppercase bg-black text-white px-4 py-2 rounded-full border-2 border-black">
            WEEKLY VERIFIED RELEASES
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newTools.map(tool => (
            <div key={tool.id} className="flex flex-col">
              <div className="mb-2 self-start">
                <span className="font-mono text-[10px] font-bold uppercase px-3 py-1 bg-black text-white rounded-full border-2 border-black">
                  [{getRelativeTime(tool.dateAdded)}]
                </span>
              </div>

              <ToolCard
                tool={tool}
                isFavorite={favorites.includes(tool.id)}
                onToggleFavorite={onToggleFavorite}
                onOpenTool={onOpenTool}
                onSelectTool={onSelectTool}
                variant="black"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
