export const profileKeys = {
  all: ['profile'],
  myProfile: () => [...profileKeys.all, 'my'],
  userProfile: (profileId: string) => [...profileKeys.all, 'user', profileId],
};
