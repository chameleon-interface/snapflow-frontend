'use client';

import { useState } from 'react';

type Variant = 'likes' | 'following' | 'followers';
type ProfileTab = 'following' | 'followers';

type Params = {
  variant: Variant;
  showProfileTabs: boolean;
};

type UseSocialListUIStateResult = {
  search: string;
  setSearch: (value: string) => void;
  profileTab: ProfileTab;
  setProfileTabOverride: (value: ProfileTab | null) => void;
  listKind: Variant;
  resetUI: () => void;
};

export function useSocialListUIState({
  variant,
  showProfileTabs,
}: Params): UseSocialListUIStateResult {
  const [search, setSearch] = useState('');
  const [profileTabOverride, setProfileTabOverride] =
    useState<ProfileTab | null>(null);

  const profileTab =
    profileTabOverride ?? (variant === 'followers' ? 'followers' : 'following');

  const listKind: Variant =
    variant === 'likes' ? 'likes' : showProfileTabs ? profileTab : variant;

  const resetUI = () => {
    setSearch('');
    setProfileTabOverride(null);
  };

  return {
    search,
    setSearch,
    profileTab,
    setProfileTabOverride,
    listKind,
    resetUI,
  };
}
