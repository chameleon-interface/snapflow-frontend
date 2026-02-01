import disposableDomains from 'disposable-email-domains';

export const patterns = {
  username: /^[a-zA-Z0-9_-]+$/,
  passwordRequired: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/,
  passwordAllowed: /^[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~]+$/,
} as const;

export const disposableEmailDomains = new Set<string>(disposableDomains);

export const validationMessages = {
  username: {
    min: 'Validation.username.min',
    max: 'Validation.username.max',
    pattern: 'Validation.username.pattern',
  },
  email: {
    invalid: 'Validation.email.invalid',
    disposable: 'Validation.email.disposable',
  },
  password: {
    min: 'Validation.password.min',
    max: 'Validation.password.max',
    required: 'Validation.password.required',
    pattern: 'Validation.password.pattern',
  },
  passwordConfirmation: {
    mismatch: 'Validation.passwordConfirmation.mismatch',
  },
  terms: {
    required: 'Validation.terms.required',
  },
} as const;
