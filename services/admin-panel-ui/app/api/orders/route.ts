import { API_PATH } from '@/constants';
import { apiFetcher } from '@/server/lib';
import { getNextResponse } from '@/server/lib/get-next-response';

const { ORDERS } = API_PATH;

export async function GET(request: Request) {
  const params = Object.fromEntries(new URL(request.url).searchParams.entries());

  const response = await apiFetcher({
    path: ORDERS,
    init: {
      params
    }
  });

  return getNextResponse(response);
}

export async function POST(request: Request) {
  const body = await request.text();

  const response = await apiFetcher({
    path: ORDERS,
    init: {
      method: 'POST',
      body
    }
  });

  return getNextResponse(response);
}
