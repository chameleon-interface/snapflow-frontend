import { tokenService } from '@/shared/lib/tokenService/tokenService';
import { api } from '@/shared/api/instance';

export type LoginResponse = {
  accessToken: string;
};

export const authApi = {
  login: async (email: string, password: string) => {
    const { data } = await api.post<LoginResponse>('auth/login', {
      email,
      password,
    });

    // Сохраняем токен в localStorage
    tokenService.set(data.accessToken);

    return data;
  },

  logout: async () => {
    try {
      await api.post('auth/logout'); // сервер удаляет refresh cookie
    } finally {
      tokenService.remove(); // локально очищаем accessToken
    }
  },

  // Здесь можно добавить me() или refresh() позже
};
