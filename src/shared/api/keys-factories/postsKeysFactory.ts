export const postsKeys = {
  all: ['posts'],
  myPosts: () => [...postsKeys.all, 'my'],
  usersPosts: (userId: string) => [...postsKeys.all, 'user', userId],
};
