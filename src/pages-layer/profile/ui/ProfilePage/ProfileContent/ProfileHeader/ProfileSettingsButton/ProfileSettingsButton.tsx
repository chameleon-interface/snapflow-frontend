'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from 'snapflow-ui-kit/client';
import { useMe } from '@/entities/user';
import { ROUTES } from '@/shared/config';
import s from './ProfileSettingsButton.module.css';

type Props = {
  profileId: string;
};

export function ProfileSettingsButton({ profileId }: Props) {
  const t = useTranslations('Pages');
  const { data: me } = useMe();

  if (me?.userId !== profileId) {
    return null;
  }

  return (
    <Button className={s.profileButton} as={Link} href={ROUTES.SETTINGS}>
      {t('profileSettings')}
    </Button>
  );
}
