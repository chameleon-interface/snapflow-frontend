'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from 'snapflow-ui-kit/client';
import { CheckmarkIcon } from 'snapflow-ui-kit/icons';
import { useMe } from '@/entities/user';
import type { PublicProfileViewDto } from '@/shared/api/generated/model';
import { ROUTES } from '@/shared/config';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';
import { UserAvatar } from '@/shared/ui';
import s from './ProfilePage.module.css';

type Props = {
  profile: PublicProfileViewDto;
};

export function ProfileHeader({ profile }: Props) {
  const t = useTranslations('Pages');
  const { data: me } = useMe();
  const isCompact = useMediaQuery(1024);
  const isOwner = me?.userId === profile.id;
  const isVerified = true;

  return (
    <header className={s.header}>
      <div className={s.avatar}>
        <UserAvatar
          avatarUrl={profile.avatarUrl}
          username={profile.username}
          size={isCompact ? 160 : 204}
        />
      </div>

      <div className={s.info}>
        <div className={s.userNameAndSettingsButton}>
          <div className={s.userName}>
            <h1>{profile.username}</h1>
            {isVerified && (
              <span className={s.verifiedBadge} aria-hidden>
                <CheckmarkIcon />
              </span>
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
            <strong>{profile.userMetadata.followingCount ?? 0}</strong>
            <span>{t('profileFollowing')}</span>
          </li>
          <li>
            <strong>{profile.userMetadata.followersCount ?? 0}</strong>
            <span>{t('profileFollowers')}</span>
          </li>
          <li>
            <strong>{profile.userMetadata.publicationsCount ?? 0}</strong>
            <span>{t('profilePublications')}</span>
          </li>
        </ul>

        <p className={s.bio}>{profile.aboutMe ?? ''}</p>
      </div>
    </header>
  );
}
