import { STORAGE_KEYS } from '@/shared/config/storage';

/**
 * Checks if authentication token exists in localStorage.
 * Returns false during SSR (when window is undefined).
 */
export const hasAuthToken = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};
