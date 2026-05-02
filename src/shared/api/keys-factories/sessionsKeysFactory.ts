export const sessionsKeys = {
  all: ['sessions'],
  list: () => [...sessionsKeys.all, 'list'],
} as const;
