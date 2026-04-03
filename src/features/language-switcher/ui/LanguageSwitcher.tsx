'use client';

import { Select } from 'snapflow-ui-kit/client';
import { useRouter } from 'next/navigation';
import { useLang, LANG_OPTIONS } from '@/entities/language';
import { useMediaQuery } from '@/shared/lib/hooks';
import s from './LanguageSwitcher.module.css';

export const LanguageSwitcher = () => {
  const [lang, setLang] = useLang();
  const router = useRouter();
  const isMobile = useMediaQuery(610);

  const handleChange = (value: string) => {
    setLang(value as typeof lang);
    router.refresh();
  };

  const options = isMobile
    ? LANG_OPTIONS.map((opt) => ({ ...opt, label: '' }))
    : LANG_OPTIONS;

  return (
    <Select
      options={options}
      value={lang}
      onChange={handleChange}
      className={s.switcher}
    />
  );
};
