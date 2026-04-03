export const postsKeys = {
  all: ['posts'],
  feed: () => [...postsKeys.all, 'feed'],
  myPosts: () => [...postsKeys.all, 'my'],
  usersPosts: (userId: string) => [...postsKeys.all, 'user', userId],
};
