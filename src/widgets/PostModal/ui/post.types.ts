import type { PostViewDto } from '@/shared/api/generated/model';

export type Post = Omit<PostViewDto, 'description'> & {
  description: string;
};
