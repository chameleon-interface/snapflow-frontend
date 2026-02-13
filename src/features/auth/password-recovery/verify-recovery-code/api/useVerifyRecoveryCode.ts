'use client';

import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api';

type VerifyRecoveryCodeDto = {
    recoveryCode: string;
};

export const useVerifyRecoveryCode = () => {
    return useMutation({
        mutationFn: (body: VerifyRecoveryCodeDto) =>
            api.post<void>('/auth/check-password-recovery-code', body),
    });
};
