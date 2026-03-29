import type { CSSProperties } from 'react';
import { useEffect, useId } from 'react';
import { Button, Typography } from 'snapflow-ui-kit';
import { useTranslations } from 'next-intl';
import { useExpandableTextTruncation } from './hooks';
import styles from './ExpandableText.module.css';

type Props = {
  text: string;
  lines?: number;
  onExpandedChange?: (expanded: boolean) => void;
};

export const ExpandableText = ({
  text,
  lines = 3,
  onExpandedChange,
}: Props) => {
  const trimmed = text.trim();
  const t = useTranslations('ExpandableText');
  const textId = useId();
  const { textRef, isExpanded, isTruncated, handleToggle } =
    useExpandableTextTruncation({
      content: trimmed,
      lineCount: lines,
    });

  useEffect(() => {
    onExpandedChange?.(isExpanded);
  }, [isExpanded, onExpandedChange]);

  if (!trimmed) {
    return null;
  }

  const showToggle = isTruncated || isExpanded;

  return (
    <div className={styles.root}>
      <span
        id={textId}
        ref={textRef}
        className={`${styles.text} ${isExpanded ? styles.expanded : ''}`}
        style={
          {
            '--line-clamp': String(lines),
          } as CSSProperties
        }
      >
        {trimmed}
      </span>
      {showToggle && (
        <Button
          type="button"
          variant="text"
          className={styles.button}
          aria-expanded={isExpanded}
          aria-controls={textId}
          onClick={handleToggle}
        >
          <Typography variant="text-14" as="span" className={styles.buttonText}>
            {isExpanded ? t('showLess') : t('showMore')}
          </Typography>
        </Button>
      )}
    </div>
  );
};
