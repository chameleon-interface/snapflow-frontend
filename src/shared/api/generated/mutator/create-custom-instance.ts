import type { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from '@/shared/api/instance';

const normalizeUrl = (url?: string, baseURL?: string) => {
  if (!url) return url;

  const normalizedBaseUrl = baseURL?.replace(/\/+$/, '');
  const normalizedUrl = url.startsWith('/api/v1/')
    ? url.slice('/api/v1'.length)
    : url;

  if (normalizedBaseUrl?.endsWith('/api/v1')) {
    return normalizedUrl;
  }

  return url;
};

export const createCustomInstance =
  (baseURL?: string) =>
  async <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig,
  ): Promise<T> => {
    const effectiveBaseURL =
      options?.baseURL ?? baseURL ?? api.defaults.baseURL;

    const { data } = await api({
      ...config,
      ...(baseURL ? { baseURL } : {}),
      url: normalizeUrl(config.url, effectiveBaseURL),
      ...options,
    });

    return data;
  };

export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;
