'use client';

import {
  ConfirmationSuccess,
  ResendVerificationForm,
  useConfirmEmail,
} from '@/features/auth/confirm-email';
import { ExpiredLinkLayout } from '@/shared/ui';

type Props = {
  code: string;
};

export const ConfirmEmailPage = ({ code }: Props) => {
  const { isSuccess, isError } = useConfirmEmail(code);

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
