'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useMemo, useState, type ImgHTMLAttributes } from 'react';
import { Button, Typography } from 'snapflow-ui-kit';
import { useSocialListMutations } from '@/shared/api/social-list/useSocialListMutations';
import type {
  SocialListResponse,
  SocialListUser,
} from '@/shared/api/social-list/model/types';
import s from './SocialListModal.module.css';

const AVATAR_PLACEHOLDER_SRC = '/images/bro.svg';

type Props = {
  data: SocialListResponse;
  search: string;
  variant: 'likes' | 'following' | 'followers';
  /** Ключ активного списка — optimistic follow/unfollow только здесь, без затрагивания других кэшей. */
  followToggleQueryKey: readonly unknown[];
  /** Только кэш подписчиков профиля; лайки поста и т.п. не трогаем. */
  removeFollowerQueryKey: readonly unknown[] | null;
  /**
   * Id профиля текущего пользователя (как в ключах RQ following/followers).
   * Для лайков: синхронизируем «Подписки» / «Подписчики» при Follow/Unfollow.
   */
  syncFollowingFollowersProfileId: string | null;
};

function SocialListAvatar({
  src,
  alt,
  className,
}: Pick<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'className'> & {
  src: string;
}) {
  const [useFallback, setUseFallback] = useState(() => !src.trim());

  return (
    <Image
      src={useFallback ? AVATAR_PLACEHOLDER_SRC : src}
      alt={alt ?? ''}
      width={40}
      height={40}
      className={className}
      onError={() => setUseFallback(true)}
    />
  );
}

export const SocialListLoadedBody = ({
  data,
  search,
  variant,
  followToggleQueryKey,
  removeFollowerQueryKey,
  syncFollowingFollowersProfileId,
}: Props) => {
  const t = useTranslations('Modals.SocialList');
  const { toggleFollow, removeFollower, isFollowPending, isRemovePending } =
    useSocialListMutations({
      followToggleQueryKey,
      removeFollowerQueryKey,
      syncFollowingFollowersProfileId,
    });

  const visibleItems = useMemo(() => {
    const q = search.trim().toLowerCase();

    return data.items.filter((user) => {
      if (!q) return true;

      return user.username.toLowerCase().includes(q);
    });
  }, [data, search]);

  if (visibleItems.length === 0) {
    return (
      <Typography variant="text-14" className={s.empty}>
        {search.trim() ? t('emptySearch') : t('empty')}
      </Typography>
    );
  }

  return (
    <ul className={s.list}>
      {visibleItems.map((user) => (
        <SocialListRow
          key={user.id}
          user={user}
          variant={variant}
          isFollowing={user.isFollowing}
          isFollowPending={isFollowPending(user.id)}
          isRemovePending={isRemovePending(user.id)}
          onToggleFollow={() => toggleFollow(user.id, user.isFollowing, user)}
          onRemoveFollower={() => removeFollower(user.id)}
        />
      ))}
    </ul>
  );
};

type RowProps = {
  user: SocialListUser;
  variant: 'likes' | 'following' | 'followers';
  isFollowing: boolean;
  isFollowPending: boolean;
  isRemovePending: boolean;
  onToggleFollow: () => void;
  onRemoveFollower: () => void;
};

const SocialListRow = ({
  user,
  variant,
  isFollowing,
  isFollowPending,
  isRemovePending,
  onToggleFollow,
  onRemoveFollower,
}: RowProps) => {
  const t = useTranslations('Modals.SocialList');

  return (
    <li className={s.row}>
      <div className={s.user}>
        <SocialListAvatar
          src={user.avatar}
          alt={user.username}
          className={s.avatar}
        />
        <Typography variant="text-16" className={s.username}>
          {user.username}
        </Typography>
      </div>
      <div className={s.actions}>
        {variant === 'followers' && user.canRemoveFollower && (
          <Button
            type="button"
            variant="text"
            className={s.deleteButton}
            onClick={onRemoveFollower}
            disabled={isRemovePending}
          >
            {t('delete')}
          </Button>
        )}
        <Button
          type="button"
          variant={isFollowing ? 'outlined' : 'primary'}
          className={s.followButton}
          onClick={onToggleFollow}
          disabled={isFollowPending}
        >
          {isFollowing ? t('unfollow') : t('follow')}
        </Button>
      </div>
    </li>
  );
};
