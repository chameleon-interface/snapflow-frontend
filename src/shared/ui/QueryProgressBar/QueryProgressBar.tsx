'use client';

import { useIsFetching, useIsMutating } from '@tanstack/react-query';

import s from './QueryProgressBar.module.css';

export const QueryProgressBar = () => {
  const isFetching = useIsFetching({
    predicate: (query) => !query.meta?.skipGlobalLoader,
  });
  const isMutating = useIsMutating();
  const isActive = isFetching + isMutating > 0;

  return (
    <div className={s.wrapper} aria-hidden={!isActive}>
      {isActive && <div className={s.bar} />}
    </div>
  );
};
