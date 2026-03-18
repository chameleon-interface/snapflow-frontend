import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateProfileDto } from './types';
import { api } from '@/shared/api';

export const useUpdateProfile = (profileId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: UpdateProfileDto) => {
      await api.put<void>('users/profile/', body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', profileId] });
    },
  });
};
