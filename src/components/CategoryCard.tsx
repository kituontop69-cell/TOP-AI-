import React from 'react';
import type { CategoryInfo } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface CategoryCardProps {
  category: CategoryInfo;
  toolCount: number;
  isSelected?: boolean;
  onSelect: (slug: string) => void;
  index?: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  toolCount,
  isSelected = false,
  onSelect,
  index = 0
}) => {
  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <div
      onClick={() => onSelect(category.id)}
      className={`group relative p-6 cursor-pointer border-2 transition-all duration-200 flex flex-col justify-between select-none ${
        isSelected
          ? 'bg-[#FF4D00] text-[#000000] border-[#000000] shadow-[6px_6px_0px_#000000]'
          : 'bg-[#000000] text-[#FFFFFF] border-[#000000] hover:border-[#FF4D00] hover:shadow-[6px_6px_0px_#FF4D00]'
      } hover:-translate-x-1 hover:-translate-y-1`}
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="font-mono text-sm font-bold text-[#FF4D00] group-hover:text-current">
            [{formattedIndex}]
          </span>

          <span className="font-mono text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-current">
            {toolCount} {toolCount === 1 ? 'ENTRY' : 'ENTRIES'}
          </span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl tracking-tight uppercase mb-2 group-hover:text-[#FF4D00] transition-colors">
          {category.name}
        </h3>

        <p className="font-body text-xs text-white/70 line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between font-mono text-xs font-bold uppercase">
        <span>ACCESS DOMAIN</span>
        <ArrowUpRight className="w-4 h-4 transform group-hover:rotate-45 group-hover:text-[#FF4D00] transition-transform" />
      </div>
    </div>
  );
};
