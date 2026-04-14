'use client';

import s from './ProfilePage.module.css';
import type { PublicProfileViewDto } from '@/shared/api/generated/model';
import { ProfileHeader } from './ProfileHeader';
import { ProfilePosts } from './ProfilePosts';

type Props = {
  from?: string | null;
  profile: PublicProfileViewDto;
  postId?: string | null;
};

export function ProfileContent({ profile, postId, from }: Props) {
  return (
    <section className={s.page}>
      <ProfileHeader profile={profile} />
      <ProfilePosts
        from={from}
        profileId={profile.id}
        postsCount={profile.userMetadata.publicationsCount ?? 0}
        postId={postId}
      />
    </section>
  );
}
