import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { Button } from 'snapflow-ui-kit';
import { CheckmarkIcon } from 'snapflow-ui-kit/icons';
import styles from '../StepFooter.module.css';

const ICON_SIZE = 18;

type Props = {
  loadingLabel?: string;
  isLoading?: boolean;
  onClick: () => void;
  className?: string;
};

export const PublishButton = ({
  loadingLabel = '...',
  isLoading = false,
  onClick,
  className,
}: Props) => {
  const t = useTranslations('CreatePost');
  const label = t('publishButton');

  return (
    <Button
      className={className ?? clsx(styles.nextBtn, styles.nextBtnPublish)}
      variant="primary"
      onClick={onClick}
      disabled={isLoading}
      aria-label={label}
    >
      {isLoading ? (
        loadingLabel
      ) : (
        <>
          {label}
          <CheckmarkIcon
            width={ICON_SIZE}
            height={ICON_SIZE}
            className={styles.btnIcon}
            aria-hidden
          />
        </>
      )}
    </Button>
  );
};
