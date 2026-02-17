'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { ROUTES } from '@/shared/config';

import { LoginFormData } from '@/features/auth/login/model/schema';
import { tokenStorage } from '@/shared/lib';

export const useLoginMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginFormData) =>
      api.post<{ accessToken: string }>('auth/login', data),

    onSuccess: (response) => {
      tokenStorage.set(response.data.accessToken);
      queryClient.invalidateQueries({
        queryKey: ['auth', 'me'],
      });

      router.push(ROUTES.PROFILE);
    },
  });
};
