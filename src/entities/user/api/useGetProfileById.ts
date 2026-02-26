import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { UserProfile } from './types';

const mockApiUrl = 'http://localhost:3001';

export const useGetProfileById = (profileId: number) => {
  return useQuery({
    queryKey: ['profiles', profileId],
    queryFn: async () => {
      const response = await axios.get<UserProfile>(
        `${mockApiUrl}/profiles/${profileId}`,
      );

      return response.data;
    },
  });
};
