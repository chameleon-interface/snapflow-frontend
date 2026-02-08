'use client';

import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Typography } from 'snapflow-ui-kit';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import s from './RegistrationForm.module.css';
import {
  registrationSchema,
  type RegistrationFormData,
} from '../../model/schema';
import { serverErrorMap } from '../../model/serverErrorMap';
import { handleServerErrors } from '@/shared/lib/forms';
import clsx from 'clsx';
import { useState } from 'react';
import { useRegistration } from '../../api/useRegistration';
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
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue,
    setError,
  } = form;
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate, isPending } = useRegistration();

  const onSubmit = (data: RegistrationFormData) => {
    mutate(
      {
        username: data.username,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => setIsModalOpen(true),
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
    setIsModalOpen(false);
    reset();
  };

  return (
    <>
      <EmailModal
        open={isModalOpen}
        onClose={closeModalHandler}
        email={form.getValues('email')}
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
            <Controller
              name={'agreeToTerms'}
              control={control}
              render={({ field }) => (
                <Checkbox
                  name={field.name}
                  onBlur={field.onBlur}
                  checked={!!field.value}
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
          </fieldset>
        </form>
      </FormProvider>
    </>
  );
};
