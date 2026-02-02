import { getTranslations } from 'next-intl/server';
import { Button, Card, Checkbox, Typography } from 'snapflow-ui-kit';
import s from './SignUpPage.module.css';
import { Input } from 'snapflow-ui-kit/client';
import Link from 'next/link';

export async function SignUpPage() {
  const t = await getTranslations('Pages');

  return (
    <Card className={s.wrapper}>
      <Typography variant={'h1'} as={'h1'} className={s.title}>
        {t('signUpTitle')}
      </Typography>
      <form className={s.form}>
        <Input label={'Username'} />
        <Input label={'Email'} />
        <Input label={'Password'} type={'password'} allowPasswordToggle />
        <Input
          label={'Password confirmation'}
          type={'password'}
          allowPasswordToggle
        />
        <Checkbox>
          <Typography variant={'small'} className={s.label}>
            I agree to the
            <Typography
              as={Link}
              href={'/terms-of-service'}
              variant={'small-link'}
            >
              Terms of Service
            </Typography>
            and
            <Typography
              as={Link}
              href={'/privacy-policy'}
              variant={'small-link'}
            >
              {' '}
              Privacy Policy
            </Typography>
          </Typography>
        </Checkbox>
        <Button type={'submit'} className={s.button}>
          Sign up
        </Button>
      </form>
      <div className={s.footer}>
        <Typography variant={'text-16'} className={s.label}>
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
