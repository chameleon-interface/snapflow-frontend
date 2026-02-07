'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Typography } from 'snapflow-ui-kit';
import { Input } from 'snapflow-ui-kit/client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import s from './RegistrationForm.module.css';
import {
  registrationSchema,
  type RegistrationFormData,
} from '@/features/auth/registration/model/schema';
import clsx from 'clsx';
import { useState } from 'react';
import { EmailSentModal } from '../EmailSentModal';
import { useRegistration } from '../../api/useRegistration';

export const RegistrationForm = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue,
    setError,
  } = useForm<RegistrationFormData>({
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
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const { mutate, isPending } = useRegistration();

  const onSubmit = (data: RegistrationFormData) => {
    setSubmittedEmail(data.email);
    mutate(
      {
        username: data.username,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => setIsModalOpen(true),
        onError: (error) => {
          error.response?.data.errors.forEach(({ field, message }) => {
            setError(field as keyof RegistrationFormData, { message });
          });
        },
      },
    );
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
    reset();
  };

  return (
    <>
      <EmailSentModal
        open={isModalOpen}
        onClose={closeModalHandler}
        email={submittedEmail}
      />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          id={'registration-username'}
          label={t('Forms.usernameLabel')}
          errorMessage={
            errors.username?.message ? t(errors.username.message) : undefined
          }
          disabled={isPending}
          className={clsx(errors.username && s.error)}
          {...register('username')}
        />
        <Input
          id={'registration-email'}
          label={t('Forms.emailLabel')}
          errorMessage={
            errors.email?.message ? t(errors.email.message) : undefined
          }
          disabled={isPending}
          className={clsx(errors.email && s.error)}
          {...register('email')}
        />
        <Input
          id={'registration-password'}
          label={t('Forms.passwordLabel')}
          type={'password'}
          allowPasswordToggle
          errorMessage={
            errors.password?.message ? t(errors.password.message) : undefined
          }
          disabled={isPending}
          className={clsx(errors.password && s.error)}
          {...register('password')}
        />
        <Input
          id={'registration-password-confirmation'}
          label={t('Forms.passwordConfirmationLabel')}
          type={'password'}
          allowPasswordToggle
          onPaste={(event) => event.preventDefault()}
          errorMessage={
            errors.password_confirmation?.message
              ? t(errors.password_confirmation.message)
              : undefined
          }
          disabled={isPending}
          className={clsx(errors.password_confirmation && s.error)}
          {...register('password_confirmation')}
        />
        <Controller
          name={'agreeToTerms'}
          control={control}
          render={({ field }) => (
            <Checkbox
              name={field.name}
              onBlur={field.onBlur}
              checked={!!field.value}
              disabled={isPending}
              className={s.checkbox}
              onChange={(event) => {
                setValue('agreeToTerms', event.target.checked, {
                  shouldValidate: true,
                });
              }}
            >
              <Typography variant={'small'}>
                {t('Forms.Registration.agreeToTermsPrefix')}&nbsp;
                <Typography
                  as={Link}
                  href={'/sign-up/terms-of-service'}
                  variant={'small-link'}
                >
                  {t('Forms.Registration.termsOfService')}
                </Typography>
                &nbsp;{t('Forms.Registration.and')}&nbsp;
                <Typography
                  as={Link}
                  href={'/sign-up/privacy-policy'}
                  variant={'small-link'}
                >
                  {t('Forms.Registration.privacyPolicy')}
                </Typography>
              </Typography>
            </Checkbox>
          )}
        />
        <Button
          type={'submit'}
          className={s.button}
          disabled={!isValid || isPending}
        >
          {t('Forms.Registration.submit')}
        </Button>
      </form>
    </>
  );
};
