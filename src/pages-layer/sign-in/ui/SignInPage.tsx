'use client';

import { useTranslations } from 'next-intl';
import { FormWrapper } from '@/shared/ui';
import { LoginForm } from '@/features/auth/login/ui/LoginForm';

export function SignInPage() {
  const t = useTranslations('Auth');

  return (
    <FormWrapper title={t('signIn')}>
      <LoginForm />
    </FormWrapper>
  );
}
