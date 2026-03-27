import { auth } from '@/configs';

interface ApiFetcherProps {
  path: string;
  init?: RequestInit & { params?: Record<string, unknown> };
}

export const apiFetcher = async ({ path, init }: ApiFetcherProps) => {
  const baseURL = process.env.API_BASE_PATH;

  if (!baseURL) {
    throw new Error('API_BASE_PATH is not defined')
  }

  const session = await auth();
  const token = session?.accessToken;

  const headers = new Headers(init?.headers)
  const url = new URL(path, baseURL);

  if (init?.params) {
    Object.entries(init.params).forEach(([queryKey, queryValue]) => {
      if (queryValue) {
        url.searchParams.set(queryKey, String(queryValue))
      }
    })
  }

  headers.set('Content-Type', 'application/json');

  if (token) {
    headers.set('Authorization', token);
  }

  const fetchConfig: RequestInit = {
    ...init,
    headers,
    cache: init?.cache ?? 'no-store',
  };

  return fetch(url, fetchConfig);
}
