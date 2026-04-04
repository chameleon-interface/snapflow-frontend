import { Button } from 'snapflow-ui-kit';
import styles from './PostAddComment.module.css';

type Props = {
  onPublishAction: () => void;
  placeholder: string;
  publishLabel: string;
};

export const PostAddComment = ({
  onPublishAction,
  placeholder,
  publishLabel,
}: Props) => {
  return (
    <div className={styles.commentComposer}>
      <input
        type="text"
        placeholder={placeholder}
        aria-label={placeholder}
        className={styles.commentInput}
      />
      <Button
        type="button"
        variant="text"
        className={styles.publishButton}
        onClick={onPublishAction}
      >
        {publishLabel}
      </Button>
    </div>
  );
};
