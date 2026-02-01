import * as z from 'zod';
import {
  patterns,
  disposableEmailDomains,
  validationMessages as msg,
} from './patterns';

/**
 * Checks if the given email address belongs to a disposable email service.
 *
 * @param email - The email address to check
 * @returns `true` if the email domain is in the disposable domains list, `false` otherwise
 *
 * @example
 * isDisposableEmail('user@gmail.com') // false
 * isDisposableEmail('user@tempmail.com') // true
 */
const isDisposableEmail = (email: string): boolean => {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? disposableEmailDomains.has(domain) : false;
};

// Base fields for reuse
export const fields = {
  username: z
    .string()
    .min(6, msg.username.min)
    .max(30, msg.username.max)
    .regex(patterns.username, msg.username.pattern),

  email: z.email(msg.email.invalid).refine((val) => !isDisposableEmail(val), {
    message: msg.email.disposable,
  }),

  password: z
    .string()
    .min(6, msg.password.min)
    .max(20, msg.password.max)
    .regex(patterns.passwordRequired, msg.password.required)
    .regex(patterns.passwordAllowed, msg.password.pattern),

  // Simplified password for login (without complexity check)
  passwordLogin: z.string().min(1, 'Password is required'),

  passwordConfirmation: z.string().min(1, 'Please confirm your password'),

  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: msg.terms.required,
  }),
} as const;
