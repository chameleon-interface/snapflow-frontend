import { getTranslations } from 'next-intl/server';
import { PaidIcon } from 'snapflow-ui-kit/icons';
import type { PublicProfileViewDto } from '@/shared/api/generated/model';
import s from './ProfilePage.module.css';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileSettingsButton } from './ProfileSettingsButton';

type Props = {
  profile: PublicProfileViewDto;
};

export async function ProfileHeader({ profile }: Props) {
  const t = await getTranslations('Pages');
  const isVerified = true;

  return (
    <header className={s.header}>
      <div className={s.avatar}>
        <ProfileAvatar
          avatarUrl={profile.avatarUrl}
          username={profile.username}
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

          <ProfileSettingsButton profileId={profile.id} />
        </div>

        <ul className={s.userData}>
          <li>
            <strong>{profile.userMetadata.followingCount}</strong>
            <span>{t('profileFollowing')}</span>
          </li>
          <li>
            <strong>{profile.userMetadata.followersCount}</strong>
            <span>{t('profileFollowers')}</span>
          </li>
          <li>
            <strong>{profile.userMetadata.publicationsCount}</strong>
            <span>{t('profilePublications')}</span>
          </li>
        </ul>

        <p className={s.bio}>{profile.aboutMe ?? ''}</p>
      </div>
    </header>
  );
}
