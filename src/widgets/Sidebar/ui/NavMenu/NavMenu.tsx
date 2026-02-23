import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from 'snapflow-ui-kit';
import { getNavItems, isNavItemLink } from '../../model';
import s from './NavMenu.module.css';
import { useTranslations } from 'next-intl';

type Props = {
  userId: string;
  onOpenCreatePostModal?: () => void;
  isCreatePostModalOpen?: boolean;
};

export const NavMenu = ({
  userId,
  onOpenCreatePostModal,
  isCreatePostModalOpen = false,
}: Props) => {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const navItems = getNavItems(userId);

  return (
    <nav>
      <ul className={s.menu}>
        {navItems.map((item) => {
          if (isNavItemLink(item)) {
            const isActive =
              !isCreatePostModalOpen &&
              (pathname === item.href || pathname.startsWith(`${item.href}/`));

            return (
              <li key={item.href}>
                <Button
                  variant={'text'}
                  as={Link}
                  href={item.href}
                  icon={item.icon}
                  className={`${s.link} ${isActive ? s.linkActive : ''}`}
                >
                  {t(item.labelKey)}
                </Button>
              </li>
            );
          }

          if (item.action === 'createPost') {
            return (
              <li key={item.labelKey}>
                <Button
                  variant={'text'}
                  icon={item.icon}
                  className={`${s.link} ${isCreatePostModalOpen ? s.linkActive : ''}`}
                  onClick={onOpenCreatePostModal}
                  aria-label={t(item.labelKey)}
                >
                  {t(item.labelKey)}
                </Button>
              </li>
            );
          }

          return null;
        })}
      </ul>
    </nav>
  );
};
