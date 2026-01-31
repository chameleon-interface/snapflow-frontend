'use client';

import Link from 'next/link';
import { Typography } from 'snapflow-ui-kit';
import { useTranslations } from 'next-intl';
import { navItems } from '@/shared/config/navigation';
import s from './NavMenu.module.css';

export const NavMenu = () => {
  const t = useTranslations('Nav');

  return (
    <nav>
      <ul className={s.menu}>
        {navItems.map(({ labelKey, href, icon }) => (
          <li key={href}>
            <Typography
              variant={'text-14-medium'}
              as={Link}
              href={href}
              icon={icon}
              className={s.link}
            >
              {t(labelKey)}
            </Typography>
          </li>
        ))}
      </ul>
    </nav>
  );
};
