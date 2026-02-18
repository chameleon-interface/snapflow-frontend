'use client';

import { RequestResetForm } from '@/features/auth/password-recovery';
import { ROUTES } from '@/shared/config';
import { FormWrapper } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from 'snapflow-ui-kit';
import s from './PasswordRecoveryPage.module.css';

export const PasswordRecoveryPage = () => {
  const t = useTranslations();

  return (
    <>
      <FormWrapper
        title={t('Pages.forgotPasswordTitle')}
        className={s.formWrapper}
      >
        <RequestResetForm />
        <Button
          className={s.backButton}
          variant="text"
          as={Link}
          href={ROUTES.SIGN_IN}
        >
          {t('PasswordRecovery.backToSignIn')}
        </Button>
      </FormWrapper>
    </>
  );
};
