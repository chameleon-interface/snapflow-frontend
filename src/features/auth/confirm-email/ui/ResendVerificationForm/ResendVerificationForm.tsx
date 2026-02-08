'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'snapflow-ui-kit';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { useState } from 'react';
import s from './ResendVerificationForm.module.css';
import {
  type ResendEmailFormData,
  resendEmailSchema,
} from '../../model/schema';
import { serverErrorMap } from '../../model/serverErrorMap';
import { useResendConfirmation } from '../../api/useResendConfirmation';
import { EmailModal, EmailInput } from '@/shared/ui';

export const ResendVerificationForm = () => {
  const t = useTranslations();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<ResendEmailFormData>({
    resolver: zodResolver(resendEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const {
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty },
    getValues,
  } = form;

  const { mutate, isPending } = useResendConfirmation();

  const onSubmit = (data: ResendEmailFormData) => {
    mutate(data.email, {
      onSuccess: () => setIsModalOpen(true),
      onError: (error) => {
        error.response?.data.errors.forEach(({ field, message }) => {
          setError(field as keyof ResendEmailFormData, {
            message: serverErrorMap[message] ?? message,
          });
        });
      },
    });
  };

  return (
    <>
      <EmailModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          reset();
        }}
        email={getValues('email')}
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
