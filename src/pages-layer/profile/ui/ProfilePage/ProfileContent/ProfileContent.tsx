'use client';

import { useParams } from 'next/navigation';
import { usePublicProfileQuery } from '../../../api/usePublicProfileQuery';
import s from './ProfileContent.module.css';
import { ProfileHeader } from './ProfileHeader/ProfileHeader';
import { ProfilePosts } from './ProfilePosts/ProfilePosts';

export function ProfileContent() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { data: profile } = usePublicProfileQuery(id);

  if (!profile) {
    return null;
  }

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
