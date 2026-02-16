'use client';

import s from './Header.module.css';
import { Button, Typography } from 'snapflow-ui-kit';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/features/language-switcher';
import { MobileMenu } from './MobileMenu/MobileMenu';
import { useMe } from '@/entities/user';
import { ROUTES } from '@/shared/config/routes';

export const Header = () => {
  const t = useTranslations('Auth');
  const { data } = useMe();

  return (
    <header className={s.header}>
      <Typography
        variant={'large'}
        className={s.logo}
        as={Link}
        href={ROUTES.HOME}
      >
        Snapflow
      </Typography>
      <div className={s.actions}>
        <LanguageSwitcher />
        <div className={s.mobileOnly}>
          <MobileMenu />
        </div>
        {!data && (
          <div className={s.desktopOnly}>
            <div className={s.buttonWrapper}>
              <Button variant={'text'} as={Link} href={ROUTES.SIGN_IN}>
                {t('logIn')}
              </Button>
              <Button as={Link} href={ROUTES.SIGN_UP}>
                {t('signUp')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
