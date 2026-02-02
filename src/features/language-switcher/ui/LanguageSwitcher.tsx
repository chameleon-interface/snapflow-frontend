'use client';

import { Select } from 'snapflow-ui-kit/client';
import { useRouter } from 'next/navigation';
import { useLang, LANG_OPTIONS } from '@/entities/language';
import s from './LanguageSwitcher.module.css';

export const LanguageSwitcher = () => {
  const [lang, setLang] = useLang();
  const router = useRouter();

  const handleChange = (value: string) => {
    setLang(value as typeof lang);
    router.refresh();
  };

  return (
    <Select
      options={LANG_OPTIONS}
      value={lang}
      onChange={handleChange}
      className={s.switcher}
    />
  );
};
