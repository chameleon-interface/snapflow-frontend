'use client';

import s from './ProfilePage.module.css';
import type { PublicProfileViewDto } from '@/shared/api/generated/model';
import { ProfileHeader } from './ProfileHeader';
import { ProfilePosts } from './ProfilePosts';

type Props = {
  profile: PublicProfileViewDto;
};

export function ProfileContent({ profile }: Props) {
  return (
    <section className={s.page}>
      <ProfileHeader profile={profile} />
      <ProfilePosts
        profileId={profile.id}
        postsCount={profile.userMetadata.publicationsCount ?? 0}
      />
    </section>
  );
}
