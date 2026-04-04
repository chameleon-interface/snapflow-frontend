'use client';

import { PostCardPreview, useLatestPostsQuery } from '@/entities/post';
import { useTranslations } from 'next-intl';
import { EmptyStateMessage } from '@/shared/ui';
import styles from './PostsBlock.module.css';

export const PostsBlock = () => {
  const { data } = useLatestPostsQuery();
  const t = useTranslations('MainPage');

  const posts = data?.items ?? [];

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
        return <PostCardPreview key={post.id} post={post} />;
      })}
    </section>
  );
};
