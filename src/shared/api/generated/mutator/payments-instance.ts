import type { AxiosRequestConfig } from 'axios';
import { createCustomInstance } from './create-custom-instance';

export const paymentsInstance = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const baseURL = process.env.NEXT_PUBLIC_PAYMENTS_API_URL;

  if (!baseURL) {
    throw new Error('NEXT_PUBLIC_PAYMENTS_API_URL is not configured');
  }

  return createCustomInstance(baseURL)<T>(config, options);
};

export type { BodyType, ErrorType } from './create-custom-instance';
