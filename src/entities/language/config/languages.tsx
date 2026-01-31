import { FlagRussia, FlagUK } from 'snapflow-ui-kit/icons';

export type LangCode = 'eng' | 'ru';

export const DEFAULT_LANG: LangCode = 'eng';

export const LANG_OPTIONS = [
  { label: 'English', value: 'eng', icon: <FlagUK /> },
  { label: 'Russian', value: 'ru', icon: <FlagRussia /> },
];
