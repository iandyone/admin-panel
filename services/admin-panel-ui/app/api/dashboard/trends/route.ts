import { API_PATH } from '@/constants';
import { apiFetcher, getNextResponse } from '@/server/lib';

export async function GET(request: Request) {
  const params = Object.fromEntries(new URL(request.url).searchParams.entries());

  const response = await apiFetcher({
    path: API_PATH.DASHBOARD_TRENDS,
    init: {
      params,
    }
  });

  return getNextResponse(response);
}
