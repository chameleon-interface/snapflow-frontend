'use client';

import { Button } from 'snapflow-ui-kit/client';
import { EmailInput, FormWrapper, PasswordInput } from '@/shared/ui';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import s from './SignInPage.module.css';
import { api } from '@/shared/api';
import { LoginFormData, loginSchema } from '@/features/auth/login/model/schema';
import { zodResolver } from '@hookform/resolvers/zod';

type SignInResponse = {
  accessToken: string;
};

export function SignInPage() {
  const t = useTranslations('Auth');
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signInMutation = useMutation<SignInResponse, unknown, LoginFormData>({
    mutationFn: async (data: LoginFormData) => {
      const response = await api.post<SignInResponse>('auth/login', data);

      return response.data;
    },

    onSuccess: (data) => {
      console.log('Успешный вход:', data);
      localStorage.setItem('accessToken', data.accessToken);
      router.push('/');
    },
  });

  const onSubmit = (data: LoginFormData) => {
    signInMutation.mutate(data);
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
              disabled={signInMutation.isPending}
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
