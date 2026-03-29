import type { PostViewDto } from '@/shared/api/generated/model/postViewDto';
import type { Post } from '../types/types';

export const mapPost = (item: PostViewDto): Post => ({
  id: item.id,
  profileId: item.owner.ownerId,
  photo: item.postMedias?.[0]?.url ?? '',
});
