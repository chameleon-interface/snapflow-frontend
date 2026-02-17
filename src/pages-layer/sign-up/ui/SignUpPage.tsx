import { getTranslations } from 'next-intl/server';
import { Button, Typography } from 'snapflow-ui-kit';
import s from './SignUpPage.module.css';
import Link from 'next/link';
import { RegistrationForm } from '@/features/auth/registration';
import { FormWrapper } from '@/shared/ui';
import { ROUTES } from '@/shared/config';

export async function SignUpPage() {
  const t = await getTranslations();

  return (
    <FormWrapper title={t('Pages.signUpTitle')}>
      <RegistrationForm />
      <div className={s.footer}>
        <Typography variant={'text-16'}>{t('Forms.haveAccount')}</Typography>
        <Button
          variant={'text'}
          as={Link}
          href={ROUTES.SIGN_IN}
          className={s.link}
        >
          {t('Pages.signInTitle')}
        </Button>
      </div>
    </FormWrapper>
  );
}
