'use client';

import { RequestResetForm } from '@/features/auth/password-recovery';
import { EmailModal, FormWrapper } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import s from '../PasswordRecovery.module.css';

export const RequestResetPage = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const t = useTranslations('Pages');

  const openModalHandler = (email: string) => {
    setOpen(true);
    setEmail(email);
  };

  const closeModalHandler = () => {
    setOpen(false);
  };

  return (
    <>
      <FormWrapper title={t('forgotPasswordTitle')} className={s.formWrapper}>
        <RequestResetForm openModal={openModalHandler} />
      </FormWrapper>
      <EmailModal
        open={open}
        onClose={closeModalHandler}
        email={email}
      />
    </>
  );
};
