const MS_SECOND = 1000;
const MS_MINUTE = 60 * MS_SECOND;
const MS_HOUR = 60 * MS_MINUTE;
const MS_DAY = 24 * MS_HOUR;

// До 7 полных суток — в «N дней назад»; с 7 до 29 — в неделях
const DAYS_BEFORE_WEEKS = 7;
// С 30 полных суток — только короткая дата, не относительная строка
const DAYS_BEFORE_ABSOLUTE = 30;

/**
 * Компактная календарная дата без «назад»: число + короткий месяц.
 * Если год у `date` совпадает с годом `now` — год в строку не попадает (не дублируем текущий год).
 *
 * @example `locale: 'ru'`, `date` 28 марта 2026, `now` в 2026 → «28 мар.» (точный вид — по ICU).
 * @example та же `date`, `now` в 2027 → «28 мар. 2026 г.» или аналог с годом.
 */
const getShortAbsolute = (date: Date, locale: string, now: Date): string => {
  const isSameYear = date.getFullYear() === now.getFullYear();

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    ...(isSameYear ? {} : { year: 'numeric' }),
  }).format(date);
};

/**
 * Развёрнутая дата и краткое время в одной строке (`dateStyle: 'full'`, `timeStyle: 'short'`).
 * Удобно для `title`, `aria-label`, подсказки при наведении.
 *
 * @example `locale: 'ru'` → «суббота, 28 марта 2026 г. в 14:32» (точный вид — по ICU).
 */
const getFullTitle = (date: Date, locale: string): string =>
  new Intl.DateTimeFormat(locale, {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date);

/**
 * Полная дата + краткое время для подсказки / a11y (см. `getFullTitle`).
 * Невалидный `isoDate` → пустая строка.
 */
export const formatFullDateTimeTitle = (
  isoDate: string,
  locale: string,
): string => {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return getFullTitle(date, locale);
};

export type FormatRelativePostDateResult = {
  /**
   * Текст в UI: относительно («5 минут назад») или как `getShortAbsolute` («28 мар.»).
   */
  display: string;
  /**
   * Развёрнутая дата+время — см. `getFullTitle`.
   * @example «суббота, 28 марта 2026 г. в 14:32»
   */
  title: string;
};

/**
 * Относительная строка для UI: сек → мин → ч → дни (<7) → недели (<30 суток) → короткая дата.
 * Если `date` позже `now` (отрицательный diff) — короткая дата, не «через …».
 *
 * Примеры `display` при `locale: 'ru'` (ориентир):
 * | Интервал от `now` | Пример `display` |
 * |-------------------|------------------|
 * | < 1 мин           | «только что», «30 секунд назад», … |
 * | < 1 ч             | «22 минуты назад» |
 * | < 1 суток         | «3 часа назад» |
 * | 1–6 полных суток  | «2 дня назад» |
 * | 7–29 полных суток | «1 неделю назад», «2 недели назад», … |
 * | ≥ 30 суток        | «28 февр.» (как короткая дата) |
 * | `date` в будущем  | короткая дата, не «через …» |
 *
 * Невалидный `isoDate`: `{ display: '', title: '' }`.
 *
 * @param now — опорная «сейчас» (удобно для тестов и SSR с фиксированным временем)
 */
export const formatRelativePostDate = (
  isoDate: string,
  locale: string,
  now: Date = new Date(),
): FormatRelativePostDateResult => {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return { display: '', title: '' };
  }

  const title = getFullTitle(date, locale);
  const diffMs = now.getTime() - date.getTime();

  if (diffMs < 0) {
    return { display: getShortAbsolute(date, locale, now), title };
  }

  const dayCount = Math.floor(diffMs / MS_DAY);

  if (dayCount >= DAYS_BEFORE_ABSOLUTE) {
    return { display: getShortAbsolute(date, locale, now), title };
  }

  // Отрицательное значение — «в прошлом» для Intl
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffMs < MS_MINUTE) {
    const seconds = Math.floor(diffMs / MS_SECOND);

    return {
      display: rtf.format(-Math.max(seconds, 0), 'second'),
      title,
    };
  }

  if (diffMs < MS_HOUR) {
    return {
      display: rtf.format(-Math.floor(diffMs / MS_MINUTE), 'minute'),
      title,
    };
  }

  if (diffMs < MS_DAY) {
    return {
      display: rtf.format(-Math.floor(diffMs / MS_HOUR), 'hour'),
      title,
    };
  }

  if (dayCount < DAYS_BEFORE_WEEKS) {
    return {
      display: rtf.format(-dayCount, 'day'),
      title,
    };
  }

  const weeks = Math.max(1, Math.floor(dayCount / 7));

  return {
    display: rtf.format(-weeks, 'week'),
    title,
  };
};

/**
 * Только короткая календарная дата — для стабильного первого кадра (гидрация / SSR).
 *
 * @example `ru`, тот же календарный год, что у `now` → «28 мар.»; невалидная строка → пустая строка.
 */
export const formatShortPostDate = (
  isoDate: string,
  locale: string,
  now: Date = new Date(),
): string => {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return getShortAbsolute(date, locale, now);
};
