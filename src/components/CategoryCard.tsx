import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'motion/react';
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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightBg = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, ${
    isSelected ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 77, 0, 0.22)'
  }, transparent 80%)`;

  return (
    <motion.div
      onClick={() => onSelect(category.id)}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5, transition: { type: 'spring', stiffness: 450, damping: 25 } }}
      whileTap={{ scale: 0.98 }}
      className={`group relative p-6 cursor-pointer border-2 overflow-hidden flex flex-col justify-between select-none ${
        isSelected
          ? 'bg-[#FF4D00] text-[#000000] border-[#000000] shadow-[5px_5px_0px_#000000] hover:shadow-[8px_8px_0px_#000000]'
          : 'bg-[#000000] text-[#FFFFFF] border-[#000000] hover:border-[#FF4D00] shadow-[5px_5px_0px_#000000] hover:shadow-[8px_8px_0px_#FF4D00]'
      } transition-colors duration-200`}
    >
      {/* 21st.dev Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{ background: spotlightBg }}
      />

      <div className="relative z-10">
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

      <div className="relative z-10 mt-6 pt-4 border-t border-white/20 flex items-center justify-between font-mono text-xs font-bold uppercase">
        <span>ACCESS DOMAIN</span>
        <ArrowUpRight className="w-4 h-4 transform group-hover:rotate-45 group-hover:text-[#FF4D00] transition-transform" />
      </div>
    </motion.div>
  );
};
