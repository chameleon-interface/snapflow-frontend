export const postsKeys = {
  all: ['posts'],
  feed: () => [...postsKeys.all, 'feed'],
  latest: () => [...postsKeys.all, 'latest'],
  usersPosts: (userId: string) => [...postsKeys.all, 'user', userId],
};
