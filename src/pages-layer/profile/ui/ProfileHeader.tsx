'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from 'snapflow-ui-kit/client';
import { PaidIcon } from 'snapflow-ui-kit/icons';
import { useMe } from '@/entities/user';
import type { PublicProfileViewDto } from '@/shared/api/generated/model';
import { ROUTES } from '@/shared/config';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';
import { UserListsModal } from '@/shared/ui/modals';
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

  const [socialOpen, setSocialOpen] = useState(false);
  const [socialTab, setSocialTab] = useState<'following' | 'followers'>(
    'following',
  );

  const openSocial = (tab: 'following' | 'followers') => {
    setSocialTab(tab);
    setSocialOpen(true);
  };

  const handleSocialClose = () => setSocialOpen(false);

  const profileHandle = profile.username.startsWith('@')
    ? profile.username
    : `@${profile.username}`;

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
                <PaidIcon />
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
            <button
              type="button"
              className={s.statButton}
              onClick={() => openSocial('following')}
            >
              <strong>{profile.userMetadata.followingCount}</strong>
              <span>{t('profileFollowing')}</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={s.statButton}
              onClick={() => openSocial('followers')}
            >
              <strong>{profile.userMetadata.followersCount}</strong>
              <span>{t('profileFollowers')}</span>
            </button>
          </li>
          <li>
            <strong>{profile.userMetadata.publicationsCount}</strong>
            <span>{t('profilePublications')}</span>
          </li>
        </ul>

        <p className={s.bio}>{profile.aboutMe ?? ''}</p>
      </div>

      <UserListsModal
        open={socialOpen}
        onClose={handleSocialClose}
        title={
          socialTab === 'following'
            ? t('profileFollowing')
            : t('profileFollowers')
        }
        rows={[]}
        profileTabs={{
          profileTitle: profileHandle,
          followingLabel: t('profileFollowing'),
          followersLabel: t('profileFollowers'),
          activeTab: socialTab,
          onChange: setSocialTab,
        }}
        followersList={socialTab === 'followers'}
      />
    </header>
  );
}
