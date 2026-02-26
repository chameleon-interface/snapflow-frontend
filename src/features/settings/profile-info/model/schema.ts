import * as z from 'zod';
import { fields } from '@/shared/lib/validation';

const namePattern = /^[A-Za-z\u0400-\u04FF]+$/;
const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;

export const settingsSchema = z.object({
  username: fields.username,
  firstName: z
    .string()
    .min(1, 'Validation.settings.firstName.min')
    .max(50, 'Validation.settings.firstName.max')
    .regex(namePattern, 'Validation.settings.firstName.pattern'),
  lastName: z
    .string()
    .min(1, 'Validation.settings.lastName.min')
    .max(50, 'Validation.settings.lastName.max')
    .regex(namePattern, 'Validation.settings.lastName.pattern'),
  dateOfBirth: z.string().refine(
    (value) => {
      if (value.length === 0) {
        return true;
      }

      return datePattern.test(value);
    },
    { message: 'Validation.settings.dateOfBirth.pattern' },
  ),
  country: z.string(),
  city: z.string(),
  about: z.string().max(200, 'Validation.settings.about.max'),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
