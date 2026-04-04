export const locationsKeys = {
  all: ['locations'],
  countries: () => [...locationsKeys.all, 'countries'],
  citiesByCountry: (
    countryCode: string | undefined,
    normalizedQuery: string,
    limit: number,
  ) => [...locationsKeys.all, 'cities', countryCode, normalizedQuery, limit],
};
