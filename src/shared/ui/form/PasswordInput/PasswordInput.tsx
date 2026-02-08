'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { Input } from 'snapflow-ui-kit/client';

type Props = {
  className?: string;
  label?: string;
  confirmMode?: boolean;
};

export const PasswordInput = ({ className, label, confirmMode }: Props) => {
  const t = useTranslations();
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return confirmMode ? (
    <Input
      id={'password_confirmation'}
      type="password"
      label={label || t('Forms.passwordConfirmationLabel')}
      allowPasswordToggle
      errorMessage={
        errors.password_confirmation?.message &&
        t(errors.password_confirmation.message as string)
      }
      className={className}
      {...register('password_confirmation')}
    />
  ) : (
    <Input
      id={'password'}
      type="password"
      label={label || t('Forms.passwordLabel')}
      allowPasswordToggle
      errorMessage={
        errors.password?.message && t(errors.password.message as string)
      }
      className={className}
      {...register('password')}
    />
  );
};
