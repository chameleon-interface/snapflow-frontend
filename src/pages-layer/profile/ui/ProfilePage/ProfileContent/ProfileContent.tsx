'use client';

import { usePublicProfileQuery } from '../../../api/usePublicProfileQuery';
import s from './ProfileContent.module.css';
import { ProfileHeader } from './ProfileHeader/ProfileHeader';
import { ProfilePosts } from './ProfilePosts/ProfilePosts';

type Props = {
  id: string;
};

export function ProfileContent({ id }: Props) {
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
