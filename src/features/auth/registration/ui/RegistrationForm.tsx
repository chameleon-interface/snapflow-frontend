'use client';

import { Button, Checkbox, Typography } from 'snapflow-ui-kit';
import { Input } from 'snapflow-ui-kit/client';
import Link from 'next/link';
import s from './RegistrationForm.module.css';

export const RegistrationForm = () => {
  return (
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
          <Typography as={Link} href={'/privacy-policy'} variant={'small-link'}>
            {' '}
            Privacy Policy
          </Typography>
        </Typography>
      </Checkbox>
      <Button type={'submit'} className={s.button}>
        Sign up
      </Button>
    </form>
  );
};
