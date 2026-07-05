'use client';

import { useEffect } from 'react';

export const useMarkAllReadOnOpen = (
  isOpen: boolean,
  markAllRead: () => void,
) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    markAllRead();
  }, [isOpen, markAllRead]);
};
