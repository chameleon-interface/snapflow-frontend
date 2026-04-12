'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { ChangeEvent, MouseEvent } from 'react';
import { useMemo, useState } from 'react';
import { Input, Modal } from 'snapflow-ui-kit/client';
import { Button, Typography } from 'snapflow-ui-kit';
import { ArrowBackIcon, SearchIcon } from 'snapflow-ui-kit/icons';
import { useMediaQuery } from '@/shared/lib/hooks';
import s from './UserListsModal.module.css';

const AVATAR_PLACEHOLDER = '/images/bro.svg';

export type UserListsModalRow = {
  id: string;
  username: string;
  avatarSrc?: string;
  isFollowing?: boolean;
  canRemoveFollower?: boolean;
  profileHref?: string;
};

export type ProfileTabsConfig = {
  profileTitle: string;
  followingLabel: string;
  followersLabel: string;
  activeTab: 'following' | 'followers';
  onChange: (tab: 'following' | 'followers') => void;
};

export type UserListsModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  rows: UserListsModalRow[];
  profileTabs?: ProfileTabsConfig;
  followersList?: boolean;
};

function RowAvatar({ src, alt }: { src: string; alt: string }) {
  const [useFallback, setUseFallback] = useState(() => !src.trim());

  return (
    <span className={s.avatarWrap}>
      <Image
        src={useFallback ? AVATAR_PLACEHOLDER : src}
        alt={alt ?? ''}
        width={36}
        height={36}
        className={s.avatarImg}
        onError={() => setUseFallback(true)}
      />
    </span>
  );
}

export const UserListsModal = ({
  open,
  onClose,
  title,
  rows,
  profileTabs,
  followersList: followersListProp,
}: UserListsModalProps) => {
  const t = useTranslations('Modals.SocialList');
  const isMobile = useMediaQuery(768);
  const [search, setSearch] = useState('');

  const resolvedProfileTitle = profileTabs?.profileTitle ?? '';
  const resolvedFollowingLabel = profileTabs?.followingLabel ?? '';
  const resolvedFollowersLabel = profileTabs?.followersLabel ?? '';
  const resolvedActiveTab = profileTabs?.activeTab ?? 'following';
  const resolvedOnTabChange = profileTabs?.onChange;

  const followersActionsMode =
    followersListProp === true ||
    (followersListProp !== false && resolvedActiveTab === 'followers');

  const handleClose = () => {
    setSearch('');
    onClose();
  };

  const showMobileHeader = isMobile;
  const hasProfileTabLabels =
    Boolean(resolvedProfileTitle) &&
    Boolean(resolvedFollowingLabel) &&
    Boolean(resolvedFollowersLabel);
  const showMobileTabsRow =
    isMobile && hasProfileTabLabels && Boolean(resolvedOnTabChange);

  const visibleRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => r.username.toLowerCase().includes(q));
  }, [rows, search]);

  const centerForMobile = profileTabs?.profileTitle ?? title;

  return (
    <Modal open={open} onClose={handleClose} title={title} className={s.modal}>
      <div className={s.body}>
        {showMobileHeader ? (
          <>
            <div className={s.mobileHeaderRow}>
              <button
                type="button"
                className={s.mobileBack}
                onClick={handleClose}
                aria-label={t('backAria')}
              >
                <ArrowBackIcon
                  width={24}
                  height={24}
                  className={s.mobileBackIcon}
                  aria-hidden
                />
              </button>
              <div className={s.mobileTitleWrap}>
                {showMobileTabsRow ? (
                  <Typography variant="text-16" className={s.mobileProfileName}>
                    {resolvedProfileTitle}
                  </Typography>
                ) : (
                  <p className={s.mobileHeaderTitle}>{centerForMobile}</p>
                )}
              </div>
              <div className={s.mobileHeaderSpacer} aria-hidden />
            </div>

            {showMobileTabsRow ? (
              <div className={s.mobileTabs} role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={resolvedActiveTab === 'following'}
                  className={s.mobileTab}
                  data-active={
                    resolvedActiveTab === 'following' ? '' : undefined
                  }
                  onClick={() => resolvedOnTabChange?.('following')}
                >
                  {resolvedFollowingLabel}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={resolvedActiveTab === 'followers'}
                  className={s.mobileTab}
                  data-active={
                    resolvedActiveTab === 'followers' ? '' : undefined
                  }
                  onClick={() => resolvedOnTabChange?.('followers')}
                >
                  {resolvedFollowersLabel}
                </button>
              </div>
            ) : null}
          </>
        ) : null}

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

        {visibleRows.length === 0 ? (
          <Typography variant="text-14" className={s.empty}>
            {search.trim() ? t('emptySearch') : t('empty')}
          </Typography>
        ) : (
          <ul className={s.list}>
            {visibleRows.map((user) => {
              const deleteBtn = user.canRemoveFollower ? (
                <Button
                  type="button"
                  variant="text"
                  className={s.deleteButton}
                  onClick={() => console.log(' remove ')}
                >
                  {t('delete')}
                </Button>
              ) : null;

              const defaultActions = (
                <div className={s.actions}>
                  <Button
                    type="button"
                    variant={user.isFollowing ? 'outlined' : 'primary'}
                    className={s.followButton}
                    onClick={() => console.log('toggle follow')}
                  >
                    {user.isFollowing ? t('unfollow') : t('follow')}
                  </Button>
                  {deleteBtn}
                </div>
              );

              const followersActions =
                user.isFollowing && deleteBtn ? (
                  <div className={s.actions}>{deleteBtn}</div>
                ) : user.isFollowing ? null : (
                  <div className={s.actions}>
                    <Button
                      type="button"
                      variant="primary"
                      className={s.followButton}
                      onClick={() => console.log('toggle follow')}
                    >
                      {t('follow')}
                    </Button>
                    {deleteBtn}
                  </div>
                );

              return (
                <li key={user.id} className={s.row}>
                  <Button
                    variant="text"
                    as={Link}
                    href={user.profileHref ?? '#'}
                    className={`${s.user} ${s.profileLink}`}
                    onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                      if (!user.profileHref) {
                        e.preventDefault();
                        return;
                      }
                      onClose();
                    }}
                  >
                    <RowAvatar
                      src={user.avatarSrc?.trim() ?? ''}
                      alt={user.username}
                    />
                    <div className={s.usernameClamp}>
                      <Typography variant="text-16" className={s.username}>
                        {user.username}
                      </Typography>
                    </div>
                  </Button>
                  {followersActionsMode ? followersActions : defaultActions}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Modal>
  );
};
