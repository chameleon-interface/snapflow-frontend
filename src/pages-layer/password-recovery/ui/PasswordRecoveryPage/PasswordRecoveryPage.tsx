'use client';

import { RequestResetForm } from '@/features/auth/password-recovery';
import { FormWrapper } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import s from './PasswordRecoveryPage.module.css';

export const PasswordRecoveryPage = () => {
  const t = useTranslations('Pages');

  return (
    <>
      <FormWrapper title={t('forgotPasswordTitle')} className={s.formWrapper}>
        <RequestResetForm />
      </FormWrapper>
    </>
  );
};
