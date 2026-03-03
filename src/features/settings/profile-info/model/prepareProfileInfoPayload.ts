import { replaceEmptyStringsWithNull } from '@/shared/lib';
import { convertDdMmYyyyToIso8601 } from './dateOfBirthFormatters';
import type { SettingsFormValues } from './schema';

/**
 * Normalizes profile form payload for API:
 * - replaces empty strings with `null`
 * - converts `dateOfBirth` from `dd.MM.yyyy` to ISO 8601
 */
export const prepareProfileInfoPayload = (values: SettingsFormValues) => {
  const normalizedValues = replaceEmptyStringsWithNull(values);

  return {
    ...normalizedValues,
    dateOfBirth: convertDdMmYyyyToIso8601(normalizedValues.dateOfBirth),
  };
};
