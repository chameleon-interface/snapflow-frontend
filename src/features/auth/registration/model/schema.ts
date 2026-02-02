import * as z from 'zod';
import { fields, validationMessages as msg } from '@/shared/lib/validation';

export const registrationSchema = z
  .object({
    username: fields.username,
    email: fields.email,
    password: fields.password,
    password_confirmation: fields.passwordConfirmation,
    agreeToTerms: fields.agreeToTerms,
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: msg.passwordConfirmation.mismatch,
    path: ['password_confirmation'],
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
