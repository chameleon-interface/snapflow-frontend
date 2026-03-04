import {
  getAllCitiesOfCountry,
  getCountries,
  isValidCountryCode,
} from '@countrystatecity/countries';
import {
  COUNTRY_CITIES_CACHE_MAX_ENTRIES,
  COUNTRY_CITIES_CACHE_TTL_MS,
  MIN_CITY_QUERY_LENGTH,
  SORT_LOCALE,
} from './constants';
import { normalizeSearchQuery } from './queries';
import type {
  CityResponseItem,
  CountryCitiesCacheEntry,
  CountryResponseItem,
  LocationsResponse,
  NormalizedCity,
} from './types';

const countryCitiesCache = new Map<string, CountryCitiesCacheEntry>();

const byName = <T extends { name: string }>(a: T, b: T) =>
  a.name.localeCompare(b.name, SORT_LOCALE, { sensitivity: 'base' });

const touchCountryCitiesCacheEntry = (
  countryCode: string,
  entry: CountryCitiesCacheEntry,
) => {
  countryCitiesCache.delete(countryCode);
  countryCitiesCache.set(countryCode, entry);
};

const setCountryCitiesCacheEntry = (
  countryCode: string,
  cities: NormalizedCity[],
) => {
  const entry: CountryCitiesCacheEntry = {
    cities,
    expiresAt: Date.now() + COUNTRY_CITIES_CACHE_TTL_MS,
  };

  countryCitiesCache.set(countryCode, entry);

  while (countryCitiesCache.size > COUNTRY_CITIES_CACHE_MAX_ENTRIES) {
    const oldestCountryCode = countryCitiesCache.keys().next().value as
      | string
      | undefined;

    if (!oldestCountryCode) {
      return;
    }

    countryCitiesCache.delete(oldestCountryCode);
  }
};

const getCountryCities = async (countryCode: string) => {
  const cachedEntry = countryCitiesCache.get(countryCode);
  const now = Date.now();

  if (cachedEntry && cachedEntry.expiresAt > now) {
    touchCountryCitiesCacheEntry(countryCode, cachedEntry);

    return cachedEntry.cities;
  }

  if (cachedEntry) {
    countryCitiesCache.delete(countryCode);
  }

  const cities = await getAllCitiesOfCountry(countryCode);
  const uniqueCityNames = new Set<string>();
  const uniqueCities: NormalizedCity[] = [];

  for (const city of cities) {
    const cityName = city.name.trim();

    if (!cityName) {
      continue;
    }

    const normalizedName = cityName.toLocaleLowerCase(SORT_LOCALE);

    if (uniqueCityNames.has(normalizedName)) {
      continue;
    }

    uniqueCityNames.add(normalizedName);
    uniqueCities.push({
      name: cityName,
      normalizedName,
    });
  }

  uniqueCities.sort(byName);
  setCountryCitiesCacheEntry(countryCode, uniqueCities);

  return uniqueCities;
};

export const getCountriesResponse = async (): Promise<
  LocationsResponse<CountryResponseItem>
> => {
  const countries = await getCountries();

  return {
    data: countries
      .map((country) => ({
        code: country.iso2,
        name: country.name,
      }))
      .sort(byName),
  };
};

export const getCitiesResponse = async (
  countryCode: string,
  query: string,
  limit: number,
): Promise<LocationsResponse<CityResponseItem>> => {
  const normalizedCountryCode = countryCode.trim().toUpperCase();
  const countryCodeIsValid = await isValidCountryCode(normalizedCountryCode);

  if (!countryCodeIsValid) {
    return { data: [] };
  }

  const normalizedQuery = normalizeSearchQuery(query);

  if (normalizedQuery.length < MIN_CITY_QUERY_LENGTH) {
    return { data: [] };
  }

  const allCountryCities = await getCountryCities(normalizedCountryCode);
  const filteredCities = allCountryCities
    .filter((city) => city.normalizedName.startsWith(normalizedQuery))
    .slice(0, limit)
    .map((city) => ({ name: city.name }));

  return { data: filteredCities };
};
