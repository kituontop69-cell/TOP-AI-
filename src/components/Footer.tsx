import React from 'react';
import type { ActiveTab } from '../types';
import { Download, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onInstallClick: () => void;
  isInstalled: boolean;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onInstallClick, isInstalled }) => {
  return (
    <footer className="relative bg-[#FF4D00] text-[#000000] border-t-2 border-[#000000] overflow-hidden select-none">
      
      {/* Giant CTA Section (Prompt Requirement) */}
      <div className="py-20 sm:py-28 px-4 text-center max-w-7xl mx-auto border-b-2 border-[#000000]">
        
        <div className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
          // ZERO SUBSCRIPTIONS // OPEN TO ALL HUMANS
        </div>

        <h2 className="font-display text-[12vw] sm:text-[13vw] lg:text-[14vw] font-black leading-[0.82] tracking-[-0.05em] uppercase text-[#000000] mb-8 sm:mb-12">
          EXPLORE THE VAULT
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              setActiveTab('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 sm:px-12 py-5 rounded-full bg-[#000000] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#000000] border-2 border-[#000000] font-display text-lg sm:text-2xl tracking-tight uppercase transition-all duration-200 hover:scale-105 active:scale-95 shadow-[6px_6px_0px_#000000] flex items-center gap-3"
          >
            <span>LAUNCH DIRECTORY</span>
            <ArrowRight className="w-6 h-6" />
          </button>

          {!isInstalled && (
            <button
              onClick={onInstallClick}
              className="px-8 py-5 rounded-full bg-[#FFFFFF] text-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] border-2 border-[#000000] font-mono text-sm sm:text-base font-bold uppercase transition-all duration-200 hover:scale-105 active:scale-95 shadow-[6px_6px_0px_#000000] flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              <span>INSTALL NATIVE PWA</span>
            </button>
          )}
        </div>

      </div>

      {/* Mandatory Independent Legal Disclaimer */}
      <div className="bg-[#000000] text-white py-8 px-4 sm:px-6 lg:px-8 border-b-2 border-[#000000]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#FF4D00]">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span className="font-bold">INDEPENDENT CATALOG NOTICE:</span>
          </div>
          <p className="text-white/80 max-w-4xl text-[11px] leading-relaxed uppercase">
            AI Vault is an independent directory and is not affiliated with the listed services unless explicitly stated. All trademarks, names, and logos belong to their respective creators. No pirated content, cracked accounts, or paywall circumvention.
          </p>
        </div>
      </div>

      {/* Bottom Footer Info: Copyright & Space Mono (12px) horizontal links */}
      <div className="bg-[#FF4D00] text-[#000000] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[12px] font-bold tracking-tight">
          
          <div className="flex items-center gap-2">
            <span className="font-display text-sm tracking-tight">AI VAULT</span>
            <span>// ARCHIVE COPYRIGHT © {new Date().getFullYear()}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 uppercase">
            <button
              onClick={() => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:underline"
            >
              [ EXPLORE ]
            </button>
            <button
              onClick={() => {
                setActiveTab('categories');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:underline"
            >
              [ CATEGORIES ]
            </button>
            <button
              onClick={() => {
                setActiveTab('trending');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:underline"
            >
              [ TRENDING ]
            </button>
            <button
              onClick={() => {
                setActiveTab('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:underline"
            >
              [ ADMIN PORTAL ]
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
};
