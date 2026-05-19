import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getPaymentResult } from '../lib/getPaymentResult';

export const usePaymentResultModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paymentResult = getPaymentResult(
    searchParams.get('payment'),
    searchParams.get('session_id'),
  );

  const handlePaymentResultClose = () => {
    router.replace(`${pathname}?part=subscriptions`, { scroll: false });
  };

  return {
    paymentResult,
    handlePaymentResultClose,
  };
};
