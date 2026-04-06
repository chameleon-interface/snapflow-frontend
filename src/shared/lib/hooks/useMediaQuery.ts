'use client';

import { useEffect, useState } from 'react';

/**
 * Hook for checking if viewport width is less than or equal to specified breakpoint.
 * Uses window.matchMedia API for optimal performance.
 *
 * @param maxWidth - Maximum viewport width in pixels
 * @returns true if viewport width <= maxWidth, false otherwise
 *
 * @example
 * ```tsx
 * const isMobile = useMediaQuery(767);
 * const isTablet = useMediaQuery(1023);
 *
 * return (
 *   <div>
 *     {isMobile ? <MobileMenu /> : <DesktopMenu />}
 *   </div>
 * );
 * ```
 */
export const useMediaQuery = (maxWidth: number): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = `(max-width: ${maxWidth}px)`;
    const media = window.matchMedia(query);
    const updateMatches = () => setMatches(media.matches);

    updateMatches();
    media.addEventListener('change', updateMatches);

    return () => media.removeEventListener('change', updateMatches);
  }, [maxWidth]);

  return matches;
};
