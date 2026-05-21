import { useTranslations } from 'next-intl';
import type { PaymentViewDto } from '@/shared/api/generated/model/payments';
import { formatPaymentDate } from '../../lib/formatPaymentDate';
import { formatPaymentPrice } from '../../lib/formatPaymentPrice';
import s from './PaymentsHistoryTable.module.css';

type PaymentsHistoryTableProps = {
  payments: PaymentViewDto[];
};

export const PaymentsHistoryTable = ({
  payments,
}: PaymentsHistoryTableProps) => {
  const t = useTranslations('Settings.paymentsHistory');

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
          {payments.map((payment) => (
            <tr key={`${payment.subscriptionId}-${payment.dateOfPayment}`}>
              <td>{formatPaymentDate(payment.dateOfPayment)}</td>
              <td>{formatPaymentDate(payment.endDateOfSubscription)}</td>
              <td>{formatPaymentPrice(payment.price)}</td>
              <td>{payment.subscriptionType}</td>
              <td>{payment.provider}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
