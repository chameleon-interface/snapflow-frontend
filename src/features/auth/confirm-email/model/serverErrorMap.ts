export const serverErrorMap: Record<string, string> = {
  'User with this email already confirmed':
    'ServerErrors.emailAlreadyConfirmed',
  'User with this email not found': 'ServerErrors.emailNotFound',
  'It is impossible to send the code — the specified email is not registered':
    'ServerErrors.emailNotRegistered',
};
