'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api } from '@/shared/api/instance';
import { tokenService } from '@/shared/lib/tokenService/tokenService';

export const useLogoutMutation = () => {
  const router = useRouter();

  return useMutation({
    // Встроенная логика логаута
    mutationFn: async () => {
      try {
        await api.post('auth/logout');
      } finally {
        tokenService.remove();
      }
    },

    onSuccess: () => {
      router.push('/sign-in');
    },
  });
};
