import { useMutation, useQueryClient } from '@tanstack/react-query';

import { subscriptionsControllerUpdateAutoRenewal } from '@/shared/api/generated/endpoints/payments/subscriptions/subscriptions';
import type { UpdateAutoRenewalInputDto } from '@/shared/api/generated/model/payments';
import { paymentsKeys } from '@/shared/api/keys-factories/paymentsKeysFactory';

export const useUpdateAutoRenewalMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateAutoRenewalInputDto) =>
      subscriptionsControllerUpdateAutoRenewal(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: paymentsKeys.currentSubscription(),
      });
    },
  });
};
