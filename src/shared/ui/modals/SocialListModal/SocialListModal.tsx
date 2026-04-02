'use client';

import { useTranslations } from 'next-intl';
import type { ChangeEvent } from 'react';
import { Input, Modal } from 'snapflow-ui-kit/client';
import { Button, Typography } from 'snapflow-ui-kit';
import { SearchIcon } from 'snapflow-ui-kit/icons';
import { useSocialListQueries } from '@/shared/api/social-list/useSocialListQueries';
import { useMediaQuery } from '@/shared/lib';
import { SocialListLoadedBody } from './SocialListLoadedBody';
import { SocialListModalMobileChrome } from './SocialListModalMobileChrome';
import { useSocialListUIState } from './useSocialListUIState';
import s from './SocialListModal.module.css';

type BaseProps = {
  open: boolean;
  onClose: () => void;
  /**
   * Для `variant: 'likes'`: id текущего пользователя (как в /me), чтобы синхронизировать кэш
   * following/followers при follow/unfollow из списка лайков. Передаёт родитель — не импортируем entities из shared.
   */
  currentUserId?: string | null;
};

type ProfileChromeProps = {
  mobileProfileTitle?: string;
  showProfileTabs?: boolean;
};

type LikesProps = BaseProps & {
  variant: 'likes';
  postId: string;
};

type FollowingProps = BaseProps &
  ProfileChromeProps & {
    variant: 'following';
    profileId: string;
  };

type FollowersProps = BaseProps &
  ProfileChromeProps & {
    variant: 'followers';
    profileId: string;
  };

export type SocialListModalProps = LikesProps | FollowingProps | FollowersProps;

export const SocialListModal = (props: SocialListModalProps) => {
  const { open, onClose, variant, currentUserId } = props;
  const t = useTranslations('Modals.SocialList');
  const isMobile = useMediaQuery(768);

  const postId = variant === 'likes' ? props.postId : '';
  const profileId =
    variant === 'following' || variant === 'followers' ? props.profileId : '';

  const mobileProfileTitle =
    variant !== 'likes' ? props.mobileProfileTitle : undefined;
  const showProfileTabs =
    variant !== 'likes' ? Boolean(props.showProfileTabs) : false;

  const {
    search,
    setSearch,
    profileTab,
    setProfileTabOverride,
    listKind,
    resetUI,
  } = useSocialListUIState({
    variant,
    showProfileTabs,
  });
  const listVariant: 'likes' | 'following' | 'followers' = listKind;

  const {
    followingQuery,
    followersQuery,
    activeQueryKey,
    data,
    isLoading,
    isError,
    refetchActive,
  } = useSocialListQueries({
    open,
    variant,
    postId,
    profileId,
    showProfileTabs,
    listTab: profileTab,
  });

  const handleClose = () => {
    resetUI();
    onClose();
  };

  const desktopTitle =
    isLoading || !data
      ? listKind === 'likes'
        ? t('likes')
        : listKind === 'following'
          ? t('following')
          : t('followers')
      : listKind === 'likes'
        ? t('likesTitle', { count: data.totalCount })
        : listKind === 'following'
          ? t('followingTitle', { count: data.totalCount })
          : t('followersTitle', { count: data.totalCount });

  const mobileCenterTitle =
    variant === 'likes'
      ? t('likes')
      : isLoading || !data
        ? listKind === 'following'
          ? t('following')
          : t('followers')
        : listKind === 'following'
          ? t('followingTitle', { count: data.totalCount })
          : t('followersTitle', { count: data.totalCount });

  const showMobileChrome = isMobile;
  const showMobileTabs =
    isMobile && showProfileTabs && variant !== 'likes' && mobileProfileTitle;

  const syncFollowingFollowersProfileId =
    variant === 'likes' ? (currentUserId ?? null) : profileId || null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={desktopTitle}
      className={s.modal}
    >
      <div className={s.body}>
        <SocialListModalMobileChrome
          visible={showMobileChrome}
          showTabs={Boolean(showMobileTabs)}
          mobileProfileTitle={mobileProfileTitle}
          mobileCenterTitle={mobileCenterTitle}
          profileTab={profileTab}
          onProfileTabChange={setProfileTabOverride}
          followingCount={followingQuery.data?.totalCount ?? 0}
          followersCount={followersQuery.data?.totalCount ?? 0}
          onClose={handleClose}
        />

        <Input
          className={s.search}
          startIcon={<SearchIcon aria-hidden />}
          placeholder={t('searchPlaceholder')}
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          aria-label={t('searchPlaceholder')}
        />

        {isError && (
          <div className={s.error}>
            <Typography variant="text-14" as="span">
              {t('loadError')}{' '}
            </Typography>
            <Button
              variant="text"
              type="button"
              onClick={() => refetchActive()}
            >
              {t('retry')}
            </Button>
          </div>
        )}

        {!isError && isLoading && (
          <Typography variant="text-14" className={s.empty}>
            {t('loading')}
          </Typography>
        )}

        {!isError && !isLoading && data && (
          <SocialListLoadedBody
            data={data}
            search={search}
            variant={listVariant}
            followToggleQueryKey={activeQueryKey}
            removeFollowerQueryKey={
              profileId ? ['social-list', 'followers', profileId] : null
            }
            syncFollowingFollowersProfileId={syncFollowingFollowersProfileId}
          />
        )}
      </div>
    </Modal>
  );
};
