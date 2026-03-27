const dateOfBirthPattern = /^\d{2}\.\d{2}\.\d{4}$/;
const parseDdMmYyyyToUtcDate = (value: string): Date => {
  const [day, month, year] = value.split('.').map(Number);

  return new Date(Date.UTC(year, month - 1, day));
};

/**
 * Validates that a string matches `dd.MM.yyyy` and represents a real calendar date.
 */
export const isValidDdMmYyyyDate = (value: string): boolean => {
  if (!dateOfBirthPattern.test(value)) {
    return false;
  }

  const [day, month, year] = value.split('.').map(Number);

  if (!day || !month || !year) {
    return false;
  }

  const date = parseDdMmYyyyToUtcDate(value);

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
};

/**
 * Checks whether a valid `dd.MM.yyyy` date is in the future (compared by calendar day, UTC).
 */
export const isDdMmYyyyDateInFuture = (value: string): boolean => {
  if (!isValidDdMmYyyyDate(value)) {
    return false;
  }

  const inputDate = parseDdMmYyyyToUtcDate(value);
  const now = new Date();
  const todayUtc = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );

  return inputDate.getTime() > todayUtc.getTime();
};

/**
 * Converts a date string from `dd.MM.yyyy` to ISO 8601 (`yyyy-MM-ddTHH:mm:ss.sssZ`).
 * Returns `null` for `null` input and returns the original value if parsing fails.
 */
export const convertDdMmYyyyToIso8601 = (
  value: string | null,
): string | null => {
  if (value === null) {
    return null;
  }

  if (!isValidDdMmYyyyDate(value)) {
    return value;
  }

  const date = parseDdMmYyyyToUtcDate(value);

  return date.toISOString();
};

/**
 * Converts an ISO 8601 date string to `dd.MM.yyyy`.
 * Returns an empty string for `null`/empty input and returns the original value if parsing fails.
 */
export const formatIso8601ToDdMmYyyy = (value: string | null): string => {
  if (!value) {
    return '';
  }

  const isoDateMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);

  if (isoDateMatch) {
    const [, year, month, day] = isoDateMatch;

    return `${day}.${month}.${year}`;
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  const day = String(parsedDate.getUTCDate()).padStart(2, '0');
  const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
  const year = String(parsedDate.getUTCFullYear());

  return `${day}.${month}.${year}`;
};
