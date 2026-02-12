// import { api } from '@/shared/api/baseApi';
// import { tokenService } from '@/shared/lib/tokenService/tokenService';
//
// type LoginResponse = {
//   accessToken: string;
// };
//
// export const authApi = {
//   async login(email: string, password: string) {
//     const { data } = await api.post<LoginResponse>('auth/login', {
//       email,
//       password,
//     });
//
//     tokenService.set(data.accessToken);
//
//     return data;
//   },
//
//   async logout() {
//     try {
//       // ⚡️ Передаем флаг skipAuthRefresh, чтобы interceptor не пытался refresh
//       await api.post('auth/logout', null, { skipAuthRefresh: true });
//     } catch (error: any) {
//       // Ошибка больше не игнорируется
//       console.error(
//         'Ошибка при logout:',
//         error.response?.data || error.message,
//       );
//       throw error;
//     } finally {
//       tokenService.remove();
//     }
//   },
//
//   async refresh() {
//     const { data } = await api.post<LoginResponse>('auth/refresh');
//     tokenService.set(data.accessToken);
//     return data;
//   },
// };
// import axios from 'axios';
import { api } from '@/shared/api/baseApi';
import { tokenService } from '@/shared/lib/tokenService/tokenService';

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type LoginResponse = {
  accessToken: string;
};

export const authApi = {
  async login(email: string, password: string) {
    const { data } = await api.post<LoginResponse>('auth/login', {
      email,
      password,
    });

    tokenService.set(data.accessToken); //  локал сторедж
    return data;
  },

  async logout() {
    try {
      // ❗ logout через обычный axios (без interceptor)
      await api.post(`auth/logout`, null, {});
    } finally {
      tokenService.remove();
    }
  },

  // async refresh() {
  //   const { data } = await api.post<LoginResponse>('auth/refresh');
  //   tokenService.set(data.accessToken);
  //   return data;
  // },
};
