import type { SettingsFormValues } from './schema';

export const DEFAULT_SETTINGS_FORM_VALUES: SettingsFormValues = {
  username: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  country: '',
  city: '',
  aboutMe: '',
};

export const COUNTRY_OPTIONS = [
  { value: 'usa', label: 'United States' },
  { value: 'canada', label: 'Canada' },
  { value: 'germany', label: 'Germany' },
  { value: 'japan', label: 'Japan' },
];

export const CITY_OPTIONS = [
  { value: 'new-york', label: 'New York' },
  { value: 'toronto', label: 'Toronto' },
  { value: 'berlin', label: 'Berlin' },
  { value: 'tokyo', label: 'Tokyo' },
];
