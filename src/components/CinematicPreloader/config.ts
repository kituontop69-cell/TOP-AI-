/**
 * Cinematic Preloader Configuration
 * 
 * Central settings for the 5-second cinematic emergency light preloader.
 */
export const PRELOADER_CONFIG = {
  /**
   * Total duration of the cinematic sequence in milliseconds.
   * Default: 5000ms (exactly 5 seconds)
   */
  DURATION_MS: 5000,

  /**
   * Display mode:
   * true  = Show on every fresh page load (default requirement)
   * false = Show once per user (persisted in localStorage)
   */
  SHOW_EVERY_LOAD: true,

  /**
   * LocalStorage key used when SHOW_EVERY_LOAD is set to false
   */
  STORAGE_KEY: 'aivault_cinematic_preloader_seen_v1',

  /**
   * Path to the cinematic intro audio file in the public directory.
   * Place your MP3 file at: public/audio/ai-vault-intro.mp3
   */
  AUDIO_PATH: '/audio/ai-vault-intro.mp3',

  /**
   * Status text checkpoints based on percentage (0-100)
   */
  STATUS_MESSAGES: [
    { threshold: 20, text: 'SYSTEM INITIALIZING' },
    { threshold: 40, text: 'CONNECTING TO AI VAULT' },
    { threshold: 60, text: 'LOADING AI TOOLS' },
    { threshold: 80, text: 'SYNCING TOOL DATABASE' },
    { threshold: 95, text: 'PREPARING VAULT' },
    { threshold: 100, text: 'SYSTEM READY' }
  ]
} as const;
