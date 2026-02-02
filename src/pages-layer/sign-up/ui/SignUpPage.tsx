import { getTranslations } from 'next-intl/server';
import { Card, Typography } from 'snapflow-ui-kit';
import s from './SignUpPage.module.css';
import Link from 'next/link';
import { RegistrationForm } from '@/features/auth/registration';

export async function SignUpPage() {
  const t = await getTranslations('Pages');

  return (
    <Card className={s.wrapper}>
      <Typography variant={'h1'} as={'h1'} className={s.title}>
        {t('signUpTitle')}
      </Typography>
      <RegistrationForm />
      <div className={s.footer}>
        <Typography variant={'text-16'} className={s.footerLabel}>
          Do you have an account?
        </Typography>
        <Typography
          variant={'h3'}
          as={Link}
          href={'/sign-in'}
          className={s.link}
        >
          Sign In
        </Typography>
      </div>
    </Card>
  );
}
