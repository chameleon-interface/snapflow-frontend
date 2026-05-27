import { useLocale, useTranslations } from 'next-intl';
import type { PaymentViewDto } from '@/shared/api/generated/model/payments';
import { formatCalendarDate } from '@/shared/lib';
import { formatPaymentPrice } from '../../lib/formatPaymentPrice';
import s from './PaymentsHistoryTable.module.css';

type PaymentsHistoryTableProps = {
  payments: PaymentViewDto[];
};

const getProviderLabelKey = (provider: PaymentViewDto['provider']) => {
  switch (provider) {
    case 'PAYPAL':
      return 'providers.paypal';
    case 'STRIPE':
      return 'providers.stripe';
    default:
      return null;
  }
};

export const PaymentsHistoryTable = ({
  payments,
}: PaymentsHistoryTableProps) => {
  const t = useTranslations('Settings.paymentsHistory');
  const locale = useLocale();

  return (
    <div className={s.tableWrap}>
      <table className={s.table}>
        <thead>
          <tr>
            <th scope="col">{t('dateOfPayment')}</th>
            <th scope="col">{t('endDateOfSubscription')}</th>
            <th scope="col">{t('price')}</th>
            <th scope="col">{t('subscriptionType')}</th>
            <th scope="col">{t('provider')}</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => {
            const providerLabelKey = getProviderLabelKey(payment.provider);

            return (
              <tr key={`${payment.subscriptionId}-${payment.dateOfPayment}`}>
                <td>{formatCalendarDate(payment.dateOfPayment, locale)}</td>
                <td>
                  {formatCalendarDate(payment.endDateOfSubscription, locale)}
                </td>
                <td>{formatPaymentPrice(payment.price)}</td>
                <td>{payment.subscriptionType}</td>
                <td>
                  {providerLabelKey ? t(providerLabelKey) : payment.provider}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
