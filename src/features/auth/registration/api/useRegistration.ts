import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api';

type RegistrationUserInputDto = {
  username: string;
  email: string;
  password: string;
};

export const useRegistration = () => {
  return useMutation({
    mutationFn: (body: RegistrationUserInputDto) =>
      api.post<void>('/auth/registration', body),
  });
};
