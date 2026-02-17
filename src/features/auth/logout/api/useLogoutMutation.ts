'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api } from '@/shared/api';
import { ROUTES } from '@/shared/config';
import { tokenStorage } from '@/shared/lib';

export const useLogoutMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.post('/auth/logout'),

    onSuccess: () => {
      tokenStorage.clear();
      queryClient.resetQueries({ queryKey: ['auth', 'me'] });
      router.push(ROUTES.HOME);
    },
  });
};
