export type SettingsFormValues = {
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  city: string;
  about: string;
};

export const DEFAULT_SETTINGS_FORM_VALUES: SettingsFormValues = {
  username: 'Usertest',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  country: '',
  city: '',
  about: '',
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
