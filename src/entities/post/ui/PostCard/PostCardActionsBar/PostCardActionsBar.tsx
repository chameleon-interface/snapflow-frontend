import { Button } from 'snapflow-ui-kit';
import {
  BookMarkIcon,
  LikeIcon,
  MessageIcon,
  PaperPlaneIcon,
} from 'snapflow-ui-kit/icons';
import styles from './PostCardActionsBar.module.css';

type ActionProps = {
  ariaLabel: string;
  onClickAction: () => void;
  title: string;
};

type Props = {
  comment: ActionProps;
  like: ActionProps;
  save: ActionProps;
  share: ActionProps;
};

export const PostCardActionsBar = ({ comment, like, save, share }: Props) => {
  return (
    <div className={styles.actionsRow}>
      <div className={styles.primaryActions}>
        <Button
          variant="text"
          icon={<LikeIcon />}
          className={styles.iconButton}
          title={like.title}
          aria-label={like.ariaLabel}
          onClick={like.onClickAction}
        />
        <Button
          variant="text"
          icon={<MessageIcon />}
          className={styles.iconButton}
          title={comment.title}
          aria-label={comment.ariaLabel}
          onClick={comment.onClickAction}
        />
        <Button
          variant="text"
          icon={<PaperPlaneIcon />}
          className={styles.iconButton}
          title={share.title}
          aria-label={share.ariaLabel}
          onClick={share.onClickAction}
        />
      </div>

      <Button
        variant="text"
        icon={<BookMarkIcon />}
        className={styles.iconButton}
        title={save.title}
        aria-label={save.ariaLabel}
        onClick={save.onClickAction}
      />
    </div>
  );
};
