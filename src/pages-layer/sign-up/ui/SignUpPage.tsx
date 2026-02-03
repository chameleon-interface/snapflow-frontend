import { getTranslations } from 'next-intl/server';
import { Button, Typography } from 'snapflow-ui-kit';
import s from './SignUpPage.module.css';
import Link from 'next/link';
import { RegistrationForm } from '@/features/auth/registration';
import { FormWrapper } from '@/shared/ui';

export async function SignUpPage() {
  const tPages = await getTranslations('Pages');
  const tForms = await getTranslations('Forms');

  return (
    <FormWrapper title={tPages('signUpTitle')}>
      <RegistrationForm />
      <div className={s.footer}>
        <Typography variant={'text-16'}>{tForms('haveAccount')}</Typography>
        <Button variant={'text'} as={Link} href={'/sign-in'} className={s.link}>
          {tPages('signInTitle')}
        </Button>
      </div>
    </FormWrapper>
  );
}
