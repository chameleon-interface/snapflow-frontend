'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api/instance';

import { LoginFormData } from '@/features/auth/login/model/schema';
import { handleServerErrors } from '@/shared/lib/forms';

import { UseFormSetError } from 'react-hook-form';
import { loginServerErrorMap } from '@/features/auth/login/model/loginServerErrorMap';

export const useLoginMutation = (setError: UseFormSetError<LoginFormData>) => {
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

    onError: (error) => {
      handleServerErrors({
        error,
        setError,
        serverErrorMap: loginServerErrorMap,
        knownFields: ['email', 'password'],
      });
    },
  });
};
