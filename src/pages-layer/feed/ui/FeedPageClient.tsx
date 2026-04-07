'use client';

import { PostsBlock } from '@/widgets/main-page/PostsBlock/ui';
import styles from './FeedPageClient.module.css';

export const FeedPageClient = () => {
  return (
    <section className={styles.container}>
      <PostsBlock />
    </section>
  );
};
