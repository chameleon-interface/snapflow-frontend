import axios, { InternalAxiosRequestConfig } from 'axios';
import { STORAGE_KEYS } from '@/shared/config/storage';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Required for refresh cookies
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
