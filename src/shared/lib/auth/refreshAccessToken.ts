import axios from 'axios';
import { tokenStorage } from '../storage/tokenStorage';

const refreshApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let refreshPromise: Promise<string | null> | null = null;

/**
 * Обновляет access token через cookie-based refresh.
 * Параллельные вызовы (axios 401 + WS token.expired) дедуплицируются в один запрос.
 */
export const refreshAccessToken = async (): Promise<string | null> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const { data } = await refreshApi.post<{ accessToken: string }>(
        'auth/refresh-token',
      );

      tokenStorage.set(data.accessToken);

      return data.accessToken;
    } catch {
      tokenStorage.clear();

      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};
