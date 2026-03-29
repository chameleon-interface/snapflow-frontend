import { RegisteredUsersCount } from './RegisteredUsersCount';
import { PostsBlock } from './PostsBlock';
import styles from './MainPage.module.css';

export const MainPage = () => {
  return (
    <main className={styles.mainPage}>
      <RegisteredUsersCount />
      <PostsBlock />
    </main>
  );
};
