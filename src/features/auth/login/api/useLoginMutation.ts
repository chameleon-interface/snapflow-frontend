'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authControllerLogin } from '@/shared/api/generated/endpoints/auth/auth';

import { LoginFormData } from '@/features/auth/login/model/schema';
import { tokenStorage } from '@/shared/lib';

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginFormData) => authControllerLogin(data),

    onSuccess: (response) => {
      tokenStorage.set(response.accessToken);
      queryClient.invalidateQueries({
        queryKey: ['auth', 'me'],
      });
    },
  });
};
