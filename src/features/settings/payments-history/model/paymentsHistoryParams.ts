import {
  SubscriptionsControllerGetMyPaymentsSortBy,
  SubscriptionsControllerGetMyPaymentsSortDirection,
  type SubscriptionsControllerGetMyPaymentsParams,
} from '@/shared/api/generated/model/payments';

export const DEFAULT_PAYMENTS_PAGE = 1;
export const DEFAULT_PAYMENTS_PAGE_SIZE = 10;
export const PAYMENTS_PAGE_SIZE_OPTIONS = [10, 20, 50];

export const buildPaymentsHistoryParams = ({
  pageNumber,
  pageSize,
}: {
  pageNumber: number;
  pageSize: number;
}) =>
  ({
    pageNumber,
    pageSize,
    sortBy: SubscriptionsControllerGetMyPaymentsSortBy.createdAt,
    sortDirection: SubscriptionsControllerGetMyPaymentsSortDirection.desc,
  }) satisfies SubscriptionsControllerGetMyPaymentsParams;
