'use client';

import type { PostViewDto } from '@/shared/api/generated/model';
import { RelativeTime } from '@/shared/ui';
import Image from 'next/image';
import { Carousel, Typography } from 'snapflow-ui-kit/client';
import { clsx } from 'clsx';
import { useCallback, useState } from 'react';
import { getDescriptionText } from '@/widgets/main-page/PostsBlock/ui/lib';
import styles from './PostCard.module.css';
import { UserAvatar } from '@/shared/ui/UserAvatar';
import { ExpandableText } from '@/shared/ui/ExpandableText';

type Props = {
  post: PostViewDto;
};

export const PostCard = ({ post }: Props) => {
  const username = post.owner.username ?? '?';
  const avatarUrl =
    typeof post.owner.avatarUrl === 'string' ? post.owner.avatarUrl : null;
  const descriptionText = getDescriptionText(post.description).trim();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleDescriptionExpandedChange = useCallback((expanded: boolean) => {
    setIsDescriptionExpanded(expanded);
  }, []);

  return (
    <article
      className={styles.postCard}
      aria-labelledby={`post-heading-${post.id}`}
    >
      <Carousel className={styles.carousel}>
        {post.postMedias.map((media, index) => (
          <div key={media.postMediaId} className={styles.mediaSlide}>
            <Image
              src={media.url}
              alt={`Photo ${index + 1} of ${post.postMedias.length} by ${username}`}
              fill
              className={styles.mediaImage}
              sizes="(max-width: 380px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        ))}
      </Carousel>
      <div
        className={clsx(
          styles.content,
          isDescriptionExpanded && styles.contentExpanded,
        )}
      >
        <header className={styles.postHeader}>
          <div className={styles.userInfo}>
            <UserAvatar avatarUrl={avatarUrl} size={36} username={username} />
            <Typography
              id={`post-heading-${post.id}`}
              className={styles.username}
              variant="h3"
              as="h3"
            >
              {username}
            </Typography>
          </div>
          <Typography
            className={styles.time}
            variant="small"
            as="time"
            dateTime={post.createdAt}
          >
            <RelativeTime isoDate={post.createdAt} />
          </Typography>
        </header>
        {descriptionText && (
          <ExpandableText
            key={`${post.id}-${descriptionText}-3`}
            text={descriptionText}
            lines={3}
            onExpandedChange={handleDescriptionExpandedChange}
          />
        )}
      </div>
    </article>
  );
};
