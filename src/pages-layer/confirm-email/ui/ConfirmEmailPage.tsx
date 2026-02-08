'use client';

import {
  ConfirmationSuccess,
  ResendVerificationForm,
  useConfirmEmail,
} from '@/features/auth/confirm-email';
import { ExpiredLinkLayout } from '@/shared/ui';
import { useEffect } from 'react';

type Props = {
  code: string;
};

export const ConfirmEmailPage = ({ code }: Props) => {
  const { mutate, isSuccess, isError } = useConfirmEmail();

  useEffect(() => {
    mutate({ code });
  }, [mutate, code]);

  if (isSuccess) return <ConfirmationSuccess />;

  if (isError) {
    return (
      <ExpiredLinkLayout>
        <ResendVerificationForm />
      </ExpiredLinkLayout>
    );
  }

  return null;
};
