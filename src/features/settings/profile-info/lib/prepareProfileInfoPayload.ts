import type { UpdateProfileInputDto } from '@/shared/api/generated/model';
import { convertDdMmYyyyToIso8601 } from './dateOfBirthFormatters';
import type { SettingsFormValues } from '../model/schema';

/**
 * Normalizes profile form payload for API:
 * - keeps required fields as strings
 * - replaces empty optional strings with `null`
 * - converts `dateOfBirth` from `dd.MM.yyyy` to ISO 8601
 */
export const prepareProfileInfoPayload = (
  values: SettingsFormValues,
): UpdateProfileInputDto => {
  return {
    username: values.username,
    firstName: values.firstName,
    lastName: values.lastName,
    dateOfBirth: convertDdMmYyyyToIso8601(values.dateOfBirth),
    country: values.country || null,
    city: values.city || null,
    aboutMe: values.aboutMe || null,
  };
};
