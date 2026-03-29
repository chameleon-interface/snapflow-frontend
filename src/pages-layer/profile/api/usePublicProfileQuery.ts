import { useQuery } from '@tanstack/react-query';
import { getProfile } from './profile';

export const usePublicProfileQuery = (id: string) => {
  return useQuery({
    queryKey: ['public-profile', id],
    queryFn: () => getProfile(id),
    enabled: Number.isFinite(Number(id)),
    staleTime: 5 * 60 * 1000,
  });
};
