import * as z from 'zod';
import { fields } from '@/shared/lib';

export const resendEmailSchema = z.object({
  email: fields.email,
});

export type ResendEmailFormData = z.infer<typeof resendEmailSchema>;
