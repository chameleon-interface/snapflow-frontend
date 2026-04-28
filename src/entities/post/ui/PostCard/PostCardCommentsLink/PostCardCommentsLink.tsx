import { useTranslations } from 'next-intl';
import styles from './PostCardCommentsLink.module.css';

export const PostCardCommentsLink = () => {
  const t = useTranslations('Feed');

  return <p className={styles.commentsText}>{t('commentsPlaceholder')}</p>;
};
