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
pnpm api:docs      # обновление локального Swagger/OpenAPI-файла core API
pnpm api:docs:payments # обновление локального Swagger/OpenAPI-файла payments API
pnpm api:generate  # генерация API-клиентов и типов через Orval
```

## API / Swagger

Проект использует OpenAPI/Swagger для описания backend API и Orval для генерации API-клиентов и типов.

Локальные Swagger/OpenAPI-файлы хранятся по сервисам:

```bash
docs/core/openapi.json
docs/payments/openapi.json
```

Источники Swagger:

```bash
Core: https://stage.snapflow.cc/api/v1/docs-json
Payments: https://stage.payments.snapflow.cc/api/v1/docs-json
```

Перед началом работы с API обновите нужный локальный Swagger:

```bash
pnpm api:docs            # core
pnpm api:docs:payments   # payments
```

Orval генерирует API-клиенты напрямую из Swagger URL, настроенных в `orval.config.ts`.
Локальные файлы в `docs/*/openapi.json` нужны как reference-контракты для разработки и ревью.

После изменения Swagger сгенерируйте API-клиенты и типы:

```bash
pnpm api:generate
```

Обычный порядок работы для обновления всех локальных контрактов и generated-кода:

```bash
pnpm api:docs
pnpm api:docs:payments
pnpm api:generate
```

Проверить изменения в Swagger:

```bash
git diff docs/core/openapi.json
git diff docs/payments/openapi.json
```

Сгенерированный API-код разделён по сервисам:

```bash
src/shared/api/generated/endpoints/core
src/shared/api/generated/endpoints/payments
src/shared/api/generated/model/core
src/shared/api/generated/model/payments
```

Для запросов используются общий axios instance и generated mutators:

```bash
src/shared/api/instance.ts
src/shared/api/generated/mutator/custom-instance.ts
src/shared/api/generated/mutator/payments-instance.ts
```

Core API использует `NEXT_PUBLIC_API_URL`.
Payments API использует `NEXT_PUBLIC_PAYMENTS_API_URL`.

Правила:

- Не пишите API-запрос вручную, если нужная generated function уже существует.
- Не придумывайте endpoints, DTO, request params или response types вручную.
- Если backend изменил Swagger, сначала обновите соответствующий `docs/*/openapi.json`, затем запустите `pnpm api:generate`.
- Если Swagger конфликтует с текущим frontend-кодом, сначала зафиксируйте расхождение, потом меняйте код.

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
