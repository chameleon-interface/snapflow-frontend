import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from 'snapflow-ui-kit';
import { getNavItems, isNavItemLink } from '../../model';
import s from './NavMenu.module.css';
import { useTranslations } from 'next-intl';

type Props = {
  profileId: string;
  onOpenCreatePostModal?: () => void;
  isCreatePostModalOpen?: boolean;
};

export const NavMenu = ({
  profileId,
  onOpenCreatePostModal,
  isCreatePostModalOpen = false,
}: Props) => {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const navItems = getNavItems(profileId);

  return (
    <nav>
      <ul className={s.menu}>
        {navItems.map((item) => {
          const label = t(item.labelKey);

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
                  {label}
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
                  aria-label={label}
                >
                  {label}
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
