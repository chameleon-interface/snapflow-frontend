import { useTranslations } from 'next-intl';
import { Radio, Typography } from 'snapflow-ui-kit';
import s from '../AccountManagementPanel/AccountManagementPanel.module.css';

type AccountType = 'personal' | 'business';

type AccountTypeSelectorProps = {
  accountType: AccountType;
  onPersonalSelect: () => void;
  onBusinessSelect: () => void;
};

export const AccountTypeSelector = ({
  accountType,
  onPersonalSelect,
  onBusinessSelect,
}: AccountTypeSelectorProps) => {
  const t = useTranslations('Settings.accountManagement');

  return (
    <div className={s.section}>
      <Typography as="h3" variant="text-14-bold" className={s.sectionTitle}>
        {t('accountType')}
      </Typography>

      <div className={s.optionGroup}>
        <Radio
          name="accountType"
          value="personal"
          checked={accountType === 'personal'}
          className={s.option}
          onChange={onPersonalSelect}
        >
          {t('personal')}
        </Radio>

        <Radio
          name="accountType"
          value="business"
          checked={accountType === 'business'}
          className={s.option}
          onChange={onBusinessSelect}
        >
          {t('business')}
        </Radio>
      </div>
    </div>
  );
};
