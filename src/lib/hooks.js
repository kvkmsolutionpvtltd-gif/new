import { useEffect, useState } from 'react';

/** Tracks a media query, SSR-safe-ish. */
export function useMediaQuery(query) {
  const get = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false);
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const on = () => setMatches(mql.matches);
    on();
    mql.addEventListener('change', on);
    return () => mql.removeEventListener('change', on);
  }, [query]);
  return matches;
}

export const useIsMobile = () => useMediaQuery('(max-width: 820px)');
export const useIsTouch = () => useMediaQuery('(hover: none), (pointer: coarse)');
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/**
 * Device performance tier — decides particle counts, DPR, effects.
 * Cheap heuristic based on cores, memory and screen size.
 */
export function getPerfTier() {
  if (typeof navigator === 'undefined') return 'high';
  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || 4;
  const small = typeof window !== 'undefined' && window.innerWidth < 720;
  // Reserve 'low' for genuinely weak/phone-class devices. A typical 4-core
  // laptop should still get bloom + cinematic post ('mid').
  if (small || cores <= 2 || mem <= 2) return 'low';
  if (cores <= 4 || mem <= 4) return 'mid';
  return 'high';
}
