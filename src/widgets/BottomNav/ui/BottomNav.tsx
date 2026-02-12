'use client';

import s from './BottomNav.module.css';
import {
  HomeIcon,
  MessageIcon,
  PersonIcon,
  PlusSquareIcon,
  SearchIcon,
} from 'snapflow-ui-kit/icons';
import { useRouter, usePathname } from 'next/navigation';

export const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <nav className={s.bottomNav}>
      <button
        className={pathname === '/' ? s.active : ''}
        onClick={() => handleClick('/')}
        type="button"
      >
        <HomeIcon />
      </button>

      <button
        className={pathname === '/' ? s.active : ''}
        onClick={() => handleClick('/')}
        type="button"
      >
        <PlusSquareIcon />
      </button>

      <button
        className={pathname === '/messenger' ? s.active : ''}
        onClick={() => handleClick('/messenger')}
        type="button"
      >
        <MessageIcon />
      </button>

      <button
        className={pathname === '/search' ? s.active : ''}
        onClick={() => handleClick('/search')}
        type="button"
      >
        <SearchIcon />
      </button>

      <button
        className={pathname === '/profile' ? s.active : ''}
        onClick={() => handleClick('/profile')}
        type="button"
      >
        <PersonIcon />
      </button>
    </nav>
  );
};
