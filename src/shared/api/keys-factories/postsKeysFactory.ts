export const postsKeys = {
  all: ['posts'],
  feed: () => [...postsKeys.all, 'feed'],
  latest: () => [...postsKeys.all, 'latest'],
  myPosts: () => [...postsKeys.all, 'my'],
  usersPosts: (userId: string) => [...postsKeys.all, 'user', userId],
};
