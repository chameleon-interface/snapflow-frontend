import Link from 'next/link';
import { ROUTES } from '@/shared/config/routes';
import { UserAvatar } from '@/shared/ui';
import { useLocale, useTranslations } from 'next-intl';
import { Typography } from 'snapflow-ui-kit';
import styles from './PostCardMeta.module.css';

type Props = {
  avatarUrl: string | null;
  description: string;
  likesCount: number;
  ownerId: string;
  username: string;
};

export const PostCardMeta = ({
  avatarUrl,
  description,
  likesCount,
  ownerId,
  username,
}: Props) => {
  const locale = useLocale();
  const t = useTranslations('Feed');
  const formattedLikesCount = new Intl.NumberFormat(locale).format(likesCount);

  return (
    <>
      {description ? (
        <div className={styles.descriptionRow}>
          <span className={styles.descriptionAvatar}>
            <UserAvatar avatarUrl={avatarUrl} size={36} username={username} />
          </span>

          <Typography as="p" variant="text-14" className={styles.description}>
            <Link
              href={ROUTES.PROFILE(ownerId)}
              className={styles.descriptionAuthorLink}
            >
              <span className={styles.descriptionAuthor}>{username}</span>
            </Link>{' '}
            {description}
          </Typography>
        </div>
      ) : null}

      <p className={styles.likesText}>
        <span className={styles.likesCount}>{formattedLikesCount}</span>{' '}
        <span className={styles.likesLabel}>{t('likesLabel')}</span>
      </p>
    </>
  );
};
