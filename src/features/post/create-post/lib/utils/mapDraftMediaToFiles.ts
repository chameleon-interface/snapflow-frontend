import type { PostMediaViewDto } from '@/shared/api/generated/model/core';
import { downloadBlobByUrl } from '@/shared/api';

const getExtensionFromMimeType = (mimeType: string) => {
  const extension = mimeType.split('/')[1];
  return extension || 'jpg';
};

export const mapDraftMediaToFiles = async (postMedias: PostMediaViewDto[]) => {
  return Promise.all(
    postMedias.map(async (media, index) => {
      const blob = await downloadBlobByUrl(media.url);
      const extension = getExtensionFromMimeType(blob.type);
      const fileName = `draft-${media.fileId}-${index}.${extension}`;
      return new File([blob], fileName, { type: blob.type || 'image/jpeg' });
    }),
  );
};
