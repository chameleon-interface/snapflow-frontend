import { InternalAxiosRequestConfig } from 'axios';
import { tokenService } from '@/shared/lib/tokenService/tokenService';
import { api } from '@/shared/api/instance';

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenService.get();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
