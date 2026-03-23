import type { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from '@/shared/api/instance';

const normalizeUrl = (url?: string) => {
  if (!url) return url;

  const baseUrl = api.defaults.baseURL?.replace(/\/+$/, '');
  const normalizedUrl = url.startsWith('/api/v1/')
    ? url.slice('/api/v1'.length)
    : url;

  if (baseUrl?.endsWith('/api/v1')) {
    return normalizedUrl;
  }

  return url;
};

export const customInstance = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const { data } = await api({
    ...config,
    url: normalizeUrl(config.url),
    ...options,
  });

  return data;
};

export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;
