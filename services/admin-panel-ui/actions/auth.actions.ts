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

  const contentType = response.headers.get('content-type') ?? '';

  const data = contentType.includes('application/json')
    ? await response.json().catch(() => null)
    : await response.text().catch(() => null);

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
};
