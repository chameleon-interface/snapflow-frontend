import { FormProvider, useForm } from 'react-hook-form';
import s from './LoginForm.module.css';
import { EmailInput, PasswordInput } from '@/shared/ui';
import Link from 'next/link';
import { Button } from 'snapflow-ui-kit/client';
import { useTranslations } from 'next-intl';
import { LoginFormData, loginSchema } from '@/features/auth/login/model/schema';
import { useLoginMutation } from '@/features/auth/login/api/useLoginMutation';
import { zodResolver } from '@hookform/resolvers/zod';

export const LoginForm = () => {
  const t = useTranslations();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { email: '', password: '' },
  });

  const loginMutation = useLoginMutation();

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={s.form}>
        <div className={s.emailPasswordContainer}>
          <EmailInput />
          <PasswordInput />
        </div>
        <div className={s.forgotPassword}>
          <Link href="/password-recovery" className={s.forgotPasswordLink}>
            {t('Forms.forgotPassword')}
          </Link>
        </div>
        <div>
          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className={s.loginButton}
          >
            {t('Auth.signIn')}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
