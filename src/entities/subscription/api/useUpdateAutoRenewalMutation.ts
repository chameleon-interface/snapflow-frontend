import { useMutation } from '@tanstack/react-query';

import { subscriptionsControllerUpdateAutoRenewal } from '@/shared/api/generated/endpoints/payments/subscriptions/subscriptions';
import type { UpdateAutoRenewalInputDto } from '@/shared/api/generated/model/payments';

export const useUpdateAutoRenewalMutation = () => {
  return useMutation({
    mutationFn: (payload: UpdateAutoRenewalInputDto) =>
      subscriptionsControllerUpdateAutoRenewal(payload),
  });
};
