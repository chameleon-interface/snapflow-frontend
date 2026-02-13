'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'snapflow-ui-kit/client';
import { useTranslations } from 'next-intl';

import { LoginFormData, loginSchema } from '@/features/auth/login/model/schema';
import { FormWrapper, EmailInput, PasswordInput } from '@/shared/ui';
import s from './SignInPage.module.css';
import { useLoginMutation } from '@/pages-layer/sign-in/ui/useLoginMutation';
import Link from 'next/link';

export function SignInPage() {
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
    <FormWrapper title={t('logIn')}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={s.emailPasswordContainer}>
            <EmailInput />
            <PasswordInput />
          </div>
          <div className={s.forgotPassword}>
            <Link
              href="/password-recovery/request-reset"
              className={s.forgotPasswordLink}
            >
              {t('forgotPassword')}
            </Link>
          </div>
          <div>
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className={s.loginButton}
            >
              {t('logIn')}
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
    </FormWrapper>
  );
}
