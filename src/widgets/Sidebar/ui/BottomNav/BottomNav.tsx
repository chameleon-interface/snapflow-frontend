'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getMobileNavItems, isNavItemLink } from '../../model';
import s from './BottomNav.module.css';

type Props = {
  profileId: string;
  onOpenCreatePostModal?: () => void;
  isCreatePostModalOpen?: boolean;
};

export const BottomNav = ({
  profileId,
  onOpenCreatePostModal,
  isCreatePostModalOpen = false,
}: Props) => {
  const pathname = usePathname();
  const t = useTranslations('Nav');
  const mobileNavItems = getMobileNavItems(profileId);

  return (
    <nav className={s.bottomNav} aria-label="Mobile navigation">
      <ul className={s.menu}>
        {mobileNavItems.map((item) => {
          const label = t(item.labelKey);

          if (isNavItemLink(item)) {
            const isActive =
              !isCreatePostModalOpen &&
              (pathname === item.href || pathname.startsWith(`${item.href}/`));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${s.link} ${isActive ? s.linkActive : ''}`}
                  aria-label={label}
                  title={label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={s.icon}>{item.icon}</span>
                </Link>
              </li>
            );
          }

          if (item.action === 'createPost') {
            return (
              <li key={item.labelKey}>
                <button
                  type="button"
                  className={`${s.link} ${s.button} ${isCreatePostModalOpen ? s.linkActive : ''}`}
                  onClick={onOpenCreatePostModal}
                  aria-label={label}
                  title={label}
                >
                  <span className={s.icon}>{item.icon}</span>
                </button>
              </li>
            );
          }

          return null;
        })}
      </ul>
    </nav>
  );
};
