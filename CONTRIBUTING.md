## Общие правила

- Используйте `pnpm` (см. `packageManager` в `package.json`).
- Соблюдайте структуру FSD слоёв.
- Держите изменения небольшими и логически цельными.
- Убедитесь, что нет ошибок линтера перед PR.

## Соглашения о коммитах

Формат:

```
<type>: <summary>
```

Примеры:

- `feat: add i18n`
- `fix: handle locale cookie`
- `docs: update i18n guide`
- `chore: add fsd boundaries lint`

Рекомендуемые типы: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`.

## Скрипты

```bash
pnpm dev           # запуск dev-сервера
pnpm build         # сборка для production
pnpm start         # запуск production-сборки
pnpm lint          # ESLint (нулевые warnings)
pnpm format:check  # проверка Prettier
pnpm format:write  # форматирование Prettier
pnpm stylelint     # линт CSS/SCSS
```

## Переводы (i18n)

Проект использует `next-intl`.

Где лежат переводы:

```
src/shared/config/i18n/messages/
  en.json
  ru.json
```

Правила:

- Добавляйте ключи в **оба** файла (`en.json` и `ru.json`).
- Храните структуру ключей одинаковой во всех языках.
- Не используйте BOM в JSON файлах.

Использование:

Client Components:

```
import { useTranslations } from 'next-intl';

const t = useTranslations('Auth');
return <button>{t('logIn')}</button>;
```

Server Components:

```
import { getTranslations } from 'next-intl/server';

const t = await getTranslations('Pages');
return <h1>{t('mainTitle')}</h1>;
```

Переключение языка делается через `LanguageSwitcher`:

- устанавливается cookie `locale`
- вызывается `router.refresh()` для обновления SSR

## Валидация форм

Валидация строится на `zod`. Базовые поля и сообщения лежат в:

```
src/shared/lib/validation/
  fields.ts        # переиспользуемые поля (email, password, username, etc.)
  patterns.ts      # regex-паттерны и тексты ошибок
  index.ts         # общий экспорт
```

Схемы форм живут рядом с фичами в `model/schema.ts`, например:

```
src/features/auth/**/model/schema.ts
```

Если нужна проверка на одноразовые почтовые домены — используется список
`disposable-email-domains` в `patterns.ts` (обновляется через `pnpm`).

## FSD правила

- `shared` не импортирует верхние слои.
- `entities` может импортировать только `shared` и `entities`.
- `features` может импортировать `shared`, `entities`, `features`.
- `widgets` может импортировать `shared`, `entities`, `features`, `widgets`.
- `pages-layer` может импортировать `shared`, `entities`, `features`, `widgets`, `pages-layer`.
- `app` может импортировать все слои.

ESLint проверяет эти границы через `eslint-plugin-boundaries`.
