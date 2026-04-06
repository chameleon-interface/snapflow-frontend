'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authControllerLogin } from '@/shared/api/generated/endpoints/auth/auth';
import type { LoginUserInputDto } from '@/shared/api/generated/model';
import { authKeys } from '@/shared/api/keys-factories/authKeysFactory';

import { tokenStorage } from '@/shared/lib';

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginUserInputDto) => authControllerLogin(data),

    onSuccess: (response) => {
      tokenStorage.set(response.accessToken);
      queryClient.invalidateQueries({
        queryKey: authKeys.me(),
      });
    },
  });
};
