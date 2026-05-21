import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  BookMarkIcon,
  LogOutIcon,
  SettingsIcon,
  TrendingUpIcon,
} from 'snapflow-ui-kit/icons';
import { ROUTES } from '@/shared/config';

/**
 * Хук для формирования пунктов меню для мобильного меню.
 * Возвращает пункты для гостя (auth) и пункты для авторизованного пользователя.
 */
export const useMenuItems = (onLogoutClick?: () => void) => {
  const t = useTranslations('Auth');
  const tNav = useTranslations('Nav');
  const router = useRouter();

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
        onSelect: onLogoutClick,
      },
    ],
    [tNav, t, router, onLogoutClick],
  );

  return { authMenuItems, userMenuItems };
};
