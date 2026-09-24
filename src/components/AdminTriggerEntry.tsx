import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminTriggerEntryProps {
  onActivate: () => void;
  className?: string;
}

export const AdminTriggerEntry: React.FC<AdminTriggerEntryProps> = ({
  onActivate,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className={`mt-2 p-2.5 bg-[#000000] text-white border-2 border-[#333333] flex items-center justify-between font-mono text-xs shadow-md select-none ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
        <span className="text-white/80 font-bold uppercase tracking-wider text-[11px]">
          SYSTEM GATEWAY READY
        </span>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onActivate();
        }}
        className="px-3 py-1 bg-white text-black hover:bg-[#FF4D00] hover:text-black font-display text-[11px] font-black uppercase transition-colors flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#FF4D00]"
        title="Access Administrative Login"
      >
        <span>PRIVATE ACCESS</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
};
