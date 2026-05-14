export type PaymentResult = 'success' | 'failed' | null;

export const getPaymentResult = (
  payment: string | null,
  sessionId: string | null,
): PaymentResult => {
  if (payment === 'failed' || payment === 'cancel') {
    return 'failed';
  }

  if (payment === 'success') {
    return 'success';
  }

  // TODO: replace query-param based success fallback with real payment/subscription status check after backend status endpoint is available.
  if (!payment && sessionId) {
    return 'success';
  }

  return null;
};
