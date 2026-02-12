import { api } from './instance';

export type MeResponse = {
  userId: string;
  username: string;
  email: string;
};

export async function getMe(): Promise<MeResponse | null> {
  try {
    const { data } = await api.get<MeResponse>('/auth/me');
    return data;
  } catch {
    return null;
  }
}
