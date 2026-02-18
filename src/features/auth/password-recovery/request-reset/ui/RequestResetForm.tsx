'use client';

import { handleServerErrors } from '@/shared/lib/forms';
import { EmailInput, EmailModal } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Button, Typography } from 'snapflow-ui-kit';
import { useRequestReset } from '../api/useRequestReset';
import { RequestResetFormData, requestResetSchema } from '../model/schema';
import { serverErrorMap } from '../model/serverErrorMap';
import s from './RequestResetForm.module.css';

const ReCAPTCHA = dynamic(
  () => import('react-google-recaptcha').then((mod) => mod.default),
  { ssr: false },
);

export const RequestResetForm = () => {
  const locale = useLocale();
  const t = useTranslations();
  const [sentEmail, setSentEmail] = useState<string | null>(null);
  const [recaptchaKey, setRecaptchaKey] = useState(0);

  const form = useForm<RequestResetFormData>({
    resolver: zodResolver(requestResetSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      recaptchaToken: '',
    },
  });

  const {
    handleSubmit,
    setError,
    setValue,
    control,
    clearErrors,
    formState,
    reset,
  } = form;

  const {
    mutate,
    isSuccess,
    isPending,
    isError,
    reset: resetMutation,
  } = useRequestReset();
  const isButtonDisabled = !formState.isValid || isPending;
  const isRequestCompleted = isSuccess || isError;

  const handleSendLinkAgain = () => {
    reset();
    resetMutation();
    setRecaptchaKey((prev) => prev + 1);
  };

  const onSubmit = (data: RequestResetFormData) => {
    mutate(data, {
      onSuccess: () => {
        setSentEmail(data.email);
      },
      onError: (error) => {
        handleServerErrors({
          error,
          setError,
          serverErrorMap,
          knownFields: ['email', 'recaptchaToken'],
        });
      },
    });
  };

  return (
    <>
      <EmailModal
        open={!!sentEmail}
        onClose={() => setSentEmail(null)}
        email={sentEmail ?? ''}
      />
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <EmailInput />
          <Typography variant="text-14" className={s.description}>
            {t('PasswordRecovery.description')}
          </Typography>
          <Controller
            name="recaptchaToken"
            control={control}
            render={({ fieldState }) => (
              <>
                {isSuccess ? (
                  <Typography
                    className={s.successMessage}
                    as="span"
                    variant="text-14"
                  >
                    {t('PasswordRecovery.successMessage')}
                  </Typography>
                ) : (
                  <div className={s.recaptcha}>
                    <ReCAPTCHA
                      key={`${locale}-${recaptchaKey}`}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                      onChange={(token) => {
                        setValue('recaptchaToken', token || '', {
                          shouldValidate: true,
                          shouldTouch: true,
                        });
                        clearErrors('recaptchaToken');
                      }}
                      onExpired={() => {
                        setValue('recaptchaToken', '', {
                          shouldValidate: true,
                          shouldTouch: true,
                        });
                        setError('recaptchaToken', {
                          message: 'Validation.recaptcha.expired',
                        });
                      }}
                      theme="dark"
                      hl={locale}
                    />
                    {fieldState.error?.message && (
                      <Typography
                        className={s.errorMessage}
                        as="span"
                        variant="text-14"
                      >
                        {t(fieldState.error.message)}
                      </Typography>
                    )}
                  </div>
                )}
              </>
            )}
          />
          <Button
            className={s.sendLinkButton}
            type={isRequestCompleted ? 'button' : 'submit'}
            disabled={isButtonDisabled && !isRequestCompleted}
            onClick={isRequestCompleted ? handleSendLinkAgain : undefined}
          >
            {isRequestCompleted
              ? t('PasswordRecovery.sendLinkAgain')
              : t('PasswordRecovery.sendLink')}
          </Button>
        </form>
      </FormProvider>
    </>
  );
};
