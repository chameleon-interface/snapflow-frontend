import { FlagRussia, FlagUK } from 'snapflow-ui-kit/icons';
import { DEFAULT_LOCALE, type Locale } from '@/shared/config/i18n';

export type LangCode = Locale;

export const DEFAULT_LANG: LangCode = DEFAULT_LOCALE;

export const LANG_OPTIONS = [
  { label: 'English', value: 'en', icon: <FlagUK /> },
  { label: 'Russian', value: 'ru', icon: <FlagRussia /> },
];
