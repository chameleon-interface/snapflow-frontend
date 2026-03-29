'use client';

import { useTranslations } from 'next-intl';
import { RegisteredUsersCount } from './RegisteredUsersCount';
import { PostsBlock } from './PostsBlock';
import styles from './MainPage.module.css';

export const MainPage = () => {
  const t = useTranslations('Pages');

  return (
    <main className={styles.mainPage}>
      <h1 className={styles.visuallyHidden}>{t('mainTitle')}</h1>
      <RegisteredUsersCount />
      <PostsBlock />
    </main>
  );
};
