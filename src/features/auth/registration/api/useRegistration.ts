import { useMutation } from '@tanstack/react-query';
import { authControllerRegistration } from '@/shared/api/generated/endpoints/auth/auth';
import type { RegistrationUserInputDto } from '@/shared/api/generated/model';

export const useRegistration = () => {
  return useMutation({
    mutationFn: (body: RegistrationUserInputDto) =>
      authControllerRegistration(body),
  });
};
