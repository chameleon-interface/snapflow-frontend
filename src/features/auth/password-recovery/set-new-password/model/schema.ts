import * as z from 'zod';
import { fields, validationMessages as msg } from '@/shared/lib';

export const setNewPasswordSchema = z
  .object({
    password: fields.password,
    password_confirmation: fields.passwordConfirmation,
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: msg.passwordConfirmation.mismatch,
    path: ['password_confirmation'],
  });

export type SetNewPasswordFormData = z.infer<typeof setNewPasswordSchema>;
