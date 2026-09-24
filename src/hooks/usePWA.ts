import { useState, useEffect, useCallback } from 'react';
import { analytics } from '../services/analytics';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showInstallHint, setShowInstallHint] = useState(false);

  useEffect(() => {
    // 1. Detect if running as standalone PWA
    const checkInstalled = () => {
      const isStandaloneMedia = window.matchMedia('(display-mode: standalone)').matches;
      const isNavigatorStandalone = (window.navigator as any).standalone === true;
      const installed = isStandaloneMedia || isNavigatorStandalone;
      setIsInstalled(installed);
      if (installed) {
        setShowInstallHint(false);
      }
    };

    checkInstalled();
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addEventListener('change', checkInstalled);

    // 2. Detect iOS / iPadOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(isAppleDevice);

    // 3. Android / Chromium beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 4. Online / Offline listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 5. App installed listener
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      setShowInstallHint(false);
      try {
        localStorage.setItem('aiVaultInstallHintShown', 'true');
      } catch {}
      analytics.track('install_clicked', { status: 'installed' });
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      mediaQuery.removeEventListener('change', checkInstalled);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const dismissInstallHint = useCallback(() => {
    setShowInstallHint(false);
    try {
      localStorage.setItem('aiVaultInstallHintShown', 'true');
    } catch {}
  }, []);

  const triggerInstallHint = useCallback(() => {
    // If already installed, never show install hint
    const isStandaloneMedia = typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches;
    const isNavigatorStandalone = typeof window !== 'undefined' && (window.navigator as any).standalone === true;
    if (isStandaloneMedia || isNavigatorStandalone || isInstalled) {
      return;
    }

    try {
      const alreadyShown = localStorage.getItem('aiVaultInstallHintShown');
      if (!alreadyShown) {
        setShowInstallHint(true);
      }
    } catch {}
  }, [isInstalled]);

  const promptInstall = async () => {
    // Dismiss hint if visible
    dismissInstallHint();

    analytics.track('install_clicked', { isIOS, isInstallable });

    // iOS flow: opens custom native instructions modal
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }

    // Android/Chromium with active prompt: trigger native installation dialog
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
        setIsInstallable(false);
      } catch (err) {
        console.error('Install prompt error:', err);
      }
      return;
    }

    // Desktop/Unsupported or prompt expired: show instructions modal
    setShowIOSGuide(true);
  };

  return {
    isInstallable,
    isInstalled,
    isIOS,
    isOnline,
    showIOSGuide,
    setShowIOSGuide,
    showInstallHint,
    triggerInstallHint,
    dismissInstallHint,
    promptInstall
  };
}
