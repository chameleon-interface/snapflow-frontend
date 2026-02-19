'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getMobileNavItems } from '../../model';
import s from './BottomNav.module.css';

type Props = {
  userId: string;
};

export const BottomNav = ({ userId }: Props) => {
  const pathname = usePathname();
  const t = useTranslations('Nav');
  const mobileNavItems = getMobileNavItems(userId);

  return (
    <nav className={s.bottomNav} aria-label="Mobile navigation">
      <ul className={s.menu}>
        {mobileNavItems.map(({ labelKey, href, icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
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
