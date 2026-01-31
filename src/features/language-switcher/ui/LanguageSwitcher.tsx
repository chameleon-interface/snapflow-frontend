'use client';

import { Select } from 'snapflow-ui-kit';
import { useLang, LANG_OPTIONS } from '@/entities/language';
import s from './LanguageSwitcher.module.css';

export const LanguageSwitcher = () => {
  const [lang, setLang] = useLang();

  return (
    <Select
      options={LANG_OPTIONS}
      value={lang}
      onChange={setLang}
      className={s.switcher}
    />
  );
};
