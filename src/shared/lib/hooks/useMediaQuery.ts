'use client';

import { useEffect, useState } from 'react';

/**
 * Хук для проверки, что ширина viewport меньше либо равна указанному брейкпоинту.
 * Использует `window.matchMedia` для оптимальной производительности.
 *
 * @param maxWidth - Максимальная ширина viewport в пикселях
 * @returns `true`, если ширина viewport <= maxWidth, иначе `false`
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
