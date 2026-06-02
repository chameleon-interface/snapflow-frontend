import type { SubscriptionsControllerGetMyPaymentsParams } from '@/shared/api/generated/model/payments';

export const paymentsKeys = {
  all: ['payments'],
  plans: () => [...paymentsKeys.all, 'plans'],
  currentSubscription: () => [...paymentsKeys.all, 'current-subscription'],
  myPaymentsAll: () => [...paymentsKeys.all, 'my-payments'],
  myPayments: (params?: SubscriptionsControllerGetMyPaymentsParams) => [
    ...paymentsKeys.myPaymentsAll(),
    params,
  ],
};
