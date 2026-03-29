import type { PostViewDtoDescription } from '@/shared/api/generated/model/postViewDtoDescription';

export const getDescriptionText = (
  description: PostViewDtoDescription,
): string => {
  if (description === null) {
    return '';
  }
  if (typeof description === 'string') {
    return description;
  }
  return '';
};
