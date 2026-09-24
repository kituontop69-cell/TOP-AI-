import React from 'react';
import { WifiOff } from 'lucide-react';

interface OfflineBannerProps {
  isOnline: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOnline }) => {
  if (isOnline) return null;

  return (
    <div className="bg-[#000000] text-[#FF4D00] border-b-2 border-[#000000] px-4 py-2.5 font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 sticky top-16 z-40 select-none">
      <WifiOff className="w-4 h-4 animate-pulse flex-shrink-0" />
      <span>
        [NETWORK OFFLINE]: RUNNING ON LOCAL BROWSER CACHE. EXTERNAL SITES REQUIRE INTERNET.
      </span>
    </div>
  );
};
