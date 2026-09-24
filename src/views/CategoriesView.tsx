import React from 'react';
import type { AITool } from '../types';
import { CATEGORIES } from '../data/categories';
import { CategoryCard } from '../components/CategoryCard';

interface CategoriesViewProps {
  tools: AITool[];
  onSelectCategory: (categoryId: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ tools, onSelectCategory }) => {
  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat.id] = tools.filter(t => t.category.includes(cat.id) || t.category.includes(cat.slug)).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-[#FF4D00] text-black min-h-screen pt-28 pb-20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="pb-6 border-b-2 border-black">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-black block mb-2">
            // DOMAIN ARCHITECTURE // 20 SPECIALIZED SECTORS
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-black uppercase tracking-tight">
            CATEGORIES DIRECTORY
          </h1>
          <p className="font-mono text-xs sm:text-sm text-black/80 uppercase mt-2 max-w-2xl">
            Filter the directory by specific computational capability, from frontier LLM chat to generative video and autonomous coding.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((category, idx) => (
            <CategoryCard
              key={category.id}
              category={category}
              toolCount={categoryCounts[category.id] || 0}
              onSelect={onSelectCategory}
              index={idx}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
