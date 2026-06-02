import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { paymentsKeys } from '@/shared/api/keys-factories/paymentsKeysFactory';
import { getPaymentResult } from '../lib/getPaymentResult';

export const usePaymentResultModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const paymentResult = getPaymentResult(
    searchParams.get('payment'),
    searchParams.get('session_id'),
  );

  useEffect(() => {
    if (paymentResult !== 'success') {
      return;
    }

    void queryClient.invalidateQueries({
      queryKey: paymentsKeys.currentSubscription(),
    });
    void queryClient.invalidateQueries({
      queryKey: paymentsKeys.myPaymentsAll(),
    });
  }, [paymentResult, queryClient]);

  const handlePaymentResultClose = () => {
    router.replace(`${pathname}?part=subscriptions`, { scroll: false });
  };

  return {
    paymentResult,
    handlePaymentResultClose,
  };
};
