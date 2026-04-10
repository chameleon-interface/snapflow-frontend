export const postsKeys = {
  all: ['posts'],
  byId: (postId: string) => [...postsKeys.all, 'by-id', postId],
  usersPosts: (userId: string) => [...postsKeys.all, 'user', userId],
};
