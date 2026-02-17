'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FormWrapper } from '@/shared/ui';
import { LoginForm } from '@/features/auth/login/ui/LoginForm';
import s from './SignInPage.module.css';
import { Button, Typography } from 'snapflow-ui-kit';
import { ROUTES } from '@/shared/config/routes';

export function SignInPage() {
  const t = useTranslations();

  return (
    <FormWrapper title={t('Auth.signIn')}>
      <LoginForm />
      <div className={s.signupContainer}>
        <Typography variant="text-16">
          {t('Forms.doNotHaveAnAccount')}
        </Typography>

        <Button variant={'text'} as={Link} href={ROUTES.SIGN_UP}>
          {t('Auth.signUp')}
        </Button>
      </div>
    </FormWrapper>
  );
}
