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

    onSuccess: async (response) => {
      localStorage.setItem(
        STORAGE_KEYS.ACCESS_TOKEN,
        response.data.accessToken,
      );
      await queryClient.prefetchQuery({
        queryKey: ['auth', 'me'],
        queryFn: async () => {
          const meResponse = await api.get('/auth/me');
          return meResponse.data;
        },
      });

      router.push(ROUTES.PROFILE);
    },
  });
};
