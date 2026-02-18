'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'snapflow-ui-kit';
import { useTranslations } from 'next-intl';
import s from './RegistrationForm.module.css';
import {
  registrationSchema,
  type RegistrationFormData,
} from '../../model/schema';
import { serverErrorMap } from '../../model/serverErrorMap';
import { handleServerErrors } from '@/shared/lib';
import clsx from 'clsx';
import { useState } from 'react';
import { useRegistration } from '../../api/useRegistration';
import { AgreeToTermsCheckbox } from '../AgreeToTermsCheckbox';
import {
  EmailInput,
  EmailModal,
  PasswordInput,
  UsernameInput,
} from '@/shared/ui';

export const RegistrationForm = () => {
  const form = useForm<RegistrationFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      agreeToTerms: false,
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setError,
  } = form;
  const t = useTranslations();
  const [sentEmail, setSentEmail] = useState<string | null>(null);

  const { mutate, isPending } = useRegistration();

  const onSubmit = (data: RegistrationFormData) => {
    mutate(
      {
        username: data.username,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => setSentEmail(data.email),
        onError: (error) =>
          handleServerErrors({
            error,
            setError,
            serverErrorMap,
            knownFields: [
              'username',
              'email',
              'password',
              'password_confirmation',
            ],
          }),
      },
    );
  };

  const closeModalHandler = () => {
    setSentEmail(null);
    reset();
  };

  return (
    <>
      <EmailModal
        open={!!sentEmail}
        onClose={closeModalHandler}
        email={sentEmail ?? ''}
      />
      <FormProvider {...form}>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <fieldset disabled={isPending} className={s.fieldset}>
            <UsernameInput className={clsx(errors.username && s.error)} />
            <EmailInput className={clsx(errors.email && s.error)} />
            <PasswordInput className={clsx(errors.password && s.error)} />
            <PasswordInput
              confirmMode
              className={clsx(errors.password_confirmation && s.error)}
            />
            <AgreeToTermsCheckbox />
            <Button
              type={'submit'}
              className={s.button}
              disabled={!isValid || isPending}
            >
              {t('Forms.Registration.submit')}
            </Button>
          </fieldset>
        </form>
      </FormProvider>
    </>
  );
};
