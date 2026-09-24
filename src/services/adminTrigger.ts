/**
 * Secret Admin Trigger Configuration & Security Helpers
 * 
 * IMPORTANT SECURITY RULES:
 * 1. The trigger code is ONLY an obscured UI discovery mechanism, NOT an administrative password.
 * 2. Entering the trigger reveals the hidden Admin Login gateway.
 * 3. Entering the trigger NEVER grants admin privileges or sets isAdmin = true.
 * 4. Genuine admin authentication occurs via the secure server/session passkey verification.
 * 5. Secret trigger queries are NEVER sent to analytics, search history, or public URLs.
 */

// Configurable trigger phrase from environment (falls back to secure development trigger)
export const ADMIN_TRIGGER = (import.meta.env.VITE_ADMIN_TRIGGER || 'kituontop69').trim().toLowerCase();

/**
 * Checks whether an entered search string is the exact admin trigger.
 * Case-insensitive and trimmed.
 */
export const isSecretAdminTrigger = (query: string): boolean => {
  if (!query) return false;
  return query.trim().toLowerCase() === ADMIN_TRIGGER;
};

/**
 * Check whether the active browser session has genuine admin authorization.
 */
export const isSessionAdminAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem('aivault_admin_auth') === 'true';
};
