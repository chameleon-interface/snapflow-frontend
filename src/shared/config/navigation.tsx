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
  label: string;
  href: string;
  icon: ReactNode;
};

export const navItems: NavItem[] = [
  { label: 'Feed', href: '/feed', icon: <HomeIcon /> },
  { label: 'Create', href: '/create', icon: <PlusSquareIcon /> },
  { label: 'My profile', href: '/profile', icon: <PersonIcon /> },
  { label: 'Messenger', href: '/messenger', icon: <MessageIcon /> },
  { label: 'Search', href: '/search', icon: <SearchIcon /> },
  { label: 'Statistics', href: '/statistics', icon: <TrendingUpIcon /> },
  { label: 'Favorites', href: '/favorites', icon: <BookMarkIcon /> },
];
