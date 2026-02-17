'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api/instance';
import { ROUTES } from '@/shared/config/routes';
import { STORAGE_KEYS } from '@/shared/config/storage';

import { LoginFormData } from '@/features/auth/login/model/schema';

export const useLoginMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginFormData) =>
      api.post<{ accessToken: string }>('auth/login', data),

    onSuccess: (response) => {
      localStorage.setItem(
        STORAGE_KEYS.ACCESS_TOKEN,
        response.data.accessToken,
      );
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });

      router.push(ROUTES.PROFILE);
    },
  });
};
