'use client';

import { SetNewPasswordForm } from '@/features/auth/password-recovery';
import { useVerifyRecoveryCode } from '@/features/auth/password-recovery/verify-recovery-code/api/useVerifyRecoveryCode';
import { ExpiredLinkLayout, FormWrapper } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from 'snapflow-ui-kit';
import s from '../PasswordRecovery.module.css';

type Props = {
  recoveryCode: string;
};

export const SetNewPasswordPage = ({ recoveryCode }: Props) => {
  const t = useTranslations();
  const { mutate, isSuccess, isError } = useVerifyRecoveryCode();

  useEffect(() => {
    mutate({ recoveryCode });
  }, [mutate, recoveryCode]);

  if (isSuccess) {
    return (
      <FormWrapper title={t('Pages.createNewPasswordTitle')} className={s.formWrapper}>
        <SetNewPasswordForm recoveryCode={recoveryCode} />
      </FormWrapper>
    );
  }

  if (isError) {
    return (
      <ExpiredLinkLayout>
        <Button as={Link} href="/password-recovery/request-reset">
          {t('LinkExpired.resendButton')}
        </Button>
      </ExpiredLinkLayout>
    );
  }

  return null;
};
