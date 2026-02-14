import s from './Header.module.css';
import { Button, Typography } from 'snapflow-ui-kit';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/features/language-switcher';

export const Header = () => {
  const t = useTranslations('Auth');

  return (
    <header className={s.header}>
      <Typography variant={'large'} className={s.logo} as={Link} href={'/'}>
        Snapflow
      </Typography>
      <div className={s.actions}>
        <LanguageSwitcher />

        <div className={s.buttonWrapper}>
          <Button variant={'text'} as={Link} href={'/sign-in'}>
            {t('signIn')}
          </Button>
          <Button as={Link} href={'/sign-up'}>
            {t('signUp')}
          </Button>
        </div>
      </div>
    </header>
  );
};
