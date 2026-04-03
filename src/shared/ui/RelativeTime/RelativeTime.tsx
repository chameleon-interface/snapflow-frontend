'use client';

import {
  formatFullDateTimeTitle,
  formatRelativePostDate,
  formatShortPostDate,
} from '@/shared/lib';
import { Typography } from 'snapflow-ui-kit/client';
import { useLocale } from 'next-intl';
import { useMemo, useSyncExternalStore } from 'react';

type Props = {
  isoDate: string;
  className?: string;
};

const subscribeToNothing = () => () => {};

export const RelativeTime = ({ isoDate, className }: Props) => {
  const locale = useLocale();
  const isClient = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  const { display, title } = useMemo(() => {
    if (!isClient) {
      return {
        display: formatShortPostDate(isoDate, locale),
        title: formatFullDateTimeTitle(isoDate, locale),
      };
    }

    return formatRelativePostDate(isoDate, locale, new Date());
  }, [isClient, isoDate, locale]);

  if (!display) {
    return null;
  }

  return (
    <Typography
      as="time"
      variant="small"
      className={className}
      dateTime={isoDate}
      title={title}
      aria-label={title}
    >
      {display}
    </Typography>
  );
};
