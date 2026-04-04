'use client';

import type { PostViewDto } from '@/shared/api/generated/model';
import { RelativeTime, UserAvatar } from '@/shared/ui';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { Button, Typography } from 'snapflow-ui-kit';
import { Carousel } from 'snapflow-ui-kit/client';
import {
  BookMarkIcon,
  LikeIcon,
  MessageIcon,
  MoreHozitontalIcon,
  PaperPlaneIcon,
} from 'snapflow-ui-kit/icons';
import s from './PostCard.module.css';

type Props = {
  post: PostViewDto;
};

const LIKES_PLACEHOLDER_COUNT = '2 243';

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
      <header className={s.header}>
        <div className={s.authorBlock}>
          <UserAvatar
            avatarUrl={post.owner.avatarUrl}
            size={36}
            username={username}
          />

          <div className={s.authorMeta}>
            <div className={s.metaLine}>
              <Typography
                as="h2"
                variant="h3"
                id={`feed-post-${post.id}`}
                className={s.username}
              >
                {username}
              </Typography>
              <span className={s.timeSeparator} aria-hidden="true">
                &bull;
              </span>
              <RelativeTime isoDate={post.createdAt} className={s.time} />
            </div>
          </div>
        </div>

        <button
          type="button"
          className={s.iconButton}
          title={t('actions.more')}
          aria-label={t('actions.more')}
          onClick={handleTodoAlert}
        >
          <MoreHozitontalIcon />
        </button>
      </header>

      <div className={s.mediaWrap}>
        {postImages.length > 1 ? (
          <Carousel className={s.carousel} hideArrowsWhenSingle>
            {postImages.map((media, index) => (
              <div key={media.postMediaId} className={s.slide}>
                <Image
                  src={media.url}
                  alt={t('mediaAlt', {
                    current: index + 1,
                    total: postImages.length,
                    username,
                  })}
                  fill
                  sizes="(max-width: 768px) 100vw, 491px"
                  className={s.mediaImage}
                />
              </div>
            ))}
          </Carousel>
        ) : postImages[0] ? (
          <div className={s.slide}>
            <Image
              src={postImages[0].url}
              alt={t('mediaAlt', {
                current: 1,
                total: 1,
                username,
              })}
              fill
              sizes="(max-width: 768px) 100vw, 491px"
              className={s.mediaImage}
            />
          </div>
        ) : (
          <div className={s.emptyMedia}>
            <Typography variant="text-14">{t('mediaUnavailable')}</Typography>
          </div>
        )}
      </div>

      <div className={s.content}>
        <div className={s.actionsRow}>
          <div className={s.primaryActions}>
            <button
              type="button"
              className={s.iconButton}
              title={t('actions.like')}
              aria-label={t('actions.like')}
              onClick={handleTodoAlert}
            >
              <LikeIcon />
            </button>
            <button
              type="button"
              className={s.iconButton}
              title={t('actions.comment')}
              aria-label={t('actions.comment')}
              onClick={handleTodoAlert}
            >
              <MessageIcon />
            </button>
            <button
              type="button"
              className={s.iconButton}
              title={t('actions.share')}
              aria-label={t('actions.share')}
              onClick={handleTodoAlert}
            >
              <PaperPlaneIcon />
            </button>
          </div>

          <button
            type="button"
            className={s.iconButton}
            title={t('actions.save')}
            aria-label={t('actions.save')}
            onClick={handleTodoAlert}
          >
            <BookMarkIcon />
          </button>
        </div>

        {description ? (
          <div className={s.descriptionRow}>
            <span className={s.descriptionAvatar}>
              <UserAvatar
                avatarUrl={post.owner.avatarUrl}
                size={36}
                username={username}
              />
            </span>

            <Typography as="p" variant="text-14" className={s.description}>
              <span className={s.descriptionAuthor}>{username}</span>{' '}
              {description}
            </Typography>
          </div>
        ) : null}

        <p className={s.likesText}>
          <span className={s.likesCount}>{LIKES_PLACEHOLDER_COUNT}</span>{' '}
          <span className={s.likesLabel}>{t('likesLabel')}</span>
        </p>

        <p className={s.commentsText}>{t('commentsPlaceholder')}</p>

        <div className={s.commentComposer}>
          <input
            type="text"
            placeholder={t('addCommentPlaceholder')}
            aria-label={t('addCommentPlaceholder')}
            className={s.commentInput}
          />
          <Button
            type="button"
            variant="text"
            className={s.publishButton}
            onClick={handleTodoAlert}
          >
            {t('publish')}
          </Button>
        </div>
      </div>
    </article>
  );
};
