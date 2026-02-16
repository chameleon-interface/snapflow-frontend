import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  SettingsIcon,
  TrendingUpIcon,
  BookMarkIcon,
  LogOutIcon,
} from 'snapflow-ui-kit/icons';
import { ROUTES } from '@/shared/config/routes';

/**
 * Hook for creating menu items for mobile menu.
 * Returns auth menu items for unauthorized users and user menu items for authorized users.
 */
export const useMenuItems = () => {
  const t = useTranslations('Auth');
  const tNav = useTranslations('Nav');
  const router = useRouter();

  const handleLogout = useCallback(() => {
    // TODO: implement logout logic
  }, []);

  const authMenuItems = useMemo(
    () => [
      {
        label: t('signIn'),
        onSelect: () => router.push(ROUTES.SIGN_IN),
      },
      {
        label: t('signUp'),
        onSelect: () => router.push(ROUTES.SIGN_UP),
      },
    ],
    [t, router],
  );

  const userMenuItems = useMemo(
    () => [
      {
        label: tNav('profileSettings'),
        icon: <SettingsIcon />,
        onSelect: () => router.push(ROUTES.SETTINGS),
      },
      {
        label: tNav('statistics'),
        icon: <TrendingUpIcon />,
        onSelect: () => router.push(ROUTES.STATISTICS),
      },
      {
        label: tNav('favorites'),
        icon: <BookMarkIcon />,
        onSelect: () => router.push(ROUTES.FAVORITES),
      },
      {
        label: t('logOut'),
        icon: <LogOutIcon />,
        onSelect: handleLogout,
      },
    ],
    [tNav, t, router, handleLogout],
  );

  return { authMenuItems, userMenuItems };
};
