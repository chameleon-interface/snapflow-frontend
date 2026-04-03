'use client';

/**
 * Временный блок
 */
import { useMemo, useState } from 'react';
import { Button } from 'snapflow-ui-kit';
import { SocialListModal, type SocialListModalRow } from '@/shared/ui/modals';

type SocialPreview = null | 'likes' | 'social';

const MOCK_LIKES: SocialListModalRow[] = [
  { id: '1', username: 'anna_snap', isFollowing: true },
  { id: '2', username: 'max_photo', isFollowing: false },
  { id: '3', username: 'guest_view', isFollowing: false },
];

const MOCK_FOLLOWING: SocialListModalRow[] = [
  { id: 'a', username: 'following_one', isFollowing: true },
  { id: 'b', username: 'following_two', isFollowing: true },
  { id: 'c', username: 'following_three', isFollowing: true },
];

const MOCK_FOLLOWERS: SocialListModalRow[] = [
  {
    id: 'c',
    username: 'follower_removable',
    canRemoveFollower: true,
    isFollowing: false,
  },
  {
    id: 'd',
    username: 'follower_plain',
    isFollowing: true,
    canRemoveFollower: true,
  },
  {
    id: 'e',
    username: 'follower_three',
    canRemoveFollower: true,
    isFollowing: false,
  },
];

const DEMO_PROFILE_HANDLE = '@demo_user';

export function StatisticsModalsPreview() {
  const [socialPreview, setSocialPreview] = useState<SocialPreview>(null);
  const [profileTab, setProfileTab] = useState<'following' | 'followers'>(
    'following',
  );

  const socialConfig = useMemo(() => {
    switch (socialPreview) {
      case 'likes':
        return {
          title: '12 лайков',
          rows: MOCK_LIKES,
        };
      case 'social':
        return {
          title: profileTab === 'following' ? 'Подписки' : 'Подписчики',
          rows: profileTab === 'following' ? MOCK_FOLLOWING : MOCK_FOLLOWERS,
          profileTabs: {
            profileTitle: DEMO_PROFILE_HANDLE,
            followingLabel: 'Подписки',
            followersLabel: 'Подписчики',
            activeTab: profileTab,
            onChange: setProfileTab,
          },
        };
      default:
        return null;
    }
  }, [socialPreview, profileTab]);

  const openSocial = (initialTab: 'following' | 'followers') => {
    setProfileTab(initialTab);
    setSocialPreview('social');
  };

  return (
    <section
      aria-label="Временные кнопки модалок"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginTop: '24px',
        padding: '16px',
        border: '1px dashed color-mix(in srgb, currentColor 35%, transparent)',
        borderRadius: '8px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <Button
          type="button"
          variant="outlined"
          onClick={() => setSocialPreview('likes')}
        >
          Лайки
        </Button>
        <Button
          type="button"
          variant="outlined"
          onClick={() => openSocial('following')}
        >
          Подписки
        </Button>
        <Button
          type="button"
          variant="outlined"
          onClick={() => openSocial('followers')}
        >
          Подписчики
        </Button>
      </div>

      {socialConfig ? (
        <SocialListModal
          open={socialPreview !== null}
          onClose={() => setSocialPreview(null)}
          title={socialConfig.title}
          rows={socialConfig.rows}
          profileTabs={
            'profileTabs' in socialConfig ? socialConfig.profileTabs : undefined
          }
        />
      ) : null}
    </section>
  );
}
