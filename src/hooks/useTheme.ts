import { useState, useEffect, useCallback } from 'react';

export type ThemeMode = 'default' | 'dark' | 'light';

export const THEME_STORAGE_KEY = 'aivault_theme_mode';

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'default';
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'dark' || stored === 'light' || stored === 'default') {
        return stored;
      }
    } catch {}
    return 'default';
  });

  const applyTheme = useCallback((mode: ThemeMode) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.setAttribute('data-theme', mode);
    document.body.setAttribute('data-theme', mode);

    // Update meta theme-color in head for browser address bars & mobile chrome
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      if (mode === 'default') {
        themeColorMeta.setAttribute('content', '#FF4D00');
      } else if (mode === 'dark') {
        themeColorMeta.setAttribute('content', '#07070A');
      } else {
        themeColorMeta.setAttribute('content', '#F5F5F0');
      }
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeState(mode);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {}
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeState(prev => {
      let next: ThemeMode = 'default';
      if (prev === 'default') next = 'dark';
      else if (prev === 'dark') next = 'light';
      else if (prev === 'light') next = 'default';

      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {}
      return next;
    });
  }, []);

  return {
    theme,
    setTheme,
    cycleTheme
  };
}
