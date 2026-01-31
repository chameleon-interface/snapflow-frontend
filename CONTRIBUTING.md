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

## FSD правила

- `shared` не импортирует верхние слои.
- `entities` может импортировать только `shared` и `entities`.
- `features` может импортировать `shared`, `entities`, `features`.
- `widgets` может импортировать `shared`, `entities`, `features`, `widgets`.
- `pages-layer` может импортировать `shared`, `entities`, `features`, `widgets`, `pages-layer`.
- `app` может импортировать все слои.

ESLint проверяет эти границы через `eslint-plugin-boundaries`.
