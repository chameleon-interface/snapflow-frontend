'use client';

import { useEffect, type RefObject } from 'react';

type UseNotificationsPopoverParams = {
  isOpen: boolean;
  onClose: () => void;
  wrapperRef: RefObject<HTMLDivElement | null>;
};

export const useNotificationsPopover = ({
  isOpen,
  onClose,
  wrapperRef,
}: UseNotificationsPopoverParams) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (wrapperRef.current?.contains(target)) {
        return;
      }

      onClose();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }

      onClose();
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, wrapperRef]);
};
