import { mapPost } from './ posts.mapper';
import type { Post, PostsResponse } from '../types/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getPosts = async (
  page: number,
  limit: number,
  profileId: number,
): Promise<{ data: Post[]; total: number }> => {
  const res = await fetch(
    `${API_URL}posts?pageNumber=${page}&pageSize=${limit}&sortBy=createdAt&sortDirection=desc`,
  );

  if (!res.ok) {
    throw new Error('Failed to load posts');
  }

  const json: PostsResponse = await res.json();

  const filtered = json.items.filter(
    (item) => item.owner.ownerId === profileId,
  );

  const mapped = filtered.map(mapPost);

  return {
    data: mapped,
    total: mapped.length,
  };
};
