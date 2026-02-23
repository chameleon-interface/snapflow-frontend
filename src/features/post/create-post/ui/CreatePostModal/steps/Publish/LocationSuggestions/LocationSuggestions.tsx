'use client';

import styles from './LocationSuggestions.module.css';

export type LocationSuggestion = { primary: string; secondary: string };

type Props = {
  suggestions: LocationSuggestion[];
  onSelect: (primary: string, secondary: string) => void;
  ariaLabel: string;
};

export const LocationSuggestions = ({
  suggestions,
  onSelect,
  ariaLabel,
}: Props) => (
  <div className={styles.suggestions} role="listbox" aria-label={ariaLabel}>
    {suggestions.map(({ primary, secondary }) => (
      <button
        key={`${primary}-${secondary}`}
        type="button"
        className={styles.suggestion}
        role="option"
        tabIndex={0}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => onSelect(primary, secondary)}
        aria-label={`${primary}, ${secondary}`}
      >
        <span className={styles.suggestionPrimary}>{primary}</span>
        <span className={styles.suggestionSecondary}>{secondary}</span>
      </button>
    ))}
  </div>
);
