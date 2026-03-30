'use client';

import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './EmptyStateMessage.module.css';

type Props = {
  children: ReactNode;
  className?: string;
};

export const EmptyStateMessage = ({ children, className }: Props) => {
  return (
    <div className={clsx(styles.root, className)} role="status">
      {children}
    </div>
  );
};
