import { useQuery } from '@tanstack/react-query';
import { subscriptionsControllerGetMyCurrentSubscription } from '@/shared/api/generated/endpoints/payments/subscriptions/subscriptions';
import { paymentsKeys } from '@/shared/api/keys-factories/paymentsKeysFactory';
import { mapCurrentSubscription } from '../model/currentSubscription';

export const useCurrentSubscriptionQuery = () => {
  return useQuery({
    queryKey: paymentsKeys.currentSubscription(),
    queryFn: async () => {
      const subscription =
        await subscriptionsControllerGetMyCurrentSubscription();

      return mapCurrentSubscription(subscription);
    },
  });
};
