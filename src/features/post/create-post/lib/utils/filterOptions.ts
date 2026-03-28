import { DEFAULT_FILTERS } from 'cc-gram';

export const FILTER_OPTIONS: { id: string; label: string }[] = [
  { id: 'normal', label: 'Normal' },
  ...Array.from(DEFAULT_FILTERS.keys()).map((id) => ({
    id,
    label: id === '1977' ? '1977' : id.charAt(0).toUpperCase() + id.slice(1),
  })),
];
