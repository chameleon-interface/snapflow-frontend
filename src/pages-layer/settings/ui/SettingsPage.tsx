'use client';

import { AccountManagementPanel } from '@/features/settings/account-management';
import { Devices } from '@/features/settings/devices/ui';
import { PaymentsHistoryPanel } from '@/features/settings/payments-history';
import { ProfileInfoForm } from '@/features/settings/profile-info';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { Tab } from 'snapflow-ui-kit';
import { buildSettingsUrl, SETTINGS_PARTS, SettingsPart } from '../model';
import s from './SettingsPage.module.css';

type SettingsPageProps = {
  part: SettingsPart;
};

export function SettingsPage({ part }: SettingsPageProps) {
  const t = useTranslations('Settings');
  const router = useRouter();

  const tabs = useMemo(
    () => SETTINGS_PARTS.map((tab) => ({ key: tab, label: t(`tabs.${tab}`) })),
    [t],
  );

  const handleTabChange = (nextPart: SettingsPart) => {
    if (nextPart === part) {
      return;
    }

    router.replace(buildSettingsUrl(nextPart));
  };

  const renderTabContent = () => {
    if (part === 'info') {
      return <ProfileInfoForm />;
    }

    if (part === 'devices') {
      return <Devices />;
    }

    if (part === 'subscriptions') {
      return <AccountManagementPanel />;
    }

    if (part === 'payments') {
      return <PaymentsHistoryPanel />;
    }

    return null;
  };

  return (
    <section className={s.page}>
      <nav className={s.tabs} aria-label={t('tabsAria')}>
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            selected={part === tab.key}
            className={s.tab}
            onClick={() => handleTabChange(tab.key)}
          >
            {tab.label}
          </Tab>
        ))}
      </nav>

      <div className={s.content}>{renderTabContent()}</div>
    </section>
  );
}
