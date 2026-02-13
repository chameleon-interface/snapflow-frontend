import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { RequestResetFormData } from '../model/schema';

export const useRequestReset = () => {
    return useMutation({
        mutationFn: (body: RequestResetFormData) =>
            api.post<void>('/auth/password-recovery', body),
    });
};
