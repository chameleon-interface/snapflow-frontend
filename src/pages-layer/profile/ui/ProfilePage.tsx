'use client';

import { ProfileContent } from './ProfileContent';
import { usePublicProfileQuery } from '../api/usePublicProfileQuery';

type Props = {
  id: string;
};

export function ProfilePage({ id }: Props) {
  const { data: profile, isPending } = usePublicProfileQuery(id);

  if (isPending || !profile) {
    return null;
  }

  return <ProfileContent profile={profile} />;
}
