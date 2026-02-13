'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api/authApi';
import { LoginFormData } from '@/features/auth/login/model/schema';
import { handleServerErrors } from '@/shared/lib/forms';
import { serverErrorMap } from '@/features/auth/confirm-email/model/serverErrorMap';
import { UseFormSetError } from 'react-hook-form';

export const useLoginMutation = (setError: UseFormSetError<LoginFormData>) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginFormData) =>
      authApi.login(data.email, data.password),

    onSuccess: () => {
      router.push('/');
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
