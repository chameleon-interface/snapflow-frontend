import { DEFAULT_CITY_LIMIT, MAX_CITY_LIMIT, SORT_LOCALE } from './constants';

export const normalizeSearchQuery = (query: string) =>
  query.trim().toLocaleLowerCase(SORT_LOCALE);

export const normalizeLimit = (value: string | null) => {
  if (!value) {
    return DEFAULT_CITY_LIMIT;
  }

  const parsedLimit = Number.parseInt(value, 10);

  if (Number.isNaN(parsedLimit) || parsedLimit <= 0) {
    return DEFAULT_CITY_LIMIT;
  }

  return Math.min(parsedLimit, MAX_CITY_LIMIT);
};
