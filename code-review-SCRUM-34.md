# Code Review: SCRUM-34

## Ключевые findings (по приоритету)

1. **Критично: нет реальной защиты приватных маршрутов для неавторизованных пользователей**
   - `src/app/layout.tsx:44` рендерит `children` всегда.
   - `src/widgets/Sidebar/ui/Sidebar/Sidebar.tsx:12` лишь скрывает навигацию, но не ограничивает доступ к `(main)` страницам.
   - Следствие: пользователь без авторизации может открыть `/feed`, `/profile`, `/settings` по прямой ссылке.

2. **Важно: flash auth-страниц для уже авторизованного пользователя**
   - `src/app/(auth)/layout.tsx:16` редирект идёт только после получения `data`; в pending-состоянии рендерятся `children` (`src/app/(auth)/layout.tsx:26`).
   - Следствие: кратковременно видно форму `sign-in/sign-up` перед `router.replace`.

3. **Важно (a11y): иконки без текстовых/ARIA-меток**
   - `src/widgets/Sidebar/ui/BottomNav/BottomNav.tsx:19` ссылки только с иконкой, без `aria-label`.
   - `src/widgets/Header/ui/MobileMenu/MobileMenu.tsx:18` кнопка меню только с иконкой, без `aria-label`.
   - Следствие: слабая доступность для screen reader.

4. **Важно: активный пункт меню определяется только по строгому `pathname === href`**
   - `src/widgets/Sidebar/ui/NavMenu/NavMenu.tsx:16`, `src/widgets/Sidebar/ui/BottomNav/BottomNav.tsx:15`.
   - Следствие: для вложенных URL (например, `/profile/edit`) active-state не подсветится.

5. **Средний риск: `body:has(aside)` как управляющая логика layout**
   - `src/app/layout.module.css:15`.
   - Сильная связность с DOM-структурой (`aside`), ломко при будущих изменениях/добавлении других `aside`.

---

## По файлам

### `src/app/(auth)/layout.tsx`

- Что хорошо:
  - есть redirect авторизованного пользователя на `HOME`.
- Критические проблемы:
  - нет.
- Рекомендации:
  - добавить обработку pending (`isPending`) и не рендерить auth-children при активной проверке.
- Потенциальные edge cases:
  - мерцание auth-форм у пользователя с валидным токеном.

### `src/app/layout.module.css`

- Что хорошо:
  - учтён мобильный отступ под bottom nav.
- Критические проблемы:
  - нет.
- Рекомендации:
  - заменить `body:has(aside)` на явный класс/атрибут состояния layout.
- Потенциальные edge cases:
  - появление стороннего `aside` может неочевидно сдвигать `.main`.

### `src/app/layout.tsx`

- Что хорошо:
  - единая композиция Header/Sidebar/main.
- Критические проблемы:
  - приватные страницы не защищены.
- Рекомендации:
  - ввести guard для `(main)` (server redirect/middleware/layout guard).
- Потенциальные edge cases:
  - прямой переход на приватный роут без токена.

### `src/features/language-switcher/ui/LanguageSwitcher.module.css`

- Что хорошо:
  - адаптация под узкий viewport.
- Критические проблемы:
  - нет.
- Рекомендации:
  - унифицировать breakpoint через проектные токены.
- Потенциальные edge cases:
  - `border: none` может ухудшать видимость фокуса.

### `src/features/language-switcher/ui/LanguageSwitcher.tsx`

- Что хорошо:
  - мобильный режим компактного селекта.
- Критические проблемы:
  - нет.
- Рекомендации:
  - проверить доступность при `label: ''` (нужны `aria-label`/alt-метки).
- Потенциальные edge cases:
  - screen reader может хуже озвучивать варианты языка.

### `src/shared/api/useMe.ts`

- Что хорошо:
  - `retry: false`, `staleTime`, отключение запроса без токена.
- Критические проблемы:
  - нет.
- Рекомендации:
  - типизировать ответ и возвращать `response.data`; продумать реакцию на 401 (очистка токена/invalidate).
- Потенциальные edge cases:
  - состояние auth может быть устаревшим без явной реактивности на смену token.

