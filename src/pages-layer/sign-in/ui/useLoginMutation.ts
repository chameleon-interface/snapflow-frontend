'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api/instance';
import { tokenService } from '@/shared/lib/tokenService/tokenService';
import { LoginFormData } from '@/features/auth/login/model/schema';
import { handleServerErrors } from '@/shared/lib/forms';
import { serverErrorMap } from '@/features/auth/confirm-email/model/serverErrorMap';
import { UseFormSetError } from 'react-hook-form';

export const useLoginMutation = (setError: UseFormSetError<LoginFormData>) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const { data: response } = await api.post<{ accessToken: string }>(
        'auth/login',
        { email: data.email, password: data.password },
      );

      tokenService.set(response.accessToken);

      return response;
    },

    onSuccess: () => {
      router.push('/'); //
    },

    onError: (error) => {
      handleServerErrors({
        error,
        setError,
        serverErrorMap,
        knownFields: ['email', 'password'],
      });
    },
  });
};
