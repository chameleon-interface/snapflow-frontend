'use client';

import { useLocalStorage } from '@/shared/lib/hooks/useLocalStorage';
import { DEFAULT_LANG, type LangCode } from '../config/languages';

const LANG_STORAGE_KEY = 'lang';

/**
 * Hook for managing the current application language.
 *
 * Persists selected language to localStorage and synchronizes
 * state across browser tabs.
 *
 * @returns Tuple [lang, setLang]
 * - `lang` — current language code ('eng' | 'ru')
 * - `setLang` — function to change the language
 *
 * @example
 * ```tsx
 * const [lang, setLang] = useLang();
 *
 * return (
 *   <Select
 *     value={lang}
 *     onChange={setLang}
 *     options={LANG_OPTIONS}
 *   />
 * );
 * ```
 *
 * @example
 * ```tsx
 * // Use anywhere to get the current language
 * const [lang] = useLang();
 *
 * return <div>{lang === 'ru' ? 'Привет' : 'Hello'}</div>;
 * ```
 *
 * @see {@link useLocalStorage} — base hook for localStorage operations
 * @see {@link LangCode} — type for allowed language codes
 */
export function useLang() {
  const [lang, setLang] = useLocalStorage(LANG_STORAGE_KEY, DEFAULT_LANG);
  return [lang as LangCode, setLang] as const;
}
