import { FormProvider, useForm } from 'react-hook-form';
import s from './LoginForm.module.css';
import { EmailInput, PasswordInput } from '@/shared/ui';
import Link from 'next/link';
import { Button } from 'snapflow-ui-kit/client';
import { useTranslations } from 'next-intl';
import { LoginFormData, loginSchema } from '@/features/auth/login/model/schema';
import { useLoginMutation } from '@/features/auth/login/api/useLoginMutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from 'snapflow-ui-kit';

export const LoginForm = () => {
  const t = useTranslations();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { email: '', password: '' },
  });

  const { mutate, isPending } = useLoginMutation();

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={s.form}>
        <EmailInput />
        <PasswordInput />

        <Typography
          variant="text-14"
          as={Link}
          href="/password-recovery"
          className={s.forgotPasswordLink}
        >
          {t('Forms.forgotPassword')}
        </Typography>

        <Button type="submit" disabled={isPending}>
          {t('Auth.signIn')}
        </Button>
      </form>
    </FormProvider>
  );
};
