'use client';

import s from './Header.module.css';
import { Button, Typography } from 'snapflow-ui-kit';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/features/language-switcher/ui/LanguageSwitcher';
import { useState, useRef, useEffect } from 'react';
import {
  BookMarkIcon,
  MoreHozitontalIcon,
  SettingsIcon,
  TrendingUpIcon,
} from 'snapflow-ui-kit/icons';
import { useMe } from '@/features/auth/me';
import { LogoutButton } from '@/features/auth/logout';

export const Header = () => {
  const t = useTranslations('Auth');
  const tNav = useTranslations('Nav');
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isAuth, loading } = useMe();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  if (loading) return null;
  return (
    <header className={s.header}>
      <Typography variant={'large'} className={s.logo} as={Link} href={'/'}>
        Snapflow
      </Typography>
      <div className={s.actions}>
        <LanguageSwitcher />
        {!isAuth && (
          <div className={s.buttonWrapper}>
            <Button variant={'text'} as={Link} href={'/sign-in'}>
              {t('logIn')}
            </Button>
            <Button as={Link} href={'/sign-up'}>
              {t('signUp')}
            </Button>
          </div>
        )}
      </div>

      <div className={s.mobileMenu}>
        {isAuth ? (
          <>
            <button
              className={`${s.dots} ${open ? s.open : ''}`}
              onClick={() => setOpen(!open)}
            >
              <MoreHozitontalIcon />
            </button>

            {open && (
              <div ref={dropdownRef} className={s.dropdown}>
                <Button
                  as={Link}
                  href="/settings"
                  variant="text"
                  className={s.menuItem}
                >
                  <SettingsIcon />
                  <Typography variant="text-14">
                    {tNav('profileSettings')}
                  </Typography>
                </Button>

                <Button
                  as={Link}
                  href="/statistics"
                  variant="text"
                  className={s.menuItem}
                >
                  <TrendingUpIcon />
                  <Typography variant="text-14">
                    {tNav('statistics')}
                  </Typography>
                </Button>

                <Button
                  as={Link}
                  href="/favorites"
                  variant="text"
                  className={s.menuItem}
                >
                  <BookMarkIcon />
                  <Typography variant="text-14">{tNav('favorites')}</Typography>
                </Button>
                <div className={s.menuItem}>
                  <LogoutButton />
                </div>
              </div>
            )}
          </>
        ) : (
          <Button
            className={s.menuItem}
            as={Link}
            variant="text"
            href="/sign-in"
          >
            <Typography variant="text-14">{t('logIn')}</Typography>
          </Button>
        )}
      </div>
    </header>
  );
};
