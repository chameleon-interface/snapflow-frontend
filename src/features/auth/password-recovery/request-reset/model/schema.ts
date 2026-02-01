import * as z from 'zod';
import { fields } from '@/shared/lib/validation';

export const requestResetSchema = z.object({
  email: fields.email,
});

export type RequestResetFormData = z.infer<typeof requestResetSchema>;
