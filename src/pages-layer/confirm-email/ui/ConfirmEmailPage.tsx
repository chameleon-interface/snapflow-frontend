'use client';

import { useSearchParams } from 'next/navigation';
import {
  ConfirmationSuccess,
  ResendVerificationForm,
  useConfirmEmail,
} from '@/features/auth/confirm-email';
import { ExpiredLinkLayout } from '@/shared/ui';
import { useEffect } from 'react';

export const ConfirmEmailPage = () => {
  const searchParams = useSearchParams();
  const { mutate, isSuccess, isError } = useConfirmEmail();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) return;
    mutate({ code });
  }, [mutate, searchParams]);

  // TODO: loading
  if (isSuccess) return <ConfirmationSuccess />;
  if (isError)
    return (
      <ExpiredLinkLayout>
        <ResendVerificationForm />
      </ExpiredLinkLayout>
    );
  return <div>Pending...</div>;
};
