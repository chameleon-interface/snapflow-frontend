import type { ApiPost, Post } from '../types/types';

export const mapPost = (item: ApiPost): Post => ({
  id: item.id,
  profileId: item.owner.ownerId,
  photo: item.postMedias?.[0]?.url ?? '',
  description: item.description,
});
