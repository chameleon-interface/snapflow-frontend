import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from 'snapflow-ui-kit/client';
import { PinIcon } from 'snapflow-ui-kit/icons';
import styles from './LocationsField.module.css';
import { LocationSuggestion, LocationSuggestions } from './LocationSuggestions';

const LOCATION_SUGGESTIONS: LocationSuggestion[] = [
  { primary: 'New York', secondary: 'Washington Square Park' },
  { primary: 'London', secondary: 'Trafalgar Square' },
  { primary: 'Paris', secondary: 'Eiffel Tower' },
  { primary: 'Tokyo', secondary: 'Shibuya Crossing' },
  { primary: 'Berlin', secondary: 'Brandenburg Gate' },
];

type Props = {
  id: string;
  value: string;
  onChange: (value: string) => void;
};

export const LocationsField = ({ id, value, onChange }: Props) => {
  const t = useTranslations('CreatePost');
  const [isListOpen, setIsListOpen] = useState(false);

  const handleSelectLocation = (primary: string, secondary: string) => {
    onChange(`${primary}, ${secondary}`);
    setIsListOpen(false);
  };

  return (
    <div className={styles.root}>
      <Input
        id={id}
        type="text"
        label={t('addLocation')}
        placeholder={t('locationPlaceholder')}
        aria-label={t('addLocation')}
        aria-autocomplete="list"
        aria-expanded={isListOpen}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsListOpen(true)}
        onClick={() => setIsListOpen(true)}
        onBlur={() => setIsListOpen(false)}
        endIcon={<PinIcon />}
        className={styles.inputWrapper}
      />
      {isListOpen && (
        <LocationSuggestions
          suggestions={LOCATION_SUGGESTIONS}
          onSelect={handleSelectLocation}
          ariaLabel={t('locationSuggestions')}
        />
      )}
    </div>
  );
};
