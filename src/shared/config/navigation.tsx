import {
  BookMarkIcon,
  HomeIcon,
  MessageIcon,
  PersonIcon,
  PlusSquareIcon,
  SearchIcon,
  TrendingUpIcon,
} from 'snapflow-ui-kit/icons';
import { ReactNode } from 'react';

export type NavItem = {
  labelKey: string;
  href: string;
  icon: ReactNode;
};

export const navItems: NavItem[] = [
  { labelKey: 'feed', href: '/feed', icon: <HomeIcon /> },
  { labelKey: 'create', href: '/create', icon: <PlusSquareIcon /> },
  { labelKey: 'profile', href: '/profile', icon: <PersonIcon /> },
  { labelKey: 'messenger', href: '/messenger', icon: <MessageIcon /> },
  { labelKey: 'search', href: '/search', icon: <SearchIcon /> },
  { labelKey: 'statistics', href: '/statistics', icon: <TrendingUpIcon /> },
  { labelKey: 'favorites', href: '/favorites', icon: <BookMarkIcon /> },
];
