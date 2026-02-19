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

## Структура данных

### `Profile`

```json
{
  "id": 1,
  "username": "alex.smith",
  "avatar": "https://i.pravatar.cc/150?img=12",
  "about": "Frontend engineer, coffee lover, and street photography enthusiast.",
  "followersCount": 1840,
  "followingCount": 321,
  "postsCount": 3
}
```

### `Post`

```json
{
  "id": 1,
  "profileId": 45,
  "photo": "http://localhost:3001/uploads/post-1700000000000-123456789.jpg",
  "description": "Early morning walk before work. The city is quiet and beautiful."
}
```

## Эндпоинты

Базовый URL: `http://localhost:3001`

### Posts (CRUD)

#### Модель `Post`

```json
{
  "id": 6,
  "profileId": 45,
  "photo": "http://localhost:3001/uploads/post-1771505821823-500771166.jpg",
  "description": "New mock post"
}
```

Поля:
- `id` - number, генерируется сервером
- `profileId` - number, id профиля автора
- `photo` - string, URL сохраненного файла в `/uploads`
- `description` - string

#### `GET /posts`

Возвращает массив постов.

Пример ответа `200`:

```json
[
  {
    "id": 1,
    "profileId": 45,
    "photo": "http://localhost:3001/uploads/post-1.jpg",
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

Создает пост с загрузкой файла.

Что принимает:
- `Content-Type`: только `multipart/form-data`
- поля формы:
  - `profileId` (required, number)
  - `description` (required, string)
  - `photoFile` (required, image file)

Ограничения:
- только изображения (`image/*`)
- размер файла до `20MB`

Пример запроса:

```bash
curl -X POST http://localhost:3001/posts \
  -F "profileId=45" \
  -F "description=New mock post with uploaded file" \
  -F "photoFile=@./my-photo.jpg"
```

Пример ответа `201`:

```json
{
  "id": 6,
  "profileId": 45,
  "photo": "http://localhost:3001/uploads/post-1771505821823-500771166.jpg",
  "description": "New mock post with uploaded file"
}
```

Ошибки:
- `415` если отправлен не `multipart/form-data`
- `400` если нет `photoFile`/невалидный файл/превышен лимит

#### `PUT /posts/:id`

Полностью обновляет пост.

Что принимает:
- `Content-Type: application/json`
- тело:

```json
{
  "id": 6,
  "profileId": 45,
  "photo": "http://localhost:3001/uploads/post-1771505821823-500771166.jpg",
  "description": "Updated description"
}
```

Пример ответа `200`:
- обновленный объект поста

#### `DELETE /posts/:id`

Удаляет пост по id.

Пример:
- `DELETE /posts/6` -> `200` (или `204`, в зависимости от клиента)

### Profiles (только GET)

- `GET /profiles` - получить список профилей
- `GET /profiles/:id` - получить профиль по `id`

## Примечания

- Загруженные файлы доступны по пути `/uploads/<filename>`.
- Сервер слушает порт `3001`, чтобы не конфликтовать с Next.js dev server (`3000`).
