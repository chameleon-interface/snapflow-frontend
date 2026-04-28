export const authKeys = {
  all: ['auth'],
  me: () => [...authKeys.all, 'me'],
  registrationConfirmation: (code: string) => [
    ...authKeys.all,
    'registration-confirmation',
    code,
  ],
  checkPasswordRecoveryCode: (recoveryCode: string) => [
    ...authKeys.all,
    'check-password-recovery-code',
    recoveryCode,
  ],
};
