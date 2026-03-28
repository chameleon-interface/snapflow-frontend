'use client';

import { useEffect, useRef, useState } from 'react';

type FetchResult<T> = {
  data: T[];
  total: number;
};

export function useInfiniteScroll<T>(
  fetcher: (page: number) => Promise<FetchResult<T>>,
  limit: number,
) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const totalRef = useRef<number | null>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    totalRef.current = null;
  }, [fetcher]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (isFetchingRef.current || !hasMore) return;

      isFetchingRef.current = true;
      setLoading(true);

      try {
        const res = await fetcher(page);

        if (cancelled) return;

        totalRef.current = res.total;

        setItems((prev) => [...prev, ...res.data]);

        // const loadedItems = page * limit;
        // if (loadedItems >= res.total) {
        //   setHasMore(false);
        // }

        if (res.data.length < limit) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Infinite scroll error:', error);
      } finally {
        if (!cancelled) {
          setLoading(false);
          isFetchingRef.current = false;
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [page, fetcher, limit, hasMore]);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !isFetchingRef.current) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 },
    );

    const current = observerRef.current;

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, [hasMore, loading]);

  return { items, hasMore, loading, observerRef };
}
