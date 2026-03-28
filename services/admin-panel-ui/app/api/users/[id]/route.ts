
import { API_PATH } from '@/constants';
import { apiFetcher, getNextResponse } from '@/server/lib';

const { USERS } = API_PATH;

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.text();

  const response = await apiFetcher({
    path: `${USERS}/${id}`,
    init: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body
    }
  })

  return getNextResponse(response);
}
