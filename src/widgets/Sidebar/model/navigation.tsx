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
import { ROUTES } from '@/shared/config';

export type NavItem = {
  labelKey: string;
  href: string;
  icon: ReactNode;
};

export const navItems: NavItem[] = [
  { labelKey: 'feed', href: ROUTES.FEED, icon: <HomeIcon /> },
  { labelKey: 'create', href: ROUTES.CREATE, icon: <PlusSquareIcon /> },
  { labelKey: 'profile', href: ROUTES.PROFILE, icon: <PersonIcon /> },
  { labelKey: 'messenger', href: ROUTES.MESSENGER, icon: <MessageIcon /> },
  { labelKey: 'search', href: ROUTES.SEARCH, icon: <SearchIcon /> },
  { labelKey: 'statistics', href: ROUTES.STATISTICS, icon: <TrendingUpIcon /> },
  { labelKey: 'favorites', href: ROUTES.FAVORITES, icon: <BookMarkIcon /> },
];

export const mobileNavItems: NavItem[] = [
  { labelKey: 'feed', href: ROUTES.FEED, icon: <HomeIcon /> },
  { labelKey: 'create', href: ROUTES.CREATE, icon: <PlusSquareIcon /> },
  { labelKey: 'messenger', href: ROUTES.MESSENGER, icon: <MessageIcon /> },
  { labelKey: 'search', href: ROUTES.SEARCH, icon: <SearchIcon /> },
  { labelKey: 'profile', href: ROUTES.PROFILE, icon: <PersonIcon /> },
];
