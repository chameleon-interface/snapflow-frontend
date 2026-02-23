export const getPhotosAfterRemove = (photos: File[], index: number): File[] =>
  photos.filter((_, i) => i !== index);
