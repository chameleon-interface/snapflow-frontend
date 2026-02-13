'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { mobileNavItems } from '@/shared/config/navigation';
import s from './BottomNav.module.css';

export const BottomNav = () => {
  const pathname = usePathname();
  const t = useTranslations('Nav');

  return (
    <nav className={s.bottomNav} aria-label="Mobile navigation">
      <ul className={s.menu}>
        {mobileNavItems.map(({ labelKey, href, icon }) => {
          const isActive = pathname === href;
          const label = t(labelKey);

          return (
            <li key={href}>
              <Link
                href={href}
                className={`${s.link} ${isActive ? s.linkActive : ''}`}
                aria-label={label}
                title={label}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={s.icon}>{icon}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
