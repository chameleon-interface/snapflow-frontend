import { getTranslations } from 'next-intl/server';
import { ProfileContent } from './ProfileContent';
import { Profile } from './types';

export async function ProfilePage() {
  await getTranslations('Pages');

  const profileId = 45;

  const res = await fetch(`http://localhost:3001/profiles/${profileId}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to load profile');

  const profile: Profile = await res.json();

  return <ProfileContent profile={profile} />;
}
