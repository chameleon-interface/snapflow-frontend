import { useMutation } from '@tanstack/react-query';

import { subscriptionsControllerCreateCheckoutSession } from '@/shared/api/generated/endpoints/payments/subscriptions/subscriptions';
import type { CreateCheckoutSessionInputDto } from '@/shared/api/generated/model/payments';

export const useCreateCheckoutSessionMutation = () => {
  return useMutation({
    mutationFn: (payload: CreateCheckoutSessionInputDto) =>
      subscriptionsControllerCreateCheckoutSession(payload),
  });
};
