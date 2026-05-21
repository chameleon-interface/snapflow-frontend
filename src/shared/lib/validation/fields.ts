import * as z from 'zod';
import {
  patterns,
  disposableEmailDomains,
  validationMessages as msg,
} from './patterns';

/**
 * Проверяет, относится ли email к сервису одноразовой почты.
 *
 * @param email - Email для проверки
 * @returns `true`, если домен есть в списке одноразовых; иначе `false`
 *
 * @example
 * isDisposableEmail('user@gmail.com') // false
 * isDisposableEmail('user@tempmail.com') // true
 */
const isDisposableEmail = (email: string): boolean => {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? disposableEmailDomains.has(domain) : false;
};

// Базовые поля для переиспользования
export const fields = {
  username: z
    .string()
    .min(6, msg.username.min)
    .max(30, msg.username.max)
    .regex(patterns.username, msg.username.pattern),

  email: z.email(msg.email.invalid).refine((val) => !isDisposableEmail(val), {
    message: msg.email.disposable,
  }),

  recaptcha: z.string().min(1, msg.recaptcha.required),

  password: z
    .string()
    .min(6, msg.password.min)
    .max(20, msg.password.max)
    .regex(patterns.passwordRequired, msg.password.required)
    .regex(patterns.passwordAllowed, msg.password.pattern),

  // Упрощённый пароль для логина (без проверки сложности)
  passwordLogin: z.string().min(1, msg.password.fieldRequired),

  passwordConfirmation: z.string().min(1, msg.passwordConfirmation.required),

  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: '',
  }),
} as const;
