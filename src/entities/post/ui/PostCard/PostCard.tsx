'use client';

import type { PostViewDto } from '@/shared/api/generated/model';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { PostAddComment } from './PostAddComment/PostAddComment';
import { PostCardActionsBar } from './PostCardActionsBar/PostCardActionsBar';
import { PostCardCommentsLink } from './PostCardCommentsLink/PostCardCommentsLink';
import { PostCardHeader } from './PostCardHeader/PostCardHeader';
import { PostCardMedia } from './PostCardMedia/PostCardMedia';
import { PostCardMeta } from './PostCardMeta/PostCardMeta';
import s from './PostCard.module.css';

type Props = {
  post: PostViewDto;
};

const LIKES_PLACEHOLDER_COUNT = 2243;

export const PostCard = ({ post }: Props) => {
  const t = useTranslations('Feed');
  const username = post.owner.username || '?';
  const description = post.description?.trim() ?? '';
  const postImages = useMemo(
    () => post.postMedias.filter((media) => media.url),
    [post.postMedias],
  );
  const handleTodoAlert = () => window.alert('TODO');

  return (
    <article className={s.card} aria-labelledby={`feed-post-${post.id}`}>
      <PostCardHeader
        avatarUrl={post.owner.avatarUrl}
        createdAt={post.createdAt}
        headingId={`feed-post-${post.id}`}
        moreLabel={t('actions.more')}
        onMoreClickAction={handleTodoAlert}
        ownerId={post.owner.ownerId}
        username={username}
      />

      <PostCardMedia
        getMediaAltAction={(current, total) =>
          t('mediaAlt', {
            current,
            total,
            username,
          })
        }
        mediaUnavailableText={t('mediaUnavailable')}
        postImages={postImages}
      />

      <div className={s.content}>
        <PostCardActionsBar
          comment={{
            ariaLabel: t('actions.comment'),
            onClickAction: handleTodoAlert,
            title: t('actions.comment'),
          }}
          like={{
            ariaLabel: t('actions.like'),
            onClickAction: handleTodoAlert,
            title: t('actions.like'),
          }}
          save={{
            ariaLabel: t('actions.save'),
            onClickAction: handleTodoAlert,
            title: t('actions.save'),
          }}
          share={{
            ariaLabel: t('actions.share'),
            onClickAction: handleTodoAlert,
            title: t('actions.share'),
          }}
        />

        <PostCardMeta
          avatarUrl={post.owner.avatarUrl}
          description={description}
          likesCount={LIKES_PLACEHOLDER_COUNT}
          ownerId={post.owner.ownerId}
          username={username}
        />

        <PostCardCommentsLink />

        <PostAddComment
          onPublishAction={handleTodoAlert}
          placeholder={t('addCommentPlaceholder')}
          publishLabel={t('publish')}
        />
      </div>
    </article>
  );
};
