import * as z from 'zod';
import { fields } from '@/shared/lib';

export const requestResetSchema = z.object({
  email: fields.email,
});

export type RequestResetFormData = z.infer<typeof requestResetSchema>;
