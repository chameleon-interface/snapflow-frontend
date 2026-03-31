'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from 'snapflow-ui-kit/client';
import s from './ProfilePage.module.css';
import { ProfilePosts } from './ProfilePosts';
import { useMe } from '@/entities/user';
import { ROUTES } from '@/shared/config';
import type { Profile } from '../model/types';

type Props = {
  profile: Profile;
};

export function ProfileContent({ profile }: Props) {
  const t = useTranslations('Pages');
  const { data: me } = useMe();
  const isOwner = me?.userId === String(profile.id);
  const isVerified = true;

  return (
    <section className={s.page}>
      <header className={s.header}>
        <div className={s.avatar}>
          <Image
            src={profile.avatar}
            alt={`${profile.username} avatar`}
            width={204}
            height={204}
            className={s.avatarImage}
            priority
          />
        </div>

        <div className={s.info}>
          <div className={s.userNameAndSettingsButton}>
            <div className={s.userName}>
              <h1>{profile.username}</h1>
              {isVerified && (
                <Image
                  src="/images/paid.svg"
                  alt="Verified profile"
                  width={22}
                  height={22}
                  className={s.verifiedBadge}
                />
              )}
            </div>

            {isOwner && (
              <Button
                className={s.profileButton}
                as={Link}
                href={ROUTES.SETTINGS}
              >
                {t('profileSettings')}
              </Button>
            )}
          </div>

          <ul className={s.userData}>
            <li>
              <strong>{profile.followingCount}</strong>
              <span>{t('profileFollowing')}</span>
            </li>
            <li>
              <strong>{profile.followersCount}</strong>
              <span>{t('profileFollowers')}</span>
            </li>
            <li>
              <strong>{profile.postsCount}</strong>
              <span>{t('profilePublications')}</span>
            </li>
          </ul>

          <p className={s.bio}>{profile.about}</p>
        </div>
      </header>

      <ProfilePosts profileId={profile.id} />
    </section>
  );
}
