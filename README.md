# SnapFlow Frontend

> Документация начальная и будет обновляться по мере развития проекта.

Фронтенд SnapFlow на Next.js 16 (App Router). Проект на ранней стадии и
использует Feature-Sliced Design (FSD) для доменной структуры; роутинг Next.js
остаётся в `src/app`.

## Технологический стек

- **Фреймворк:** Next.js 16 (App Router), React 19
- **Язык:** TypeScript
- **Состояние и формы:** TanStack Query, React Hook Form
- **Качество кода:** ESLint (flat config), Prettier, Stylelint
- **Git-хуки:** Husky + lint-staged

## Структура проекта

```text
src/
  app/          Next.js routing shell (segments, layouts)
  pages-layer/  FSD-страницы (сборка UI из widgets/features)
  widgets/    крупные блоки интерфейса
  features/   пользовательские сценарии
  entities/   доменные сущности
  shared/     общие компоненты, утилиты, стили
public/       статические ассеты
```

Ключевые конфиги в корне: `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`,
`.stylelintrc.json`, `.prettierrc`.

`pages-layer` назван так, чтобы не конфликтовать с Next.js Pages Router
(`src/pages`).

## Маршруты (плейсхолдеры)

Маршруты находятся в `src/app/<route>/page.tsx` и рендерят FSD-страницы из
`src/pages-layer/<route>/ui`.

- **Auth:** `/sign-up`, `/sign-in`
- **Профиль и настройки:** `/profile`, `/settings`
- **Лента и коммуникации:** `/feed`, `/messenger`, `/search`
- **Дополнительно:** `/statistics`, `/favorites`

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

## Правила FSD

- `src/app` композирует страницы и задаёт роутинг.
- `src/pages-layer/*` импортирует из `widgets`, `features`, `entities`, `shared`.
- Нижние слои не импортируют верхние (например, `shared` → `features` запрещён).

## Роутинг и FSD

- `src/app` содержит только роуты, layout и минимальный glue-код.
- `src/pages-layer/*` хранит сборку экранов и не знает про Next.js API.
- Бизнес-логика живёт ниже: `features` и `entities`.
- Общие UI/утилиты — в `shared`.

## Заметки по разработке

- Используйте `pnpm` (см. `packageManager` в `package.json`).
- Pre-commit хуки запускают `lint-staged` для форматирования и линта
  застейдженных файлов.
