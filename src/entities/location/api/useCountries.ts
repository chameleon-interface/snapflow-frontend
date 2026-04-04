import { useQuery } from '@tanstack/react-query';
import { locationsKeys } from '@/shared/api/keys-factories/locationsKeysFactory';
import { LOCATIONS_GC_TIME, LOCATIONS_STALE_TIME } from './constants';
import { loadLocations } from './request';
import type { CountryDto } from './types';

export const useCountries = () => {
  return useQuery({
    queryKey: locationsKeys.countries(),
    queryFn: ({ signal }) => {
      const searchParams = new URLSearchParams({ type: 'countries' });

      return loadLocations<CountryDto>(searchParams, signal);
    },
    staleTime: LOCATIONS_STALE_TIME,
    gcTime: LOCATIONS_GC_TIME,
  });
};
