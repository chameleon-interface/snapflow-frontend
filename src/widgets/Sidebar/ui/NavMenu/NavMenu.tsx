import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from 'snapflow-ui-kit';
import { navItems } from '@/shared/config/navigation';
import s from './NavMenu.module.css';
import { useTranslations } from 'next-intl';

export const NavMenu = () => {
  const t = useTranslations('Nav');
  const pathname = usePathname();

  return (
    <nav>
      <ul className={s.menu}>
        {navItems.map(({ labelKey, href, icon }) => {
          const isActive = pathname === href;

          return (
            <li key={href}>
              <Button
                variant={'text'}
                as={Link}
                href={href}
                icon={icon}
                className={`${s.link} ${isActive ? s.linkActive : ''}`}
              >
                {t(labelKey)}
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
