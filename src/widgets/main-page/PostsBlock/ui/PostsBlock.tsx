'use client';

import type { KeyboardEvent, MouseEvent } from 'react';
import { PostCardPreview, useLatestPostsQuery } from '@/entities/post';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ROUTES } from '@/shared/config/routes';
import type { PostViewDto } from '@/shared/api/generated/model';
import { EmptyStateMessage } from '@/shared/ui';
import styles from './PostsBlock.module.css';

const INTERACTIVE_TARGET_SELECTOR =
  'button, a, input, textarea, select, [role="button"]';

const isNestedInteractiveTarget = (
  target: EventTarget | null,
  currentTarget: EventTarget | null,
) => {
  return (
    target instanceof Element &&
    target.closest(INTERACTIVE_TARGET_SELECTOR) !== currentTarget
  );
};

export const PostsBlock = () => {
  const router = useRouter();
  const { data } = useLatestPostsQuery();
  const t = useTranslations('MainPage');

  const posts = data?.items ?? [];

  const openPost = (post: PostViewDto) => {
    router.push(
      `${ROUTES.PROFILE(post.owner.ownerId)}?postId=${post.id}&from=main`,
      {
        scroll: false,
      },
    );
  };

  const handlePostKeyDown =
    (post: PostViewDto) => (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openPost(post);
      }
    };

  const handlePostClick =
    (post: PostViewDto) => (event: MouseEvent<HTMLElement>) => {
      if (isNestedInteractiveTarget(event.target, event.currentTarget)) {
        return;
      }

      openPost(post);
    };

  if (posts.length === 0) {
    return (
      <section className={styles.postsBlock}>
        <EmptyStateMessage>{t('noPostsYet')}</EmptyStateMessage>
      </section>
    );
  }
  return (
    <section className={styles.postsBlock}>
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className={styles.postCardTrigger}
            role="button"
            tabIndex={0}
            aria-label={`Open post ${post.id}`}
            onClick={handlePostClick(post)}
            onKeyDown={handlePostKeyDown(post)}
          >
            <PostCardPreview post={post} />
          </div>
        );
      })}
    </section>
  );
};
