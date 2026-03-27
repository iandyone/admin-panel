import { API_PATH } from '@/constants';
import { apiFetcher } from '@/server/lib';
import { getNextResponse } from '@/server/lib/get-next-response';

export async function GET(request: Request) {
  const params = Object.fromEntries(new URL(request.url).searchParams.entries());

  const response = await apiFetcher({
    path: API_PATH.DASHBOARD_ORDERS,
    init: {
      params,
    }
  });

  return getNextResponse(response);
}
