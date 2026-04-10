export const postsKeys = {
  all: ['posts'],
  byId: (postId: string, isOwner: boolean) => [
    ...postsKeys.all,
    'by-id',
    postId,
    isOwner ? 'owner' : 'public',
  ],
  usersPosts: (userId: string) => [...postsKeys.all, 'user', userId],
};
