'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { Input } from 'snapflow-ui-kit/client';

type Props = {
  className?: string;
};

export const UsernameInput = ({ className }: Props) => {
  const t = useTranslations();
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Input
      id={'username'}
      className={className}
      label={t('Forms.usernameLabel')}
      errorMessage={
        errors.username?.message && t(errors.username.message as string)
      }
      {...register('username')}
    />
  );
};
