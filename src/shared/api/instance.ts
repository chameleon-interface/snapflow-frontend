import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { tokenStorage } from '@/shared/lib';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Required for refresh cookies
});

// Separate instance to avoid interceptor loop on refresh request
const refreshApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenStorage.get();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
};

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: AxiosError | null, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      !originalRequest ||
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    if (shouldSkipRefresh(originalRequest.url)) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest._retry = true;
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { data } = await refreshApi.post<{ accessToken: string }>(
        'auth/refresh-token',
      );

      tokenStorage.set(data.accessToken);
      processQueue(null, data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError as AxiosError, null);
      tokenStorage.clear();

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

function shouldSkipRefresh(url: unknown): boolean {
  if (typeof url !== 'string') return false;

  const normalized = url.replace(/^\//, '').toLowerCase();

  if (normalized === 'auth/refresh-token') return true;

  return (
    normalized === 'auth/login' ||
    normalized === 'auth/registration' ||
    normalized === 'auth/registration-confirmation' ||
    normalized === 'auth/registration-email-resending' ||
    normalized === 'auth/password-recovery' ||
    normalized === 'auth/check-password-recovery-code' ||
    normalized === 'auth/new-password'
  );
}
