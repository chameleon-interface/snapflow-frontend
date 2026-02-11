import Link from 'next/link';
import { Button } from 'snapflow-ui-kit';
import { navItems } from '@/shared/config/navigation';
import s from './NavMenu.module.css';
import { useTranslations } from 'next-intl';

export const NavMenu = () => {
  const t = useTranslations('Nav');

  return (
    <nav>
      <ul className={s.menu}>
        {navItems.map(({ labelKey, href, icon }) => (
          <li key={href}>
            <Button
              variant={'text'}
              as={Link}
              href={href}
              icon={icon}
              className={s.link}
            >
              {t(labelKey)}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
