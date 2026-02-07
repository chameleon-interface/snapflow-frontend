'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from 'snapflow-ui-kit';
import { Input } from 'snapflow-ui-kit/client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import s from './ConfirmationExpired.module.css';
import {
  resendEmailSchema,
  type ResendEmailFormData,
} from '../../model/schema';
import clsx from 'clsx';

export const ConfirmationExpired = () => {
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ResendEmailFormData>({
    resolver: zodResolver(resendEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ResendEmailFormData) => {
    // TODO: запрос на бек
    console.log(data);
  };

  return (
    <article className={s.wrapper}>
      <div className={s.textWrapper}>
        <Typography variant={'h1'} as={'h1'} className={s.title}>
          Email verification link expired!
        </Typography>
        <Typography variant={'text-16'}>
          Looks like the verification link has expired. Not to worry, we can
          send the link again
        </Typography>
      </div>
      <form
        className={clsx(s.form, errors.email && s.error)}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Input
          type={'email'}
          label={t('Forms.emailLabel')}
          errorMessage={
            errors.email?.message ? t(errors.email.message) : undefined
          }
          {...register('email')}
        />
        <Button className={s.button} disabled={!isDirty}>
          Resend verification link
        </Button>
      </form>
      <Image
        src={'/images/rafiki.svg'}
        alt={''}
        width={473}
        height={352}
        className={s.image}
      />
    </article>
  );
};
