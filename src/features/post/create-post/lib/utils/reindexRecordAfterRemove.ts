export const reindexRecordAfterRemove = <T>(
  record: Record<number, T>,
  removeIndex: number,
): Record<number, T> => {
  const next: Record<number, T> = {};
  Object.entries(record).forEach(([key, value]) => {
    const i = Number(key);
    if (i < removeIndex) next[i] = value;
    if (i > removeIndex) next[i - 1] = value;
  });
  return next;
};
