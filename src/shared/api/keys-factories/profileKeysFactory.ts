export const profileKeys = {
  all: ['profile'],
  myProfile: () => [...profileKeys.all, 'my'],
  userProfile: (userId: string) => [...profileKeys.all, 'user', userId],
};
