'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api } from '@/shared/api/instance';
import { ROUTES } from '@/shared/config/routes';
import { STORAGE_KEYS } from '@/shared/config/storage';

export const useLogoutMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.post('/auth/logout'),

    onSuccess: () => {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      router.push(ROUTES.HOME);
    },
  });
};
