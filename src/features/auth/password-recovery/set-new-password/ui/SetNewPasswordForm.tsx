'use client';

import { handleServerErrors } from '@/shared/lib/forms';
import { PasswordInput } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Typography } from 'snapflow-ui-kit';
import { toastSuccess } from 'snapflow-ui-kit/client';
import { useSetNewPassword } from '../api/useSetNewPassword';
import { serverErrorMap } from '../model/serverErrorMap';
import { SetNewPasswordFormData, setNewPasswordSchema } from '../model/schema';
import s from './SetNewPasswordForm.module.css';

type Props = {
  recoveryCode: string;
};

export const SetNewPasswordForm = ({ recoveryCode }: Props) => {
  const t = useTranslations();
  const router = useRouter();

  const form = useForm<SetNewPasswordFormData>({
    resolver: zodResolver(setNewPasswordSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      password: '',
      password_confirmation: '',
    },
  });

  const { mutate, isPending } = useSetNewPassword();
  const { formState, handleSubmit, setError } = form;

  const isButtonDisabled = !formState.isValid || isPending;

  const onSubmit = (data: SetNewPasswordFormData) => {
    mutate(
      {
        newPassword: data.password,
        recoveryCode,
      },
      {
        onSuccess: () => {
          toastSuccess(t('PasswordRecovery.passwordChangedSuccess'));
          router.replace('/sign-in');
        },
        onError: (error) => {
          handleServerErrors({
            error,
            setError,
            serverErrorMap,
            knownFields: ['password', 'password_confirmation'],
          });
        },
      },
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={s.controllers}>
          <PasswordInput label={t('PasswordRecovery.newPasswordLabel')} />
          <PasswordInput confirmMode />
        </div>
        <Typography variant="text-14" className={s.description}>
          {t('PasswordRecovery.passwordDescription')}
        </Typography>
        <Button className={s.button} type="submit" disabled={isButtonDisabled}>
          {t('PasswordRecovery.createNewPasswordButton')}
        </Button>
      </form>
    </FormProvider>
  );
};
