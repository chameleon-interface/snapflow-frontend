'use client';

import type { KeyboardEvent, MouseEvent } from 'react';
import { PostCardPreview, useLatestPostsQuery } from '@/entities/post';
import type { PostViewDto } from '@/shared/api/generated/model/core';
import { isNestedInteractiveTarget } from '@/shared/lib/dom/isNestedInteractiveTarget';
import { getProfilePostRoute } from '@/shared/lib/routes/getProfilePostRoute';
import { EmptyStateMessage } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import styles from './PostsBlock.module.css';
import { PostsBlockSkeleton } from './PostsBlockSkeleton/PostsBlockSkeleton';

export const PostsBlock = () => {
  const router = useRouter();
  const { data, isPending } = useLatestPostsQuery();
  const t = useTranslations('MainPage');

  const posts = data?.items ?? [];

  const openPost = (post: PostViewDto) => {
    router.push(
      getProfilePostRoute({
        from: 'main',
        postId: post.id,
        profileId: post.owner.profileId,
      }),
      { scroll: false },
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

  if (isPending) {
    return <PostsBlockSkeleton />;
  }

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
