export const postsKeys = {
  all: ['posts'],
  byId: (postId: string) => [...postsKeys.all, 'by-id', postId],
  feed: () => [...postsKeys.all, 'feed'],
  latest: () => [...postsKeys.all, 'latest'],
  usersPosts: (userId: string) => [...postsKeys.all, 'user', userId],
};
