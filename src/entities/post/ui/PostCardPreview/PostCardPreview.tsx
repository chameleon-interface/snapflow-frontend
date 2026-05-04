'use client';

import type { PostViewDto } from '@/shared/api/generated/model';
import { PostAuthorInfo } from '@/entities/post/ui/PostAuthorInfo';
import { ROUTES } from '@/shared/config/routes';
import { RelativeTime } from '@/shared/ui';
import { ExpandableText } from '@/shared/ui/ExpandableText';
import { clsx } from 'clsx';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { Carousel } from 'snapflow-ui-kit/client';
import styles from './PostCardPreview.module.css';

type Props = {
  post: PostViewDto;
  variant?: 'default' | 'compact';
};

export const PostCardPreview = ({ post, variant = 'default' }: Props) => {
  const username = post.owner.username ?? '?';
  const isCompact = variant === 'compact';
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
      {!isCompact && (
        <div
          className={clsx(
            styles.content,
            isDescriptionExpanded && styles.contentExpanded,
          )}
        >
          <header className={styles.postHeader}>
            <PostAuthorInfo
              avatarUrl={post.owner.avatarUrl}
              headingId={`post-heading-${post.id}`}
              profileHref={ROUTES.PROFILE(post.owner.profileId)}
              username={username}
            />
            <RelativeTime isoDate={post.createdAt} className={styles.time} />
          </header>
          {post.description && (
            <ExpandableText
              key={`${post.id}-${post.description}-3`}
              text={post.description}
              lines={3}
              onExpandedChange={handleDescriptionExpandedChange}
            />
          )}
        </div>
      )}
    </article>
  );
};
