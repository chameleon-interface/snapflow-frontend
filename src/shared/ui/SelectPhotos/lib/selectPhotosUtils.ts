export const getPhotoNames = (photos: File[]): string[] =>
  photos.map((file) => file.name);

export const mergeSelectedFiles = (
  files: FileList,
  currentPhotos: File[],
  multiple: boolean
): File[] => {
  const list = Array.from(files);
  return multiple ? [...currentPhotos, ...list] : list;
};
