'use client';

import { useFlow } from '@/features/post/create-post/lib/hooks/useFlow';
import type { CreatePostStep } from '@/features/post/create-post/model/types';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { Modal } from 'snapflow-ui-kit/client';
import { CloseModal } from '@/features/post/create-post/ui/CloseModal';
import styles from './CreatePostModal.module.css';
import { StepContent } from './StepContent';
import { StepFooter } from './StepFooter';

const STEP_TITLE_KEYS: Record<CreatePostStep, string> = {
  addPhotos: 'stepTitleAddPhotos',
  cropping: 'stepTitleCropping',
  filters: 'stepTitleFilters',
  publish: 'stepTitlePublish',
};

const WIDE_MODAL_STEPS: CreatePostStep[] = ['filters', 'publish'];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const getNextStepLoadingLabel = (
  step: CreatePostStep,
  t: (key: string) => string,
) => (step === 'filters' ? t('applyingFilters') : t('generatingCropped'));

export const CreatePostModal = ({ isOpen, onClose }: Props) => {
  const t = useTranslations('CreatePost');
  const flow = useFlow({ onClose });

  return (
    <Modal
      open={isOpen}
      onClose={flow.handleCloseRequest}
      title={t(STEP_TITLE_KEYS[flow.step])}
      className={clsx(
        styles.modalContainer,
        WIDE_MODAL_STEPS.includes(flow.step) && styles.modalContainerWide,
      )}
    >
      <div className={styles.content}>
        <StepContent {...flow} />
      </div>

      {flow.step !== 'addPhotos' && (
        <StepFooter
          isFirstStep={flow.isFirstStep}
          isLastStep={flow.isLastStep}
          onPrevious={flow.handlePreviousStep}
          onNext={flow.handleNextStep}
          onPublish={flow.handlePublish}
          isNextLoading={
            flow.isCroppingExporting ||
            flow.isFiltersExporting ||
            flow.isPublishPending
          }
          nextStepLoadingLabel={getNextStepLoadingLabel(flow.step, t)}
          publishLoadingLabel={t('publishing')}
        />
      )}

      <CloseModal
        isOpen={flow.isCloseModalOpened}
        onClose={() => flow.setIsCloseModalOpened(false)}
        onDiscard={flow.handleDiscard}
        onSaveDraft={flow.handleSaveDraft}
      />
    </Modal>
  );
};
