'use client';

import { useTranslations } from 'next-intl';
import { ProfileContent } from './ProfileContent';
import { usePublicProfileQuery } from '../api/usePublicProfileQuery';

type Props = {
  id: string;
};

export function ProfilePage({ id }: Props) {
  const tCommon = useTranslations('Common');
  const { data: profile, isPending } = usePublicProfileQuery(id);

  if (isPending) {
    return null;
  }

  if (!profile) {
    return <p>{tCommon('somethingWentWrong')}</p>;
  }

  return <ProfileContent profile={profile} />;
}
