'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'snapflow-ui-kit/client';
import { useTranslations } from 'next-intl';

import { LoginFormData, loginSchema } from '@/features/auth/login/model/schema';
import { FormWrapper, EmailInput, PasswordInput } from '@/shared/ui';
import s from './SignInPage.module.css';
import { useLoginMutation } from '@/pages-layer/sign-in/ui/useLoginMutation';

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
    </FormWrapper>
  );
}
