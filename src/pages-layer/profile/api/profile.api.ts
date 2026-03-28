import type { ApiProfile, Profile } from '../types/types';
import { mapProfile } from '@/pages-layer/profile/api/profile.mapper';

export const getProfile = async (id: string): Promise<Profile> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}users/profile/${id}`,
    {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!res.ok) {
    const error = await res.text();
    console.error('Profile error:', error);
    throw new Error('Failed to load profile');
  }

  const data: ApiProfile = await res.json();

  return mapProfile(data);
};
