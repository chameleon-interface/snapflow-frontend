import type { SubscriptionsControllerGetMyPaymentsParams } from '@/shared/api/generated/model/payments';

export const paymentsKeys = {
  all: ['payments'],
  plans: () => [...paymentsKeys.all, 'plans'],
  myPayments: (params?: SubscriptionsControllerGetMyPaymentsParams) => [
    ...paymentsKeys.all,
    'my-payments',
    params,
  ],
};
