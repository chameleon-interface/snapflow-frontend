'use client';

import { useCallback } from 'react';
import { useLocale } from 'next-intl';
import { LOCALE_COOKIE } from '@/shared/config/i18n';
import { DEFAULT_LANG, type LangCode } from '../config/languages';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Hook for managing the current application language.
 *
 * Persists selected language to a cookie for SSR/CSR consistency.
 */
export function useLang() {
  const locale = useLocale();
  const lang = (locale as LangCode) ?? DEFAULT_LANG;

  const setLang = useCallback((nextLang: LangCode) => {
    document.cookie = `${LOCALE_COOKIE}=${nextLang}; path=/; max-age=${COOKIE_MAX_AGE}`;
  }, []);

  return [lang, setLang] as const;
}
