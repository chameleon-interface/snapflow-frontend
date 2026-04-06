'use client';

import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';
import { UserAvatar } from '@/shared/ui';

type Props = {
  avatarUrl: string | null;
  username: string;
};

export function ProfileAvatar({ avatarUrl, username }: Props) {
  const isCompact = useMediaQuery(1024);

  return (
    <UserAvatar
      avatarUrl={avatarUrl}
      username={username}
      size={isCompact ? 160 : 204}
    />
  );
}
