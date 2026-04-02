export const getPhotoNames = (photos: File[]): string[] =>
  photos.map((file) => file.name);

export const mergeSelectedFiles = (
  files: FileList,
  currentPhotos: File[],
  multiple: boolean,
): File[] => {
  const nextFiles = Array.from(files);
  return multiple ? [...currentPhotos, ...nextFiles] : nextFiles;
};
