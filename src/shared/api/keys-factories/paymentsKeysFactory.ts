import type { SubscriptionsControllerGetMyPaymentsParams } from '@/shared/api/generated/model/payments';

export const paymentsKeys = {
  all: ['payments'],
  plans: () => [...paymentsKeys.all, 'plans'],
  currentSubscription: () => [...paymentsKeys.all, 'current-subscription'],
  myPayments: (params?: SubscriptionsControllerGetMyPaymentsParams) => [
    ...paymentsKeys.all,
    'my-payments',
    params,
  ],
};
