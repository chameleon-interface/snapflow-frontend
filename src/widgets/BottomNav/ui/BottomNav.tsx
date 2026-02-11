'use client';

import { useState } from 'react';
import s from './BottomNav.module.css';
import {
  HomeIcon,
  MessageIcon,
  PersonIcon,
  PlusSquareIcon,
  SearchIcon,
} from 'snapflow-ui-kit/icons';
import { useRouter } from 'next/navigation';

export const BottomNav = () => {
  const [active, setActive] = useState('home');
  const router = useRouter();

  const handleClick = (page: string, path: string) => {
    setActive(page);
    router.push(path); // переход по странице
  };

  return (
    <nav className={s.bottomNav}>
      <button
        className={active === 'menu' ? s.active : ''}
        onClick={() => handleClick('menu', '/')}
      >
        <HomeIcon />
      </button>

      <button
        className={active === 'home' ? s.active : ''}
        onClick={() => handleClick('home', '/')}
      >
        <PlusSquareIcon />
      </button>

      <button
        className={active === 'messenger' ? s.active : ''}
        onClick={() => handleClick('messenger', '/messenger')}
      >
        <MessageIcon />
      </button>

      <button
        className={active === 'search' ? s.active : ''}
        onClick={() => handleClick('search', '/search')}
      >
        <SearchIcon />
      </button>

      <button
        className={active === 'profile' ? s.active : ''}
        onClick={() => handleClick('profile', '/profile')}
      >
        <PersonIcon />
      </button>
    </nav>
  );
};
