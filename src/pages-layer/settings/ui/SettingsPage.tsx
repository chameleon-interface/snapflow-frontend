'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Tab, Typography } from 'snapflow-ui-kit';
import { AccountManagementPanel } from '@/features/settings/account-management';
import { ProfileInfoForm } from '@/features/settings/profile-info';
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

    if (part === 'subscriptions') {
      return <AccountManagementPanel />;
    }

    return (
      <section className={s.stub}>
        <Typography as="h2" variant="h2">
          {t(`stubs.${part}.title`)}
        </Typography>
        <Typography as="p" variant="text-14" className={s.stubText}>
          {t(`stubs.${part}.description`)}
        </Typography>
      </section>
    );
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
