'use client';

import type { CSSProperties, HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import s from './Skeleton.module.css';

type Props = HTMLAttributes<HTMLDivElement> & {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  radius?: CSSProperties['borderRadius'];
  variant?: 'shimmer' | 'pulse' | 'wave';
};

export const Skeleton = ({
  className,
  width,
  height,
  radius,
  variant = 'shimmer',
  style,
  ...rest
}: Props) => {
  return (
    <div
      className={clsx(
        s.skeleton,
        variant === 'shimmer' && s.shimmer,
        variant === 'pulse' && s.pulse,
        variant === 'wave' && s.wave,
        className,
      )}
      style={
        {
          width,
          height,
          ...(radius != null
            ? { ['--skeleton-radius' as string]: radius }
            : {}),
          ...style,
        } as CSSProperties
      }
      aria-hidden="true"
      {...rest}
    />
  );
};
