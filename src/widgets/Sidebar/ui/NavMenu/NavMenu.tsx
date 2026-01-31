'use client';

import Link from 'next/link';
import { Typography } from 'snapflow-ui-kit';
import { navItems } from '@/shared/config/navigation';
import s from './NavMenu.module.css';

export const NavMenu = () => {
  return (
    <nav>
      <ul className={s.menu}>
        {navItems.map(({ label, href, icon }) => (
          <li key={href}>
            <Typography
              variant={'text-14-medium'}
              as={Link}
              href={href}
              icon={icon}
              className={s.link}
            >
              {label}
            </Typography>
          </li>
        ))}
      </ul>
    </nav>
  );
};
