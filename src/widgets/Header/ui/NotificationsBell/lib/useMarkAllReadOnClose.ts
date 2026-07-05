'use client';

import { useEffect, useRef } from 'react';

export const useMarkAllReadOnClose = (
  isOpen: boolean,
  markAllRead: () => void,
) => {
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      return;
    }

    if (!wasOpenRef.current) {
      return;
    }

    wasOpenRef.current = false;
    markAllRead();
  }, [isOpen, markAllRead]);
};
