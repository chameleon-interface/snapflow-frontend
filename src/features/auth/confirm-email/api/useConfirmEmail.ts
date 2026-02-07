'use client';

import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api';

type ConfirmationEmailCodeInputDto = {
  code: string;
};

export const useConfirmEmail = () => {
  return useMutation({
    mutationFn: (body: ConfirmationEmailCodeInputDto) =>
      api.post<void>('auth/registration-confirmation', body),
  });
};