### `src/shared/config/i18n/messages/en.json`

- Что хорошо:
  - добавлен ключ `profileSettings`.
- Критические проблемы:
  - нет.
- Рекомендации:
  - нет.
- Потенциальные edge cases:
  - нет.

### `src/shared/config/i18n/messages/ru.json`

- Что хорошо:
  - добавлен перевод `profileSettings`.
- Критические проблемы:
  - нет.
- Рекомендации:
  - нет.
- Потенциальные edge cases:
  - нет.

### `src/shared/config/index.ts`

- Что хорошо:
  - централизованный export config.
- Критические проблемы:
  - нет.
- Рекомендации:
  - нет.
- Потенциальные edge cases:
  - нет.

### `src/shared/config/navigation.tsx`

- Что хорошо:
  - централизация маршрутов через `ROUTES`, выделен `mobileNavItems`.
- Критические проблемы:
  - нет.
- Рекомендации:
  - добавить `ariaLabelKey` для icon-only mobile nav.
- Потенциальные edge cases:
  - риск рассинхрона desktop/mobile списков при дальнейших изменениях.

### `src/shared/config/routes.ts`

- Что хорошо:
  - единый source of truth для путей.
- Критические проблемы:
  - нет.
- Рекомендации:
  - нет.
- Потенциальные edge cases:
  - нет.

### `src/shared/config/storage.ts`

- Что хорошо:
  - централизован ключ токена.
- Критические проблемы:
  - нет.
- Рекомендации:
  - нет.
- Потенциальные edge cases:
  - нет.

### `src/shared/lib/hooks/index.ts`

- Что хорошо:
  - явный экспорт hook.
- Критические проблемы:
  - нет.
- Рекомендации:
  - нет.
- Потенциальные edge cases:
  - нет.

### `src/shared/lib/hooks/useMediaQuery.ts`

- Что хорошо:
  - корректный cleanup listener.
- Критические проблемы:
  - нет.
- Рекомендации:
  - добавить SSR-safe initial value стратегию, если важен anti-flicker.
- Потенциальные edge cases:
  - краткий layout shift до первого `updateMatches()`.

### `src/shared/lib/index.ts`

- Что хорошо:
  - единый вход для shared lib.
- Критические проблемы:
  - нет.
- Рекомендации:
  - нет.
- Потенциальные edge cases:
  - нет.

### `src/shared/lib/storage/hasAuthToken.ts`

- Что хорошо:
  - SSR guard через `typeof window`.
- Критические проблемы:
  - нет.
- Рекомендации:
  - добавить обработку битого/просроченного токена (если JWT).
- Потенциальные edge cases:
  - наличие токена `!=` валидная сессия.

### `src/shared/lib/storage/index.ts`

- Что хорошо:
  - изолированный export storage helper.
- Критические проблемы:
  - нет.
- Рекомендации:
  - нет.
- Потенциальные edge cases:
  - нет.

### `src/widgets/Header/model/index.ts`

- Что хорошо:
  - аккуратный re-export.
- Критические проблемы:
  - нет.
- Рекомендации:
  - нет.
- Потенциальные edge cases:
  - нет.

### `src/widgets/Header/model/useMenuItems.tsx`

- Что хорошо:
  - разделены auth/user menu, мемоизация.
- Критические проблемы:
  - нет.
- Рекомендации:
  - реализовать logout (сейчас TODO), иначе пункт меню вводит в заблуждение.
- Потенциальные edge cases:
  - пользователь нажимает `Log out`, но состояние не меняется.

### `src/widgets/Header/ui/Header.module.css`

- Что хорошо:
  - clear mobile/desktop visibility logic.
- Критические проблемы:
  - нет.
- Рекомендации:
  - объединить дублирующиеся `@media (width <= 768px)`; рассмотреть token-based spacing.
- Потенциальные edge cases:
  - нет.

### `src/widgets/Header/ui/Header.tsx`

- Что хорошо:
  - корректное разделение desktop auth buttons и mobile menu.
- Критические проблемы:
  - нет.
- Рекомендации:
  - учитывать `isPending`, чтобы убрать промежуточные мигания auth-кнопок.
