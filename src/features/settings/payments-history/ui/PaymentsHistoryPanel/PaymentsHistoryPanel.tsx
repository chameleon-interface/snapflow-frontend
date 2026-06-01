'use client';

import { useTranslations } from 'next-intl';
import { Button, Typography } from 'snapflow-ui-kit';
import { Pagination } from 'snapflow-ui-kit/client';
import { PAYMENTS_PAGE_SIZE_OPTIONS } from '../../model/paymentsHistoryParams';
import { usePaymentsHistoryPanel } from '../../model/usePaymentsHistoryPanel';
import { PaymentsHistorySkeleton } from '../PaymentsHistorySkeleton/PaymentsHistorySkeleton';
import { PaymentsHistoryTable } from '../PaymentsHistoryTable/PaymentsHistoryTable';
import s from './PaymentsHistoryPanel.module.css';

export const PaymentsHistoryPanel = () => {
  const t = useTranslations('Settings.paymentsHistory');
  const {
    data,
    isError,
    isLoading,
    pageNumber,
    pageSize,
    refetch,
    onPageChange,
    onPageSizeChange,
  } = usePaymentsHistoryPanel();
  const payments = data?.items ?? [];
  const pagesCount = data?.pagesCount ?? 0;
  const totalCount = data?.totalCount ?? 0;

  if (isLoading) {
    return (
      <section className={s.root} aria-label={t('loading')}>
        <PaymentsHistorySkeleton />
      </section>
    );
  }

  if (isError) {
    return (
      <section className={s.root}>
        <div className={s.stateBox} role="alert">
          <Typography as="p" variant="text-14" className={s.stateText}>
            {t('loadFailed')}
          </Typography>
          <Button
            type="button"
            variant="outlined"
            onClick={() => void refetch()}
          >
            {t('retry')}
          </Button>
        </div>
      </section>
    );
  }

  if (payments.length === 0 && totalCount === 0) {
    return (
      <section className={s.root}>
        <Typography as="p" variant="text-14" className={s.stateBox}>
          {t('empty')}
        </Typography>
      </section>
    );
  }

  if (payments.length === 0) {
    return (
      <section className={s.root} aria-label={t('title')}>
        <Typography as="p" variant="text-14" className={s.stateBox}>
          {t('emptyPage')}
        </Typography>
        <Pagination
          page={pageNumber}
          pageSize={pageSize}
          totalPages={pagesCount}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          showPageSizeSelect
          pageSizeOptions={PAYMENTS_PAGE_SIZE_OPTIONS}
        />
      </section>
    );
  }

  return (
    <section className={s.root} aria-label={t('title')}>
      <PaymentsHistoryTable payments={payments} />
      <Pagination
        page={pageNumber}
        pageSize={pageSize}
        totalPages={pagesCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        showPageSizeSelect
        pageSizeOptions={PAYMENTS_PAGE_SIZE_OPTIONS}
      />
    </section>
  );
};
