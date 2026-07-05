/**
 * Базовый URL API без REST-префикса `/api/v1`.
 * Нужен для Socket.IO: `{baseUrl}/notifications`.
 *
 * @example
 * NEXT_PUBLIC_API_URL = https://stage.snapflow.cc/api/v1
 * → https://stage.snapflow.cc
 */
export const getApiBaseUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }

  return apiUrl.replace(/\/api\/v\d+\/?$/, '');
};