- Потенциальные edge cases:
  - при медленном `/auth/me` возможен короткий показ не того состояния.

### `src/widgets/Header/ui/MobileMenu/MobileMenu.module.css`

- Что хорошо:
  - минимальная точечная стилизация.
- Критические проблемы:
  - нет.
- Рекомендации:
  - проверить `focus-visible` стиль кнопки.
- Потенциальные edge cases:
  - нет.

### `src/widgets/Header/ui/MobileMenu/MobileMenu.tsx`

- Что хорошо:
  - menu items переключаются по auth-состоянию.
- Критические проблемы:
  - нет.
- Рекомендации:
  - добавить `aria-label` для icon-only button.
- Потенциальные edge cases:
  - неработающий logout в user menu.

### `src/widgets/Sidebar/ui/BottomNav/BottomNav.module.css`

- Что хорошо:
  - safe-area, фиксированная панель, тач-ориентированные зоны.
- Критические проблемы:
  - нет.
- Рекомендации:
  - добавить `:focus-visible` стиль для keyboard users.
- Потенциальные edge cases:
  - нет текста у иконок, нужен a11y-label в TSX.

### `src/widgets/Sidebar/ui/BottomNav/BottomNav.tsx`

- Что хорошо:
  - выделение active item, семантический `nav`.
- Критические проблемы:
  - нет.
- Рекомендации:
  - добавить `aria-label`/`title` каждой ссылке; улучшить active-match для вложенных роутов.
- Потенциальные edge cases:
  - `/profile/...` не подсветит profile.

### `src/widgets/Sidebar/ui/BottomNav/index.ts`

- Что хорошо:
  - чистый barrel.
- Критические проблемы:
  - нет.
- Рекомендации:
  - нет.
- Потенциальные edge cases:
  - нет.

### `src/widgets/Sidebar/ui/NavMenu/NavMenu.module.css`

- Что хорошо:
  - добавлен active color state.
- Критические проблемы:
  - нет.
- Рекомендации:
  - проверить контраст `accent-500` относительно WCAG.
- Потенциальные edge cases:
  - нет.

### `src/widgets/Sidebar/ui/NavMenu/NavMenu.tsx`

- Что хорошо:
  - active state, client translation.
- Критические проблемы:
  - нет.
- Рекомендации:
  - улучшить матчинг active-ссылки для вложенных маршрутов.
- Потенциальные edge cases:
  - nested routes без активной подсветки.

### `src/widgets/Sidebar/ui/Sidebar/Sidebar.module.css`

- Что хорошо:
  - понятное desktop/mobile разделение.
- Критические проблемы:
  - нет.
- Рекомендации:
  - можно вынести `768px` в CSS custom property для консистентности.
- Потенциальные edge cases:
  - нет.

### `src/widgets/Sidebar/ui/Sidebar/Sidebar.tsx`

- Что хорошо:
  - sidebar/bottom-nav рендерятся только для auth пользователя.
- Критические проблемы:
  - нет.
- Рекомендации:
  - при `isError` рассмотреть явную очистку сессии и редирект на `SIGN_IN`.
- Потенциальные edge cases:
  - битый токен => пользователь остаётся на приватной странице без навигации.

---

## Общий вывод и приоритизация

### Критические к исправлению

1. Защита приватных маршрутов для неавторизованных (`src/app/layout.tsx`, отсутствие guard/middleware/layout для `(main)`).

### Важные

1. Убрать flash auth-страниц в `src/app/(auth)/layout.tsx`.
2. Исправить a11y для icon-only controls (`BottomNav`, `MobileMenu`).
3. Улучшить active-route match для вложенных путей (`NavMenu`, `BottomNav`).

### Желательные

1. Снизить связанность layout от `body:has(aside)`.
2. Унифицировать breakpoints через проектные токены (`--bp-md` и т.д.).
3. Усилить `useMe` (типизация + поведение при 401/expired token).

---

Проверки: `pnpm lint` и `pnpm stylelint` проходят. `pnpm build` не удалось завершить из-за локальной ошибки доступа к `.next` (`EPERM unlink ...app-path-routes-manifest.json`).
