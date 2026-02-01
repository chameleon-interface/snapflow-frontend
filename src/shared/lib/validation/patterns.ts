import disposableDomains from 'disposable-email-domains';

export const patterns = {
  username: /^[a-zA-Z0-9_-]+$/,
  passwordRequired: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/,
  passwordAllowed: /^[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~]+$/,
} as const;

export const disposableEmailDomains = new Set<string>(disposableDomains);

export const validationMessages = {
  username: {
    min: 'Minimum number of characters 6',
    max: 'Maximum number of characters 30',
    pattern: 'Username can only contain 0-9, A-Z, a-z, _, -',
  },
  email: {
    invalid: 'The email must match the format example@example.com',
    disposable: 'Temporary email addresses are not allowed',
  },
  password: {
    min: 'Minimum number of characters 6',
    max: ' Maximum number of characters 20',
    required:
      'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ { | } ~ ',
    pattern: 'Password contains invalid characters',
  },
  passwordConfirmation: {
    mismatch: 'Passwords must match',
  },
  terms: {
    required: 'You must agree to the Terms of Service',
  },
} as const;
