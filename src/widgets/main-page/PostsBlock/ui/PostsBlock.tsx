'use client';

import { useTranslations } from 'next-intl';
import { EmptyStateMessage } from '@/shared/ui';
import styles from './PostsBlock.module.css';
import { usePostsQuery } from '@/widgets/main-page/PostsBlock/api';
import { PostCard } from './PostCard';

export const PostsBlock = () => {
  const { data } = usePostsQuery();
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
        return <PostCard key={post.id} post={post} />;
      })}
    </section>
  );
};
