'use client';

import { useMemo, useState } from 'react';
import { useMyPaymentsQuery } from '@/entities/payment';
import {
  buildPaymentsHistoryParams,
  DEFAULT_PAYMENTS_PAGE,
  DEFAULT_PAYMENTS_PAGE_SIZE,
} from './paymentsHistoryParams';

export const usePaymentsHistoryPanel = () => {
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAYMENTS_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAYMENTS_PAGE_SIZE);
  const params = useMemo(
    () => buildPaymentsHistoryParams({ pageNumber, pageSize }),
    [pageNumber, pageSize],
  );
  const query = useMyPaymentsQuery(params);
  const pagesCount = query.data?.pagesCount ?? 0;

  const handlePageChange = (nextPageNumber: number) => {
    const clampedPageNumber =
      pagesCount > 0
        ? Math.min(Math.max(nextPageNumber, DEFAULT_PAYMENTS_PAGE), pagesCount)
        : nextPageNumber;

    setPageNumber(clampedPageNumber);
  };

  const handlePageSizeChange = (nextPageSize: number) => {
    setPageSize(nextPageSize);
    setPageNumber(DEFAULT_PAYMENTS_PAGE);
  };

  return {
    ...query,
    pageNumber,
    pageSize,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,
  };
};
