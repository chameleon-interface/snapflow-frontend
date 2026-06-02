import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { subscriptionsControllerGetMyCurrentSubscription } from '@/shared/api/generated/endpoints/payments/subscriptions/subscriptions';
import { paymentsKeys } from '@/shared/api/keys-factories/paymentsKeysFactory';
import {
  mapCurrentSubscription,
  type CurrentSubscription,
} from '../model/currentSubscription';

export const useCurrentSubscriptionQuery = () => {
  return useQuery<CurrentSubscription | null>({
    queryKey: paymentsKeys.currentSubscription(),
    queryFn: async () => {
      try {
        const subscription =
          await subscriptionsControllerGetMyCurrentSubscription();

        return subscription ? mapCurrentSubscription(subscription) : null;
      } catch (error) {
        const isSubscriptionMissing =
          axios.isAxiosError(error) && error.response?.status === 404;

        if (isSubscriptionMissing) {
          return null;
        }

        throw error;
      }
    },
  });
};
