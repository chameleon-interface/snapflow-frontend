import type { AxiosRequestConfig } from 'axios';
import { createCustomInstance } from './create-custom-instance';

const coreInstance = createCustomInstance();

export const customInstance = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => coreInstance<T>(config, options);

export type { BodyType, ErrorType } from './create-custom-instance';
