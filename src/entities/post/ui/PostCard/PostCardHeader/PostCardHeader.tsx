import { RelativeTime } from '@/shared/ui';
import { Button } from 'snapflow-ui-kit';
import { MoreHozitontalIcon } from 'snapflow-ui-kit/icons';
import { PostAuthorInfo } from '../../PostAuthorInfo';
import styles from './PostCardHeader.module.css';

type Props = {
  avatarUrl: string | null;
  createdAt: string;
  headingId: string;
  moreLabel: string;
  onMoreClickAction: () => void;
  username: string;
};

export const PostCardHeader = ({
  avatarUrl,
  createdAt,
  headingId,
  moreLabel,
  onMoreClickAction,
  username,
}: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.authorMeta}>
        <PostAuthorInfo
          avatarUrl={avatarUrl}
          headingId={headingId}
          headingTag="h2"
          username={username}
        />
        <span className={styles.timeSeparator} aria-hidden="true">
          &bull;
        </span>
        <RelativeTime isoDate={createdAt} className={styles.time} />
      </div>

      <Button
        variant="text"
        icon={<MoreHozitontalIcon />}
        className={styles.iconButton}
        title={moreLabel}
        aria-label={moreLabel}
        onClick={onMoreClickAction}
      />
    </header>
  );
};
