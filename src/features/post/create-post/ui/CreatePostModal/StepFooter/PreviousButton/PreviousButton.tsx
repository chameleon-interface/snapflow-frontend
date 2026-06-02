import { useTranslations } from 'next-intl';
import { Button } from 'snapflow-ui-kit';
import { ArrowBackIcon } from 'snapflow-ui-kit/icons';
import styles from '../StepFooter.module.css';

const ICON_SIZE = 18;

type Props = {
  onClick: () => void;
  className?: string;
};

export const PreviousButton = ({ onClick, className }: Props) => {
  const t = useTranslations('CreatePost');
  const label = t('previousStep');

  return (
    <Button
      className={className ?? styles.previousBtn}
      variant="outlined"
      onClick={onClick}
      aria-label={label}
    >
      <ArrowBackIcon
        width={ICON_SIZE}
        height={ICON_SIZE}
        className={styles.btnIcon}
        aria-hidden
      />
      {label}
    </Button>
  );
};
