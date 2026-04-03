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
import s from './SocialListModal.module.css';

const AVATAR_PLACEHOLDER = '/images/bro.svg';

export type SocialListModalRow = {
  id: string;
  username: string;
  avatarSrc?: string;
  isFollowing?: boolean;
  canRemoveFollower?: boolean;
  profileHref?: string;
};

export type SocialListModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  rows: SocialListModalRow[];
  mobileCenterTitle?: string;
  mobileProfileTitle?: string;
  showMobileTabs?: boolean;
  followingTabLabel?: string;
  followersTabLabel?: string;
  activeProfileTab?: 'following' | 'followers';
  onProfileTabChange?: (tab: 'following' | 'followers') => void;
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

export const SocialListModal = ({
  open,
  onClose,
  title,
  rows,
  mobileCenterTitle,
  mobileProfileTitle,
  showMobileTabs = false,
  followingTabLabel = '',
  followersTabLabel = '',
  activeProfileTab = 'following',
  onProfileTabChange,
}: SocialListModalProps) => {
  const t = useTranslations('Modals.SocialList');
  const isMobile = useMediaQuery(768);
  const [search, setSearch] = useState('');

  const handleClose = () => {
    setSearch('');
    onClose();
  };

  const showMobileChrome = isMobile;
  const showMobileTabsRow =
    isMobile && showMobileTabs && Boolean(mobileProfileTitle);

  const visibleRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => r.username.toLowerCase().includes(q));
  }, [rows, search]);

  const centerForMobile = mobileCenterTitle ?? title;

  return (
    <Modal open={open} onClose={handleClose} title={title} className={s.modal}>
      <div className={s.body}>
        {showMobileChrome ? (
          <>
            <div className={s.mobileChrome}>
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
                    {mobileProfileTitle}
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
                  aria-selected={activeProfileTab === 'following'}
                  className={s.mobileTab}
                  data-active={
                    activeProfileTab === 'following' ? '' : undefined
                  }
                  onClick={() => onProfileTabChange?.('following')}
                >
                  {followingTabLabel}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeProfileTab === 'followers'}
                  className={s.mobileTab}
                  data-active={
                    activeProfileTab === 'followers' ? '' : undefined
                  }
                  onClick={() => onProfileTabChange?.('followers')}
                >
                  {followersTabLabel}
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
            {visibleRows.map((user) => (
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
                  <Typography variant="text-16" className={s.username}>
                    {user.username}
                  </Typography>
                </Button>
                <div className={s.actions}>
                  {user.canRemoveFollower ? (
                    <Button
                      type="button"
                      variant="text"
                      className={s.deleteButton}
                      onClick={() => console.log(' remove ')}
                    >
                      {t('delete')}
                    </Button>
                  ) : null}
                  <Button
                    type="button"
                    variant={user.isFollowing ? 'outlined' : 'primary'}
                    className={s.followButton}
                    onClick={() => console.log('toggle follow')}
                  >
                    {user.isFollowing ? t('unfollow') : t('follow')}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
};
