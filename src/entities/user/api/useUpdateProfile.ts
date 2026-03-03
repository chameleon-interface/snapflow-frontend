import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateProfileDto } from './types';
import { api } from '@/shared/api';

export const useUpdateProfile = (profileId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['profile', 'update', profileId],
    mutationFn: async (body: UpdateProfileDto) => {
      await api.put<void>('users/profile/', body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', profileId] });
    },
  });
};
