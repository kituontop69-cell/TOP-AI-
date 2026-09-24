import React from 'react';

interface QuickFiltersProps {
  activeFilter: string;
  onSelect: (filter: string) => void;
}

export const QuickFilters: React.FC<QuickFiltersProps> = ({ activeFilter, onSelect }) => {
  const filters = [
    { id: 'all', label: 'ALL TOOLS', code: '00' },
    { id: 'free', label: 'FREE FOREVER', code: '01' },
    { id: 'no-login', label: 'NO LOGIN', code: '02' },
    { id: 'free-credits', label: 'FREE CREDITS', code: '03' },
    { id: 'free-tier', label: 'FREE TIER', code: '04' },
    { id: 'popular', label: 'TRENDING', code: '05' },
    { id: 'new', label: 'NEW ADDITIONS', code: '06' }
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-1 max-w-full">
      {filters.map(item => {
        const isActive = activeFilter === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold tracking-tight whitespace-nowrap transition-all duration-150 border-2 border-[#000000] cursor-pointer ${
              isActive
                ? 'bg-[#FFFFFF] text-[#000000] shadow-[3px_3px_0px_#000000] -translate-y-0.5'
                : 'bg-[#000000] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#000000]'
            }`}
          >
            <span className="text-[#FF4D00]">[{item.code}]</span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
