import * as z from 'zod';
import { fields } from '@/shared/lib';

export const requestResetSchema = z.object({
  email: fields.email,
  recaptchaToken: fields.recaptcha,
});

export type RequestResetFormData = z.infer<typeof requestResetSchema>;
