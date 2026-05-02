const dateOfBirthPattern = /^\d{2}\.\d{2}\.\d{4}$/;
const parseDdMmYyyyToUtcDate = (value: string): Date => {
  const [day, month, year] = value.split('.').map(Number);

  return new Date(Date.UTC(year, month - 1, day));
};

/**
 * Проверяет, что строка соответствует формату `dd.MM.yyyy` и является реальной календарной датой.
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
 * Проверяет, что корректная дата `dd.MM.yyyy` находится в будущем (сравнение по календарному дню, UTC).
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
 * Конвертирует строку даты из `dd.MM.yyyy` в ISO 8601 (`yyyy-MM-ddTHH:mm:ss.sssZ`).
 * Для `null` возвращает `null`; если парсинг не удался — возвращает исходное значение.
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
