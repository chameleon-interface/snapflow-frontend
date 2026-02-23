'use client';

import { useState } from 'react';

export const usePhotosState = () => {
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [processedPhotos, setProcessedPhotos] = useState<File[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<File[]>([]);

  return {
    selectedPhotos,
    setSelectedPhotos,
    processedPhotos,
    setProcessedPhotos,
    filteredPhotos,
    setFilteredPhotos,
  };
};
