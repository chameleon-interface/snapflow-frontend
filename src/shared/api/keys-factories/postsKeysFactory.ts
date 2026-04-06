export const postsKeys = {
  all: ['posts'],
  usersPosts: (userId: string) => [...postsKeys.all, 'user', userId],
};
