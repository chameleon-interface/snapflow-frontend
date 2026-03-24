'use client';

import { usePhotoPicker } from '@/shared/lib';
import { HiddenFileInput } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Alert, Button } from 'snapflow-ui-kit';
import { AddPhotoPlaceholder } from './AddPhotoPlaceholder';
import styles from './AddPhotos.module.css';

type Props = {
  originalPhotos: File[];
  setOriginalPhotos: (photos: File[]) => void;
  onOpenDraft?: () => void;
  hasDraft?: boolean;
  isOpenDraftLoading?: boolean;
};

export const AddPhotos = ({
  originalPhotos,
  setOriginalPhotos,
  onOpenDraft,
  hasDraft = false,
  isOpenDraftLoading = false,
}: Props) => {
  const t = useTranslations('CreatePost');
  const tValidation = useTranslations('Validation.selectPhotos');
  const [error, setError] = useState<string | null>(null);
  const { fileInputRef, openFileDialog, handleFileChange } = usePhotoPicker({
    photos: originalPhotos,
    onSelectPhotos: setOriginalPhotos,
    onError: setError,
    multiple: true,
    mapError: (validationError) =>
      tValidation(validationError.key, validationError.values),
  });

  useEffect(() => {
    queueMicrotask(() => setError(null));
  }, [originalPhotos]);

  return (
    <>
      {error && (
        <Alert
          variant="error"
          message={error}
          onClose={() => setError(null)}
          className={styles.error}
        />
      )}
      <div className={styles.content}>
        <HiddenFileInput
          inputRef={fileInputRef}
          accept=".jpeg,.jpg,.png"
          multiple
          onChange={handleFileChange}
          className={styles.hiddenInput}
          hidden={false}
        />

        <AddPhotoPlaceholder
          ariaLabel={t('addPhoto')}
          onOpenFileDialog={openFileDialog}
        />

        <Button
          className={styles.selectButton}
          onClick={openFileDialog}
          aria-label={t('addPhoto')}
          type="button"
          variant="primary"
        >
          {t('addPhoto')}
        </Button>
        {hasDraft && (
          <Button
            className={styles.openDraftButton}
            variant="outlined"
            onClick={() => onOpenDraft?.()}
            aria-label={t('openDraft')}
            disabled={isOpenDraftLoading}
          >
            {t('openDraft')}
          </Button>
        )}
      </div>
    </>
  );
};
