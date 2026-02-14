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
  const t = useTranslations('Auth');
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: { email: '', password: '' },
  });

  const loginMutation = useLoginMutation(form.setError);

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={s.emailPasswordContainer}>
            <EmailInput />
            <PasswordInput />
          </div>
          <div className={s.forgotPassword}>
            <Link href="/password-recovery" className={s.forgotPasswordLink}>
              {t('forgotPassword')}
            </Link>
          </div>
          <div>
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className={s.loginButton}
            >
              {t('signIn')}
            </Button>
          </div>
        </form>
      </FormProvider>
      <div className={s.signupContainer}>
        <span className={s.doNotHaveAnAccount}>{t('doNotHaveAnAccount')}</span>
        <Link href="/sign-up" className={s.signupLink}>
          {t('signUp')}
        </Link>
      </div>
    </>
  );
};
