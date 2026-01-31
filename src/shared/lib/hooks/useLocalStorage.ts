import { useSyncExternalStore, useCallback } from 'react';

/**
 * Hook for synchronizing state with localStorage.
 *
 * Uses `useSyncExternalStore` for safe concurrent rendering support.
 * Automatically syncs across browser tabs.
 *
 * @param key - Key for storing the value in localStorage
 * @param defaultValue - Default value if key doesn't exist
 * @returns Tuple [value, setValue] similar to useState
 *
 * @example
 * ```tsx
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 *
 * const toggleTheme = () => {
 *   setTheme(theme === 'light' ? 'dark' : 'light');
 * };
 * ```
 *
 * @example
 * ```tsx
 * // Cross-tab synchronization works automatically
 * const [token, setToken] = useLocalStorage('auth-token', '');
 *
 * // Component re-renders when token changes in another tab
 * ```
 *
 * @remarks
 * - Returns `defaultValue` during SSR
 * - Dispatches a custom event when value changes in the current tab
 * - Listens to native `storage` event for changes from other tabs
 */
export function useLocalStorage(key: string, defaultValue: string) {
  const subscribe = (callback: () => void) => {
    const storageHandler = (e: StorageEvent) => {
      if (e.key === key) callback();
    };
    const customHandler = () => callback();

    window.addEventListener('storage', storageHandler);
    window.addEventListener(`local-storage:${key}`, customHandler);

    return () => {
      window.removeEventListener('storage', storageHandler);
      window.removeEventListener(`local-storage:${key}`, customHandler);
    };
  };

  const getSnapshot = () => localStorage.getItem(key) ?? defaultValue;
  const getServerSnapshot = () => defaultValue;

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (newValue: string) => {
      localStorage.setItem(key, newValue);
      window.dispatchEvent(new Event(`local-storage:${key}`));
    },
    [key],
  );

  return [value, setValue] as const;
}
