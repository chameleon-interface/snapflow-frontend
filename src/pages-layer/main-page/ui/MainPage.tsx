import { PostsBlock } from '@/widgets/main-page/PostsBlock';
import { RegisteredUsersCount } from '@/widgets/main-page/RegisteredUsersCount';
import styles from './MainPage.module.css';

export const MainPage = () => {
  return (
    <main className={styles.mainPage}>
      <RegisteredUsersCount />
      <PostsBlock />
    </main>
  );
};
