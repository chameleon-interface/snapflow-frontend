export const mainPageKeys = {
  all: ['main-page'],
  registeredUsersCount: () => [...mainPageKeys.all, 'registered-users-count'],
  posts: () => [...mainPageKeys.all, 'posts'],
};
