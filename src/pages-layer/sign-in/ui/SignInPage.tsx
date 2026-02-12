'use client';

import { authApi } from '@/features/auth/api/authApi';
import { Button } from 'snapflow-ui-kit/client';
import { EmailInput, FormWrapper, PasswordInput } from '@/shared/ui';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import s from './SignInPage.module.css';
import { LoginFormData, loginSchema } from '@/features/auth/login/model/schema';
import { zodResolver } from '@hookform/resolvers/zod';

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

  // ===============================
  // 🔹 Mutation через authApi
  // ===============================
  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFormData) =>
      authApi.login(data.email, data.password),
    onSuccess: () => {
      router.push('/');
    },
  }); //вынести в апи

  // ===============================
  // 🔹 onSubmit для формы
  // ===============================
  const onSubmit = (data: LoginFormData) => {
    mutate(data);
    //onSonSuccess:
    //onError:
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
              disabled={isPending}
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
