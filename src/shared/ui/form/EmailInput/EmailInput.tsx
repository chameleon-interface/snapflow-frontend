'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { Input } from 'snapflow-ui-kit/client';

type Props = {
  className?: string;
};

export const EmailInput = ({ className }: Props) => {
  const t = useTranslations();
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Input
      id={'email'}
      type="email"
      className={className}
      label={t('Forms.emailLabel')}
      errorMessage={errors.email?.message && t(errors.email.message as string)}
      {...register('email')}
    />
  );
};
