'use client';

import {
  SetNewPasswordFormData,
  setNewPasswordSchema,
} from '@/features/auth/password-recovery/set-new-password/model/schema';
import { FormContainer, FormTitle, InputDescription } from '@/shared/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button, clsx, Input } from 'snapflow-ui-kit/client';
import s from './SetNewPasswordPage.module.css';

export const SetNewPasswordPage = () => {
  // const t = useTranslations('Validation');

  const { control, handleSubmit } = useForm<SetNewPasswordFormData>({
    resolver: zodResolver(setNewPasswordSchema),
    defaultValues: {
      password: '',
      password_confirmation: '',
    },
  });

  const onSubmit = async (data: SetNewPasswordFormData) => {
    console.log(data);
  };

  return (
    <FormContainer>
      <form className={'form'} onSubmit={handleSubmit(onSubmit)}>
        <FormTitle title="Create New Password" className={s.title} />
        <div className={s.controllers}>
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="password"
                id="new-password"
                placeholder="Enter new password"
                label="New password"
                allowPasswordToggle={true}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="password_confirmation"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="password"
                id="new-password-confirmation"
                placeholder="Confirm new password"
                label="Password confirmation"
                allowPasswordToggle={true}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </div>

        <InputDescription
          className={s.description}
          description="Your password must be between 6 and 20 characters"
        />
        <Button className={clsx(s.button, 'formButton')} type="submit">
          Create New Password
        </Button>
      </form>
    </FormContainer>
  );
};
