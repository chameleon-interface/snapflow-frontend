import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { UpdateProfileDto } from './types';

const mockApiUrl = 'http://localhost:3001';

export const useUpdateProfile = (profileId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['profiles', 'update', profileId],
    mutationFn: async (body: UpdateProfileDto) => {
      await axios.put<void>(`${mockApiUrl}/profiles/${profileId}`, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles', profileId] });
    },
  });
};
