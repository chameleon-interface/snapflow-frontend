import { useQuery } from '@tanstack/react-query';
import { subscriptionsControllerGetMyPayments } from '@/shared/api/generated/endpoints/payments/subscriptions/subscriptions';
import type { SubscriptionsControllerGetMyPaymentsParams } from '@/shared/api/generated/model/payments';
import { paymentsKeys } from '@/shared/api/keys-factories/paymentsKeysFactory';

export const useMyPaymentsQuery = (
  params: SubscriptionsControllerGetMyPaymentsParams,
) => {
  return useQuery({
    queryKey: paymentsKeys.myPayments(params),
    queryFn: () => subscriptionsControllerGetMyPayments(params),
    refetchOnMount: 'always',
    staleTime: 0,
  });
};
