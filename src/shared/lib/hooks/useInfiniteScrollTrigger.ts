import { useEffect, useRef } from 'react';

type Params = {
  enabled: boolean;
  onIntersect: () => unknown | Promise<unknown>;
  rootMargin?: string;
};

/**
 * Хук для запуска callback, когда sentinel-элемент попадает в область видимости.
 * Подходит для infinite scroll и ленивой подгрузки следующей порции данных.
 *
 * @param enabled - Включает или отключает наблюдение за элементом
 * @param onIntersect - Вызывается при пересечении элемента с viewport
 * @param rootMargin - Отступ для срабатывания observer до фактического появления элемента
 * @returns Ref, который нужно повесить на sentinel-элемент в конце списка
 */
export const useInfiniteScrollTrigger = ({
  enabled,
  onIntersect,
  rootMargin = '300px 0px',
}: Params) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const onIntersectRef = useRef(onIntersect);

  useEffect(() => {
    onIntersectRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    const node = targetRef.current;

    if (!node || !enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void onIntersectRef.current();
        }
      },
      { rootMargin },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [enabled, rootMargin]);

  return targetRef;
};
