# Mock Server

Локальный mock API для фронтенда на базе `json-server`.

## Быстрый запуск

1. Перейти в директорию сервера:

```bash
cd mock-server
```

2. Установить зависимости:

```bash
pnpm install --ignore-workspace
```

3. Запустить сервер:

```bash
pnpm start
```

После запуска API доступен по адресу: `http://localhost:3001`.

### Запуск с задержкой ответов

Сервер поддерживает переменную `MOCK_DELAY_MS` (в миллисекундах).

Пример для `bash`:

```bash
MOCK_DELAY_MS=1000 pnpm start
```

Пример для `PowerShell`:

```powershell
$env:MOCK_DELAY_MS=1000; pnpm start
```

Чтобы вернуть обычный режим без задержки:

```powershell
Remove-Item Env:MOCK_DELAY_MS
```

### Настройка роста users count

Переменная `MOCK_USERS_COUNT_INTERVAL_MS` задает интервал обновления счетчика пользователей.

По умолчанию: `20000` (20 секунд).

Пример для `bash`:

```bash
MOCK_USERS_COUNT_INTERVAL_MS=5000 pnpm start
```

Пример для `PowerShell`:

```powershell
$env:MOCK_USERS_COUNT_INTERVAL_MS=5000; pnpm start
```

## Структура данных

### `Profile` (TypeScript)

```ts
type Profile = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO date string, example: "1996-04-12"
  country: string;
  city: string;
  avatar: string;
  about: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
};
```

Пример объекта:

```json
{
  "id": 1,
  "username": "alex.smith",
  "firstName": "Alex",
  "lastName": "Smith",
  "dateOfBirth": "1996-04-12",
  "country": "USA",
  "city": "San Francisco",
  "avatar": "https://i.pravatar.cc/150?img=12",
  "about": "Frontend engineer, coffee lover, and street photography enthusiast.",
  "followersCount": 1840,
  "followingCount": 321,
  "postsCount": 3
}
```

### `Post` (TypeScript)

```ts
type Post = {
  id: number;
  profileId: number;
  /** Массив URL фото (1–10). Старые посты в posts.json могут иметь поле photo (одно фото). */
  photos: string[];
  description: string;
};
```

Пример объекта (новый формат):

```json
{
  "id": 1,
  "profileId": 45,
  "photos": ["http://localhost:3001/uploads/post-1700000000000-123456789.jpg"],
  "description": "Early morning walk before work. The city is quiet and beautiful."
}
```

## Эндпоинты

Базовый URL: `http://localhost:3001`

### Stats

#### `GET /stats/users-count`

Возвращает текущее количество пользователей в mock-сервере.
Значение автоматически увеличивается на случайное число от `1` до `20`
каждые `MOCK_USERS_COUNT_INTERVAL_MS` миллисекунд (по умолчанию раз в 20 секунд).

Пример ответа `200`:

```json
{
  "usersCount": 2,
  "increasesEveryMs": 20000
}
```

### Posts (CRUD)

#### Модель `Post`

```json
{
  "id": 6,
  "profileId": 45,
  "photos": ["http://localhost:3001/uploads/post-1771505821823-500771166.jpg"],
  "description": "New mock post"
}
```

Поля:
- `id` - number, генерируется сервером
- `profileId` - number, id профиля автора
- `photos` - string[], массив URL фото (1–10) в `/uploads`
- `description` - string

#### `GET /posts`

Возвращает массив постов.

Пример ответа `200`:

```json
[
  {
    "id": 1,
    "profileId": 45,
    "photos": ["http://localhost:3001/uploads/post-1.jpg"],
    "description": "Post 1"
  }
]
```

#### `GET /posts/:id`

Возвращает один пост по id.

Пример:
- `GET /posts/1` -> `200` + объект поста
- `GET /posts/999999` -> `404`

#### `GET /posts?profileId=<id>`

Фильтрует посты по автору.

Пример:
- `GET /posts?profileId=45` -> `200` + массив постов профиля `45`

#### `POST /posts`

Создает пост с загрузкой от 1 до 10 фото.

Что принимает:
- `Content-Type`: только `multipart/form-data`
- поля формы:
  - `profileId` (required, number)
  - `description` (required, string)
  - `photoFile` (required, от 1 до 10 image files — одно и то же имя поля, несколько файлов)

Ограничения:
- только изображения (`image/*`)
- размер каждого файла до `20MB`
- количество файлов: от 1 до 10

Пример запроса (axios):

```ts
import axios from 'axios';

const formData = new FormData();
formData.append('profileId', '45');
formData.append('description', 'New mock post with uploaded file');
photos.forEach((file) => formData.append('photoFile', file));

const { data } = await axios.post('http://localhost:3001/posts', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
```

Пример ответа `201`:

```json
{
  "id": 6,
  "profileId": 45,
  "photos": [
    "http://localhost:3001/uploads/post-1771505821823-500771166.jpg",
    "http://localhost:3001/uploads/post-1771505821824-500771167.jpg"
  ],
  "description": "New mock post with uploaded file"
}
```

Ошибки:
- `415` если отправлен не `multipart/form-data`
- `400` если нет `photoFile` / не 1–10 файлов / невалидный файл / превышен лимит

#### `PUT /posts/:id`

Полностью обновляет пост.

Что принимает:
- `Content-Type: application/json`
- тело:

```json
{
  "id": 6,
  "profileId": 45,
  "photos": ["http://localhost:3001/uploads/post-1771505821823-500771166.jpg"],
  "description": "Updated description"
}
```

Пример ответа `200`:
- обновленный объект поста

#### `DELETE /posts/:id`

Удаляет пост по id.

Пример:
- `DELETE /posts/6` -> `200` (или `204`, в зависимости от клиента)

### Profiles

- `GET /profiles` - получить список профилей
- `GET /profiles/:id` - получить профиль по `id`

#### `PUT /profiles/:id`

Редактирует поля профиля.

Что принимает:
- `Content-Type: application/json`
- можно передавать любые поля из списка:
  - `username`
  - `firstName`
  - `lastName`
  - `dateOfBirth`
  - `country`
  - `city`
  - `about`
  - `followersCount`
  - `followingCount`
  - `postsCount`

Пример запроса (axios):

```ts
import axios from 'axios';

const { data } = await axios.put('http://localhost:3001/profiles/45', {
  firstName: 'Maria',
  lastName: 'Rivera',
  city: 'Madrid',
  about: 'Updated bio',
});
```

Пример ответа `200`:
- обновленный объект профиля

Ошибки:
- `400` если `id` некорректный или не переданы редактируемые поля
- `404` если профиль не найден

#### `PUT /profiles/:id/avatar`

Отдельный запрос для установки аватара.

Что принимает:
- `Content-Type`: только `multipart/form-data`
- поле файла: `avatarFile` (required, image)

Пример запроса (axios):

```ts
import axios from 'axios';

const formData = new FormData();
formData.append('avatarFile', fileInput.files[0]);

const { data } = await axios.put(
  'http://localhost:3001/profiles/45/avatar',
  formData,
  {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
);
```

Пример ответа `200`:
- обновленный объект профиля с новым `avatar`

Ошибки:
- `415` если отправлен не `multipart/form-data`
- `400` если не передан `avatarFile` или файл не image/слишком большой
- `404` если профиль не найден

## Примечания

- Загруженные файлы доступны по пути `/uploads/<filename>`.
- Сервер слушает порт `3001`, чтобы не конфликтовать с Next.js dev server (`3000`).
