import { Pagination } from 'snapflow-ui-kit/client';
import { PAYMENTS_PAGE_SIZE_OPTIONS } from '../../model/paymentsHistoryParams';

type PaymentsHistoryPaginationProps = {
  pageNumber: number;
  pageSize: number;
  pagesCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

export const PaymentsHistoryPagination = ({
  pageNumber,
  pageSize,
  pagesCount,
  onPageChange,
  onPageSizeChange,
}: PaymentsHistoryPaginationProps) => {
  return (
    <Pagination
      page={pageNumber}
      pageSize={pageSize}
      totalPages={pagesCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      showPageSizeSelect
      pageSizeOptions={PAYMENTS_PAGE_SIZE_OPTIONS}
    />
  );
};
