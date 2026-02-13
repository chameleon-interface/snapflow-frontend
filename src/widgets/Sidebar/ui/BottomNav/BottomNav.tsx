'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mobileNavItems } from '@/shared/config/navigation';
import s from './BottomNav.module.css';

export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className={s.bottomNav} aria-label="Mobile navigation">
      <ul className={s.menu}>
        {mobileNavItems.map(({ href, icon }) => {
          const isActive = pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                className={`${s.link} ${isActive ? s.linkActive : ''}`}
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
