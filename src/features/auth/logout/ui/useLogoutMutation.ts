'use client';

import { useMutation } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import { authApi } from '@/features/auth/api/authApi';

export const useLogoutMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      router.push('/sign-in');
    },
  });
};
