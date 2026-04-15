'use client';

import { usePublicProfileQuery } from '../../../api/usePublicProfileQuery';
import s from './ProfileContent.module.css';
import { ProfileHeader } from './ProfileHeader/ProfileHeader';
import { ProfilePosts } from './ProfilePosts/ProfilePosts';

type Props = {
  from?: string | null;
  id: string;
  postId?: string | null;
};

export function ProfileContent({ id, postId, from }: Props) {
  const { data: profile } = usePublicProfileQuery(id);

  if (!profile) {
    return null;
  }

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
