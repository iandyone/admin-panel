import { API_PATH } from '@/constants'
import { apiFetcher } from '@/server/lib'

export const signInAction = async (email: string, password: string) => {
  const response = await apiFetcher({
    path: API_PATH.SIGN_IN,
    init: {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    },
  });

  const data = await response.json().catch(() => null);

  return data;
};
