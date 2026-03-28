'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authControllerLogout } from '@/shared/api/generated/endpoints/auth/auth';
import { ROUTES } from '@/shared/config';
import { tokenStorage } from '@/shared/lib';

export const useLogoutMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authControllerLogout(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['auth', 'me'] });
      tokenStorage.clear();
      queryClient.setQueryData(['auth', 'me'], null);
      router.push(ROUTES.HOME);
    },
  });
};
