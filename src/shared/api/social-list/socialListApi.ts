import type { SocialListResponse } from './model/types';

const empty = (): SocialListResponse => ({ totalCount: 0, items: [] });

/** Подключи реальные запросы (Orval / fetch) вместо заглушек. */
export async function getPostLikes(
  postId: string,
): Promise<SocialListResponse> {
  void postId;
  return empty();
}

export async function getProfileFollowing(
  profileId: string,
): Promise<SocialListResponse> {
  void profileId;
  return empty();
}

export async function getProfileFollowers(
  profileId: string,
): Promise<SocialListResponse> {
  void profileId;
  return empty();
}
