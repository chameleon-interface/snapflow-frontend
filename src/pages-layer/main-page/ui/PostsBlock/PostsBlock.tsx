'use client';
import { useTranslations } from 'next-intl';
import { usePostsQuery } from '../../api';
import { PostCard } from './PostCard';
import styles from './PostsBlock.module.css';

export const PostsBlock = () => {
  const { data } = usePostsQuery();
  const t = useTranslations('MainPage');

  const posts = data?.items ?? [];

  if (posts.length === 0) {
    return (
      <section className={styles.postsBlock}>
        <p className={styles.emptyState}>{t('noPostsYet')}</p>
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
