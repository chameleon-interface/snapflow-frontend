'use client';

import s from './Header.module.css';
import { Button, Typography } from 'snapflow-ui-kit';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/features/language-switcher';
import { MobileMenu } from './MobileMenu/MobileMenu';
import { useGetMyProfile, useMe } from '@/entities/user';
import { ROUTES } from '@/shared/config';
import { UserAvatar } from '@/shared/ui';

export const Header = () => {
  const t = useTranslations('Auth');
  const { data } = useMe();
  const profileQuery = useGetMyProfile({ enabled: Boolean(data) });

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
        {data && (
          <Link
            href={ROUTES.PROFILE(data.userId)}
            className={s.profileLink}
            aria-label={data.username}
          >
            <UserAvatar
              avatarUrl={profileQuery.data?.avatarUrl ?? null}
              username={profileQuery.data?.username ?? data.username}
              size={36}
            />
          </Link>
        )}
        <div className={s.mobileOnly}>
          <MobileMenu />
        </div>
        {!data && (
          <div className={s.desktopOnly}>
            <div className={s.buttonWrapper}>
              <Button variant={'text'} as={Link} href={ROUTES.SIGN_IN}>
                {t('signIn')}
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
