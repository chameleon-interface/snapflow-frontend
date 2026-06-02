import { useQuery } from '@tanstack/react-query';
import { subscriptionsControllerGetPlans } from '@/shared/api/generated/endpoints/payments/subscriptions/subscriptions';
import { paymentsKeys } from '@/shared/api/keys-factories/paymentsKeysFactory';

export const useSubscriptionPlansQuery = () => {
  return useQuery({
    queryKey: paymentsKeys.plans(),
    queryFn: subscriptionsControllerGetPlans,
  });
};
