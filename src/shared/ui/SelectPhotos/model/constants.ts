/** Расширения для атрибута accept у input[type="file"] (подсказка браузеру при выборе файлов) */
export const ACCEPT_IMAGE = '.jpeg,.jpg,.png';

/** MIME-типы для проверки выбранных файлов на клиенте (часть браузеров отдаёт image/jpg для .jpg) */
export const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

/** Максимальный размер одного файла в байтах (20 MB) */
export const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;

/** Максимум фото при выборе в режиме multiple */
export const MAX_PHOTOS_MULTIPLE = 10;
