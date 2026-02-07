'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { Input } from 'snapflow-ui-kit/client';

type Props = {
  className?: string;
  label?: string;
  placeholder?: string;
  confirmMode?: boolean;
};

export const PasswordInput = ({
  className,
  label,
  placeholder,
  confirmMode,
}: Props) => {
  const tPassword = useTranslations('PasswordInput');
  const tConfirm = useTranslations('PasswordConfirmationInput');
  const tValidation = useTranslations();
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return confirmMode ? (
    <Input
      id={'password_confirmation'}
      type="password"
      label={label || tConfirm('label')}
      placeholder={placeholder || tConfirm('placeholder')}
      aria-label={tConfirm('ariaLabel')}
      allowPasswordToggle={true}
      errorMessage={
        errors.password_confirmation?.message &&
        tValidation(errors.password_confirmation.message as string)
      }
      className={className}
      {...register('password_confirmation')}
    />
  ) : (
    <Input
      id={'password'}
      type="password"
      label={label || tPassword('label')}
      placeholder={placeholder || tPassword('placeholder')}
      aria-label={tPassword('ariaLabel')}
      allowPasswordToggle={true}
      errorMessage={
        errors.password?.message &&
        tValidation(errors.password.message as string)
      }
      className={className}
      {...register('password')}
    />
  );
};
