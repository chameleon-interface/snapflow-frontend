'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FormWrapper } from '@/shared/ui';
import { LoginForm } from '@/features/auth/login/ui/LoginForm';
import s from './SignInPage.module.css';

export function SignInPage() {
  const t = useTranslations();

  return (
    <FormWrapper title={t('Auth.signIn')}>
      <LoginForm />
      <div className={s.signupContainer}>
        <span className={s.doNotHaveAnAccount}>
          {t('Forms.doNotHaveAnAccount')}
        </span>
        <Link href="/sign-up" className={s.signupLink}>
          {t('Auth.signUp')}
        </Link>
      </div>
    </FormWrapper>
  );
}
