'use client';

import { SelectPhotos } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Alert, Button } from 'snapflow-ui-kit';
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
  const [error, setError] = useState<string | null>(null);

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
        <SelectPhotos
          photos={originalPhotos}
          onSelectPhotos={setOriginalPhotos}
          onError={setError}
          multiple
        />
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
