'use client';

import { useMutation } from '@tanstack/react-query';
import { uploadMedia } from './media';

export const useUploadMediaMutation = () => {
  return useMutation({
    mutationFn: (files: File[]) => uploadMedia(files),
  });
};
