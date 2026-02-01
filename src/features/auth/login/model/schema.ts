import * as z from 'zod';
import { fields } from '@/shared/lib/validation';

export const loginSchema = z.object({
  email: fields.email,
  password: fields.passwordLogin,
});

export type LoginFormData = z.infer<typeof loginSchema>;
