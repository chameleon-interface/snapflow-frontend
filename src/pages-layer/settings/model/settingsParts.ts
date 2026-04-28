import { ROUTES } from '@/shared/config';

export const SETTINGS_PARTS = [
  'info',
  'devices',
  'subscriptions',
  'payments',
] as const;

export type SettingsPart = (typeof SETTINGS_PARTS)[number];

export const DEFAULT_SETTINGS_PART: SettingsPart = 'info';

export const isSettingsPart = (value: string): value is SettingsPart =>
  SETTINGS_PARTS.includes(value as SettingsPart);

export const buildSettingsUrl = (part: SettingsPart): string =>
  `${ROUTES.SETTINGS}?part=${part}`;
