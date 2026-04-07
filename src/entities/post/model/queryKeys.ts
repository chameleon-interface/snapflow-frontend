export const postQueryKeys = {
  all: ['posts'] as const,
  byId: (postId: string) => ['posts', 'by-id', postId] as const,
  byProfile: (profileId: string) => ['posts', 'by-profile', profileId] as const,
};
