'use client';

import { Input, Button } from 'snapflow-ui-kit/client';
import { FormWrapper } from '@/shared/ui';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function SignInPage() {
  const [password, setPassword] = useState('');

  const t = useTranslations('Auth');

  // return (
  //   <main>
  //     <h1>{t('signInTitle')}</h1>
  //     <p>{t('placeholder')}</p>
  //   </main>
  // );

  return (
    <FormWrapper title={t('logIn')}>
      {/*<div>place for login with servers google/github</div>*/}
      <form action="">
        <Input label="Email" type="email" />
        <Input
          label="Passwors"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          allowPasswordToggle
        />
      </form>
      <Link href={'/password-recovery/request-reset'}>
        {t('forgotPassword')}
      </Link>
      <Button as={Link} href={'/'}>
        {t('logIn')}
      </Button>
    </FormWrapper>
  );
}
