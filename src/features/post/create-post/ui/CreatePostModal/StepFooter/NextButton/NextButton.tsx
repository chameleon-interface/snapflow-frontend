'use client';

import { useTranslations } from 'next-intl';
import { Button } from 'snapflow-ui-kit';
import { ArrowRightIcon } from 'snapflow-ui-kit/icons';
import styles from '../StepFooter.module.css';

const ICON_SIZE = 18;

type Props = {
  loadingLabel?: string;
  isLoading?: boolean;
  onClick: () => void;
  className?: string;
};

export const NextButton = ({
  loadingLabel = '...',
  isLoading = false,
  onClick,
  className,
}: Props) => {
  const t = useTranslations('CreatePost');
  const label = t('nextStep');

  return (
    <Button
      className={className ?? styles.nextBtn}
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
          <ArrowRightIcon
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
