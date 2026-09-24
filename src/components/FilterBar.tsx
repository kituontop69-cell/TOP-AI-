import React from 'react';
import type { FilterState, PricingType, SortOption } from '../types';
import { CATEGORIES } from '../data/categories';
import { RotateCcw } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalMatches: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  totalMatches
}) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, category: e.target.value }));
  };

  const handlePricingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, pricingType: e.target.value as PricingType | 'all' }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, sortBy: e.target.value as SortOption }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setFilters(prev => ({
      ...prev,
      requiresLogin: val === 'all' ? 'all' : val === 'true'
    }));
  };

  const handleMobileToggle = () => {
    setFilters(prev => ({
      ...prev,
      mobileFriendly: prev.mobileFriendly === true ? 'all' : true
    }));
  };

  const handleReset = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      pricingType: 'all',
      requiresLogin: 'all',
      mobileFriendly: 'all',
      quickFilter: 'all',
      sortBy: 'popularity'
    });
  };

  const hasActiveFilters = 
    filters.category !== 'all' ||
    filters.pricingType !== 'all' ||
    filters.requiresLogin !== 'all' ||
    filters.mobileFriendly !== 'all' ||
    filters.quickFilter !== 'all' ||
    filters.searchQuery !== '';

  return (
    <div className="bg-[#000000] text-white border-2 border-[#000000] p-5 sm:p-6 mb-10 shadow-[6px_6px_0px_#000000]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-1">
          
          {/* Category Dropdown */}
          <div className="space-y-1">
            <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF4D00] block">
              // DOMAIN CATEGORY
            </label>
            <select
              value={filters.category}
              onChange={handleCategoryChange}
              className="w-full bg-[#000000] text-white border-2 border-white/40 focus:border-[#FF4D00] px-3 py-2 font-mono text-xs font-bold uppercase focus:outline-none"
            >
              <option value="all">ALL DOMAINS ({CATEGORIES.length})</option>
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Pricing Model */}
          <div className="space-y-1">
            <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF4D00] block">
              // PRICING SYSTEM
            </label>
            <select
              value={filters.pricingType}
              onChange={handlePricingChange}
              className="w-full bg-[#000000] text-white border-2 border-white/40 focus:border-[#FF4D00] px-3 py-2 font-mono text-xs font-bold uppercase focus:outline-none"
            >
              <option value="all">ANY PRICING</option>
              <option value="free">FREE FOREVER</option>
              <option value="free-tier">FREE TIER</option>
              <option value="free-credits">FREE CREDITS</option>
              <option value="open-source">OPEN SOURCE</option>
              <option value="limited-free">LIMITED FREE</option>
              <option value="paid">PAID ONLY</option>
            </select>
          </div>

          {/* Login State */}
          <div className="space-y-1">
            <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF4D00] block">
              // ACCOUNT REQUIREMENT
            </label>
            <select
              value={filters.requiresLogin === 'all' ? 'all' : String(filters.requiresLogin)}
              onChange={handleLoginChange}
              className="w-full bg-[#000000] text-white border-2 border-white/40 focus:border-[#FF4D00] px-3 py-2 font-mono text-xs font-bold uppercase focus:outline-none"
            >
              <option value="all">ANY LOGIN STATE</option>
              <option value="false">NO LOGIN REQUIRED</option>
              <option value="true">ACCOUNT REQUIRED</option>
            </select>
          </div>

          {/* Sort Order */}
          <div className="space-y-1">
            <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF4D00] block">
              // SORT ORDER
            </label>
            <select
              value={filters.sortBy}
              onChange={handleSortChange}
              className="w-full bg-[#000000] text-white border-2 border-white/40 focus:border-[#FF4D00] px-3 py-2 font-mono text-xs font-bold uppercase focus:outline-none"
            >
              <option value="popularity">POPULARITY [DESC]</option>
              <option value="rating">RATING SCORE [DESC]</option>
              <option value="newest">RECENT RELEASES</option>
              <option value="alphabetical">ALPHABETICAL [A-Z]</option>
              <option value="verified">AUDITED / VERIFIED</option>
            </select>
          </div>

        </div>

        {/* Right side controls */}
        <div className="flex items-center justify-between lg:justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/20">
          <button
            onClick={handleMobileToggle}
            className={`px-3 py-2 rounded-full font-mono text-xs font-bold border-2 transition-all ${
              filters.mobileFriendly === true
                ? 'bg-[#FF4D00] text-black border-[#FF4D00]'
                : 'border-white/40 text-white hover:border-white'
            }`}
          >
            MOBILE READY ONLY
          </button>

          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white text-black font-mono text-xs font-bold hover:bg-[#FF4D00] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET</span>
            </button>
          )}

          <div className="font-mono text-xs text-[#FF4D00] font-bold whitespace-nowrap">
            [{totalMatches} MATCHES]
          </div>
        </div>

      </div>
    </div>
  );
};
