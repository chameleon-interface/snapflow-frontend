import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

type Params = {
  content: string;
  lineCount: number;
};

/**
 * Состояние «свёрнуто / развёрнуто» и флаг «текст реально обрезан clamp’ом».
 * Обрезка в DOM задаётся снаружи (CSS); здесь только измерение и побочные эффекты.
 */
export const useExpandableTextTruncation = ({ content, lineCount }: Params) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  /** true, если в свёрнутом виде scrollHeight > clientHeight (есть скрытый хвост). */
  const [isTruncated, setIsTruncated] = useState(false);

  const measureTruncation = useCallback(() => {
    const el = textRef.current;
    // В развёрнутом виде clamp снят — высоты не отражают «нужна ли кнопка», не перетираем isTruncated.
    if (!el || isExpanded) {
      return;
    }
    setIsTruncated(el.scrollHeight > el.clientHeight);
  }, [isExpanded]);

  // После коммита в DOM, до paint — чтобы кнопка не мигала на кадр с неверным состоянием.
  useLayoutEffect(() => {
    measureTruncation();
  }, [measureTruncation, content, lineCount]);

  // Смена ширины контейнера (ресайз окна, layout) меняет, влезает ли текст в N строк.
  useEffect(() => {
    const el = textRef.current;
    if (!el) {
      return;
    }
    const observer = new ResizeObserver(() => {
      measureTruncation();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [measureTruncation]);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return {
    textRef,
    isExpanded,
    isTruncated,
    handleToggle,
  };
};
