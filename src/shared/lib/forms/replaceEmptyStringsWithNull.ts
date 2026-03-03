type EmptyStringToNull<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] extends string ? string | null : T[K];
};

/**
 * Returns a shallow copy of an object where all empty string values are replaced with `null`.
 * Non-empty strings and values of other types are kept unchanged.
 */
export const replaceEmptyStringsWithNull = <T extends Record<string, unknown>>(
  values: T,
): EmptyStringToNull<T> => {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      value === '' ? null : value,
    ]),
  ) as EmptyStringToNull<T>;
};
