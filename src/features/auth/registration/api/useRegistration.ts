import { useMutation } from '@tanstack/react-query';
import { authControllerRegistration } from '@/shared/api/generated/endpoints/core/auth/auth';
import type { RegistrationUserInputDto } from '@/shared/api/generated/model/core';

export const useRegistration = () => {
  return useMutation({
    mutationFn: (body: RegistrationUserInputDto) =>
      authControllerRegistration(body),
  });
};
