'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api/instance';

import { LoginFormData } from '@/features/auth/login/model/schema';
import { handleServerErrors } from '@/shared/lib/forms';

import { UseFormSetError } from 'react-hook-form';
import { loginServerErrorMap } from '@/features/auth/login/model/loginServerErrorMap';

export const useLoginMutation = (setError: UseFormSetError<LoginFormData>) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const { data: response } = await api.post<{ accessToken: string }>(
        'auth/login',
        {
          email: data.email,
          password: data.password,
        },
      );

      localStorage.setItem('accessToken', response.accessToken);

      return response;
    },

    onSuccess: () => {
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
