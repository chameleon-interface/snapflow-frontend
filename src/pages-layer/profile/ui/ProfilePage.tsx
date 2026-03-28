import { getTranslations } from 'next-intl/server';
import { ProfileContent } from './ProfileContent';
import { getProfile } from '../api/profile.api';
import type { Profile } from '../types/types';

type Props = {
  id: string;
};

export async function ProfilePage({ id }: Props) {
  await getTranslations('Pages');

  const profile: Profile = await getProfile(id);

  return <ProfileContent profile={profile} />;
}
