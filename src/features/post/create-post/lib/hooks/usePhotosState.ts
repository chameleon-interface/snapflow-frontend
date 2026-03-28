'use client';

import { useState } from 'react';

export const usePhotosState = () => {
  const [originalPhotos, setOriginalPhotos] = useState<File[]>([]);
  const [croppedPhotos, setCroppedPhotos] = useState<File[]>([]);
  const [readyToUploadPhotos, setReadyToUploadPhotos] = useState<File[]>([]);

  return {
    originalPhotos,
    setOriginalPhotos,
    croppedPhotos,
    setCroppedPhotos,
    readyToUploadPhotos,
    setReadyToUploadPhotos,
  };
};
