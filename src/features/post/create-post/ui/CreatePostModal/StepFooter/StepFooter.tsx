import { clsx } from 'clsx';
import { NextButton } from './NextButton';
import { PreviousButton } from './PreviousButton';
import { PublishButton } from './PublishButton';
import styles from './StepFooter.module.css';

type Props = {
  isFirstStep: boolean;
  isLastStep?: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onPublish: () => void;
  isNextLoading?: boolean;
  nextStepLoadingLabel?: string;
  /** Лейбл при загрузке на шаге публикации (кнопка «Опубликовать») */
  publishLoadingLabel?: string;
};

export const StepFooter = ({
  isFirstStep,
  isLastStep = false,
  onPrevious,
  onNext,
  onPublish,
  isNextLoading = false,
  nextStepLoadingLabel = '...',
  publishLoadingLabel = '...',
}: Props) => (
  <div className={styles.footer}>
    <div className={styles.footerLeft}>
      {!isFirstStep && (
        <PreviousButton onClick={onPrevious} className={styles.previousBtn} />
      )}
    </div>
    <div className={styles.footerRight}>
      {isLastStep ? (
        <PublishButton
          loadingLabel={publishLoadingLabel}
          isLoading={isNextLoading}
          onClick={onPublish}
          className={clsx(styles.nextBtn, styles.nextBtnPublish)}
        />
      ) : (
        <NextButton
          loadingLabel={nextStepLoadingLabel}
          isLoading={isNextLoading}
          onClick={onNext}
          className={styles.nextBtn}
        />
      )}
    </div>
  </div>
);
