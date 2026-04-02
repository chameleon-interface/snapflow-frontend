'use client';

import { useTranslations } from 'next-intl';
import type { SVGProps } from 'react';
import { Typography } from 'snapflow-ui-kit';
import s from './SocialListModal.module.css';

function MobileBackArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19 12H8M8 12l4.5-4.5M8 12l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = {
  visible: boolean;
  showTabs: boolean;
  mobileProfileTitle?: string;
  mobileCenterTitle: string;
  profileTab: 'following' | 'followers';
  onProfileTabChange: (tab: 'following' | 'followers') => void;
  followingCount: number;
  followersCount: number;
  onClose: () => void;
};

export function SocialListModalMobileChrome({
  visible,
  showTabs,
  mobileProfileTitle,
  mobileCenterTitle,
  profileTab,
  onProfileTabChange,
  followingCount,
  followersCount,
  onClose,
}: Props) {
  const t = useTranslations('Modals.SocialList');

  if (!visible) return null;

  return (
    <>
      <div className={s.mobileChrome}>
        <button
          type="button"
          className={s.mobileBack}
          onClick={onClose}
          aria-label={t('backAria')}
        >
          <MobileBackArrow aria-hidden className={s.mobileBackIcon} />
        </button>
        <div className={s.mobileTitleWrap}>
          {showTabs ? (
            <Typography variant="text-16" className={s.mobileProfileName}>
              {mobileProfileTitle}
            </Typography>
          ) : (
            <p className={s.mobileHeaderTitle}>{mobileCenterTitle}</p>
          )}
        </div>
        <div className={s.mobileHeaderSpacer} aria-hidden />
      </div>

      {showTabs && (
        <div className={s.mobileTabs} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={profileTab === 'following'}
            className={s.mobileTab}
            data-active={profileTab === 'following' ? '' : undefined}
            onClick={() => onProfileTabChange('following')}
          >
            {t('followingTitle', { count: followingCount })}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={profileTab === 'followers'}
            className={s.mobileTab}
            data-active={profileTab === 'followers' ? '' : undefined}
            onClick={() => onProfileTabChange('followers')}
          >
            {t('followersTitle', { count: followersCount })}
          </button>
        </div>
      )}
    </>
  );
}
