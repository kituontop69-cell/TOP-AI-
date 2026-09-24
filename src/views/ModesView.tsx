import React, { useState, useMemo } from 'react';
import type { AITool, ModeId } from '../types';
import { MODES, getModeById, getToolsForMode } from '../data/modes';
import { ToolCard } from '../components/ToolCard';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Layers, 
  Search,
  BookOpen,
  Code,
  Palette,
  Image as ImageIcon,
  Film,
  Mic,
  Music,
  PenTool,
  Compass,
  Briefcase,
  Box,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ModesViewProps {
  tools: AITool[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectTool: (tool: AITool) => void;
  onOpenTool: (tool: AITool) => void;
  initialMode?: ModeId;
}

const MODE_ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  BookOpen,
  Code,
  Palette,
  Image: ImageIcon,
  Film,
  Mic,
  Music,
  PenTool,
  Search: Compass,
  Briefcase,
  Box,
  Globe
};

export const ModesView: React.FC<ModesViewProps> = ({
  tools,
  favorites,
  onToggleFavorite,
  onSelectTool,
  onOpenTool,
  initialMode = 'study'
}) => {
  const [selectedModeId, setSelectedModeId] = useState<ModeId>(initialMode);
  const [modeQuery, setModeQuery] = useState('');

  const activeMode = useMemo(() => {
    return getModeById(selectedModeId) || MODES[0];
  }, [selectedModeId]);

  // Compute tool counts for all 12 modes dynamically from existing tool database
  const modeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const m of MODES) {
      counts[m.id] = getToolsForMode(m.id, tools).length;
    }
    return counts;
  }, [tools]);

  // Matching tools for active mode
  const matchingTools = useMemo(() => {
    const list = getToolsForMode(selectedModeId, tools);
    if (!modeQuery.trim()) return list;
    const q = modeQuery.toLowerCase().trim();
    return list.filter(t => 
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }, [selectedModeId, tools, modeQuery]);

  return (
    <div className="theme-page-bg theme-page-text min-h-screen pt-28 pb-20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Technical Top Stamp */}
        <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider pb-3 border-b-2 theme-border">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF4D00] inline-block animate-pulse" />
            <span>SYSTEM // INTENT ENGINE</span>
          </div>
          <span className="hidden sm:inline">DYNAMIC MULTI-MODE CLASSIFICATION</span>
          <span>12 SPECIALIZED MODES</span>
        </div>

        {/* Minimal Kinetic Headline */}
        <div className="text-center sm:text-left space-y-2">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight theme-page-text leading-none">
            WHAT DO YOU WANT TO DO?
          </h1>
          <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest theme-subtext">
            DISCOVER VERIFIED AI CAPABILITIES BY GOAL &amp; WORKFLOW
          </p>
        </div>

        {/* Mode Selector Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {MODES.map(mode => {
            const isSelected = selectedModeId === mode.id;
            const count = modeCounts[mode.id] || 0;
            const IconComponent = MODE_ICON_MAP[mode.iconName] || Sparkles;

            return (
              <button
                key={mode.id}
                onClick={() => {
                  setSelectedModeId(mode.id);
                  setModeQuery('');
                }}
                className={`group relative p-3 sm:p-3.5 border-2 transition-all duration-150 text-left flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#FF4D00] text-black border-black shadow-[4px_4px_0px_#000000] scale-[1.02]'
                    : 'bg-black text-white border-black/40 hover:border-black hover:bg-neutral-900 shadow-[2px_2px_0px_#000000]'
                }`}
                title={`Switch to ${mode.label} Mode`}
              >
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-lg leading-none">{mode.emoji}</span>
                  <span className={`font-mono text-[10px] font-black px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-black text-[#FF4D00]' : 'bg-white/10 text-white/80'
                  }`}>
                    [{count}]
                  </span>
                </div>
                <div>
                  <div className="font-display text-xs sm:text-sm uppercase tracking-tight leading-tight">
                    {mode.label}
                  </div>
                  <div className={`font-mono text-[9px] uppercase truncate tracking-tighter mt-0.5 ${
                    isSelected ? 'text-black/80 font-bold' : 'text-white/60'
                  }`}>
                    {mode.tagline.split('&')[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Mode Focus Banner */}
        <div className="bg-black text-white border-2 border-black p-5 sm:p-7 shadow-[6px_6px_0px_#000000] space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#FF4D00] text-black flex items-center justify-center font-display text-2xl border-2 border-white flex-shrink-0">
                {activeMode.emoji}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-black uppercase text-[#FF4D00]">
                    // ACTIVE MODE
                  </span>
                  <span className="font-mono text-[10px] text-white/50">
                    ID: {activeMode.id}
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white">
                  {activeMode.label} MODE
                </h2>
              </div>
            </div>

            {/* Quick in-mode search filter */}
            <div className="flex items-center bg-neutral-900 border border-white/30 px-3 py-2 w-full md:w-64">
              <Search className="w-3.5 h-3.5 text-white/60 mr-2 flex-shrink-0" />
              <input
                type="text"
                value={modeQuery}
                onChange={e => setModeQuery(e.target.value)}
                placeholder={`FILTER ${activeMode.label}...`}
                className="w-full bg-transparent font-mono text-xs text-white placeholder-white/40 focus:outline-none uppercase font-bold"
              />
              {modeQuery && (
                <button
                  onClick={() => setModeQuery('')}
                  className="font-mono text-[10px] text-[#FF4D00] font-black uppercase ml-1"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          <p className="font-mono text-xs sm:text-sm text-white/90 leading-relaxed uppercase">
            {activeMode.description}
          </p>

          {/* Supported Intents / Tasks Tag Cloud */}
          <div className="space-y-2 pt-1">
            <span className="font-mono text-[10px] font-bold text-white/50 uppercase tracking-widest block">
              // DESIGNATED CAPABILITIES IN THIS MODE:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeMode.intents.map((intent, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-white/10 hover:bg-[#FF4D00] hover:text-black transition-colors border border-white/20 font-mono text-[11px] font-bold text-white uppercase"
                >
                  {intent}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Results Header */}
        <div className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider pb-2 border-b-2 theme-border">
          <div className="flex items-center gap-2">
            <span>SHOWING</span>
            <span className="text-[#FF4D00] font-black">[{matchingTools.length}]</span>
            <span>RELEVANT TOOLS</span>
          </div>
          <span className="theme-subtext hidden sm:inline">
            CLICK TO EXPAND DETAILS OR LAUNCH INSTANTLY
          </span>
        </div>

        {/* Relevant Tools Grid */}
        {matchingTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingTools.map(tool => (
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
          <div className="text-center py-16 bg-black text-white border-2 border-black p-8 max-w-lg mx-auto shadow-[6px_6px_0px_#000000]">
            <h3 className="font-display text-xl uppercase tracking-tight mb-2">
              NO MATCHES FOR THIS FILTER
            </h3>
            <p className="font-mono text-xs text-white/70 mb-4">
              Clear your filter query to view all tools in {activeMode.label} Mode.
            </p>
            {modeQuery && (
              <button
                onClick={() => setModeQuery('')}
                className="px-4 py-2 bg-[#FF4D00] text-black font-display text-xs uppercase tracking-tight hover:bg-white transition-all shadow-[2px_2px_0px_#FFFFFF]"
              >
                RESET QUERY
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
