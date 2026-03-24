import { useQuery } from '@tanstack/react-query';
import {
  DEFAULT_CITY_LIMIT,
  LOCATIONS_GC_TIME,
  LOCATIONS_STALE_TIME,
  MIN_CITY_QUERY_LENGTH,
} from './constants';
import { loadLocations } from './request';
import type { CityDto } from './types';

type UseCitiesByCountryParams = {
  countryCode?: string;
  query?: string;
  limit?: number;
};

export const useCitiesByCountry = ({
  countryCode,
  query = '',
  limit = DEFAULT_CITY_LIMIT,
}: UseCitiesByCountryParams) => {
  const normalizedQuery = query.trim();
  const isQueryLongEnough = normalizedQuery.length >= MIN_CITY_QUERY_LENGTH;

  return useQuery({
    queryKey: ['locations', 'cities', countryCode, normalizedQuery, limit],
    queryFn: ({ signal }) => {
      const searchParams = new URLSearchParams({
        type: 'cities',
        countryCode: countryCode!,
        q: normalizedQuery,
        limit: String(limit),
      });

      return loadLocations<CityDto>(searchParams, signal);
    },
    enabled: Boolean(countryCode) && isQueryLongEnough,
    staleTime: LOCATIONS_STALE_TIME,
    gcTime: LOCATIONS_GC_TIME,
  });
};
