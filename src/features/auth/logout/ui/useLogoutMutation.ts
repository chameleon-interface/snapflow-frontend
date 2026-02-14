'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api } from '@/shared/api/instance';

export const useLogoutMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await api.post('auth/logout');

      // удаляем только если запрос успешен
      localStorage.removeItem('accessToken');
    },

    onSuccess: () => {
      router.push('/sign-in');
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });
};
