export const postQueryKeys = {
  all: ['posts'] as const,
  byId: (postId: number) => ['posts', 'by-id', postId] as const,
  byProfile: (profileId: number) => ['posts', 'by-profile', profileId] as const,
};
