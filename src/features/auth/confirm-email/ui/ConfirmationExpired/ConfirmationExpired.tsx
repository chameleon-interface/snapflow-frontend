'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from 'snapflow-ui-kit';
import { Input } from 'snapflow-ui-kit/client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import s from './ConfirmationExpired.module.css';
import {
  type ResendEmailFormData,
  resendEmailSchema,
} from '../../model/schema';
import { serverErrorMap } from '../../model/serverErrorMap';
import { useResendConfirmation } from '../../api/useResendConfirmation';
import { EmailModal } from '@/shared/ui';
import clsx from 'clsx';
import { useState } from 'react';

type Props = {
  withInput?: boolean;
};

export const ConfirmationExpired = ({ withInput = true }: Props) => {
  const t = useTranslations();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty },
    getValues,
  } = useForm<ResendEmailFormData>({
    resolver: zodResolver(resendEmailSchema),
    defaultValues: {
      email: '',
    },
  });

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
      <article className={s.wrapper}>
        <div className={s.textWrapper}>
          <Typography variant={'h1'} as={'h1'} className={s.title}>
            {t('LinkExpired.title')}
          </Typography>
          <Typography variant={'text-16'}>
            {t('LinkExpired.description')}
          </Typography>
        </div>
        <form
          className={clsx(s.form, withInput && errors.email && s.error)}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {withInput && (
            <Input
              type={'email'}
              label={t('Forms.emailLabel')}
              disabled={isPending}
              errorMessage={
                errors.email?.message ? t(errors.email.message) : undefined
              }
              {...register('email')}
            />
          )}
          <Button
            className={s.button}
            disabled={(withInput && !isDirty) || isPending}
          >
            {t('LinkExpired.resendButton')}
          </Button>
        </form>
        <Image
          src={'/images/rafiki.svg'}
          alt={t('LinkExpired.imageAlt')}
          width={473}
          height={352}
          className={s.image}
        />
      </article>
    </>
  );
};
