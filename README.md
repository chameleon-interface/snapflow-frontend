# SnapFlow Frontend

> Документация начальная и будет обновляться по мере развития проекта.

Фронтенд SnapFlow на Next.js 16 (App Router). Проект на ранней стадии и
использует Feature-Sliced Design (FSD) для доменной структуры; роутинг Next.js
остаётся в `src/app`.

## Быстрый старт

```bash
pnpm install
pnpm dev
```

Приложение будет доступно на `http://localhost:3000`.

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
