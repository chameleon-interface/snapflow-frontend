'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api/instance';

import { LoginFormData } from '@/features/auth/login/model/schema';

export const useLoginMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginFormData) =>
      api.post<{ accessToken: string }>('auth/login', data),

    onSuccess: (response) => {
      localStorage.setItem('accessToken', response.data.accessToken);

      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });

      router.push('/profile');
    },
  });
};
