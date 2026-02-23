'use client';

import { SelectPhotos } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Alert, Button } from 'snapflow-ui-kit';
import styles from './AddPhotos.module.css';

type Props = {
  selectedPhotos: File[];
  setSelectedPhotos: (photos: File[]) => void;
  draftExists?: boolean;
  isDraftLoading?: boolean;
  onOpenDraft?: () => void;
};

export const AddPhotos = ({
  selectedPhotos,
  setSelectedPhotos,
  draftExists = false,
  isDraftLoading = false,
  onOpenDraft,
}: Props) => {
  const t = useTranslations('CreatePost');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [selectedPhotos]);

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
          photos={selectedPhotos}
          onSelectPhotos={setSelectedPhotos}
          onError={setError}
          multiple
        />
        {draftExists && (
          <Button
            className={styles.openDraftButton}
            variant="outlined"
            onClick={() => onOpenDraft?.()}
            disabled={isDraftLoading}
            aria-label={t('openDraft')}
          >
            {isDraftLoading ? t('openingDraft') : t('openDraft')}
          </Button>
        )}
      </div>
    </>
  );
};
