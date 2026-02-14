'use client';

import { handleServerErrors } from '@/shared/lib/forms';
import { EmailInput, EmailModal } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from 'snapflow-ui-kit';
import { useResendConfirmation } from '../../api/useResendConfirmation';
import {
  type ResendEmailFormData,
  resendEmailSchema,
} from '../../model/schema';
import { serverErrorMap } from '../../model/serverErrorMap';
import s from './ResendVerificationForm.module.css';

export const ResendVerificationForm = () => {
  const t = useTranslations();
  const router = useRouter();

  const [sentEmail, setSentEmail] = useState<string | null>(null);

  const form = useForm<ResendEmailFormData>({
    resolver: zodResolver(resendEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isDirty },
  } = form;

  const { mutate, isPending } = useResendConfirmation();

  const onSubmit = (data: ResendEmailFormData) => {
    mutate(data.email, {
      onSuccess: () => setSentEmail(data.email),
      onError: (error) =>
        handleServerErrors({
          error,
          setError,
          serverErrorMap,
          knownFields: ['email'],
        }),
    });
  };

  return (
    <>
      <EmailModal
        open={!!sentEmail}
        onClose={() => {
          router.replace('/');
        }}
        email={sentEmail ?? ''}
      />
      <FormProvider {...form}>
        <form
          className={clsx(s.form, errors.email && s.error)}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <EmailInput />
          <Button className={s.button} disabled={!isDirty || isPending}>
            {t('LinkExpired.resendButton')}
          </Button>
        </form>
      </FormProvider>
    </>
  );
};
