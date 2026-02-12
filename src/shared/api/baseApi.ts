import axios, { InternalAxiosRequestConfig } from 'axios';
// import  {  AxiosError, } from 'axios';
import { tokenService } from '@/shared/lib/tokenService/tokenService';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
}); // брем апи из instance  добавить туда withCredentials
// рефреш убрать
// let refreshPromise: Promise<string> | null = null;

// ==========================
// REQUEST INTERCEPTOR
// ==========================
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenService.get();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ==========================
// RESPONSE INTERCEPTOR
// ==========================
// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as InternalAxiosRequestConfig & {
//       _retry?: boolean;
//     };
//
//     if (error.response?.status !== 401 || originalRequest._retry) {
//       return Promise.reject(error);
//     }
//
//     originalRequest._retry = true;
//
//     try {
//       if (!refreshPromise) {
//         refreshPromise = axios
//           .post<{ accessToken: string }>(
//             `${BASE_URL}auth/refresh`,
//             null,
//             { withCredentials: true }
//           )
//           .then((res) => {
//             tokenService.set(res.data.accessToken);
//             return res.data.accessToken;
//           })
//           .finally(() => {
//             refreshPromise = null;
//           });
//       }
//
//       const newToken = await refreshPromise;
//
//       if (originalRequest.headers) {
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//       }
//
//       return api(originalRequest);
//     } catch (refreshError) {
//       tokenService.remove();
//
//       if (typeof window !== 'undefined') {
//         window.location.href = '/sign-in';
//       }
//
//       return Promise.reject(refreshError);
//     }
//   }
// );
