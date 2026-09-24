import React from 'react';
import { ArrowDown } from 'lucide-react';

interface RotatingScrollIndicatorProps {
  className?: string;
  onClick?: () => void;
}

export const RotatingScrollIndicator: React.FC<RotatingScrollIndicatorProps> = ({ 
  className = '',
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`relative w-[144px] h-[144px] flex items-center justify-center cursor-pointer select-none group ${className}`}
      title="Scroll down to explore"
    >
      {/* Rotating SVG with circular textPath */}
      <svg
        className="w-full h-full animate-spin-12s"
        viewBox="0 0 144 144"
      >
        <defs>
          <path
            id="textcircle"
            d="M 72, 72 m -52, 0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"
          />
        </defs>

        <text
          fill="#000000"
          className="font-mono text-[9px] font-bold tracking-[0.22em] uppercase"
        >
          <textPath href="#textcircle" startOffset="0%">
            SCROLL DOWN • SCROLL DOWN • SCROLL DOWN • 
          </textPath>
        </text>
      </svg>

      {/* Static Center Icon with thick border */}
      <div className="absolute w-12 h-12 rounded-full bg-[#000000] text-[#FF4D00] border-2 border-[#000000] flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:text-[#000000] transition-colors duration-200">
        <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
      </div>
    </div>
  );
};
