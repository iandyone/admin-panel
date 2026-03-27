import { API_PATH } from '@/constants';
import { apiFetcher } from '@/server/lib';
import { getNextResponse } from '@/server/lib/get-next-response';

interface RequestContext {
  params: Promise<{ id: string }>
}

const { ORDERS } = API_PATH;


export async function PATCH(request: Request, context: RequestContext) {
  const { id } = await context.params;
  const body = await request.text();

  const response = await apiFetcher({
    path: `${ORDERS}/${id}`,
    init: {
      method: 'PATCH',
      body
    }
  });

  return getNextResponse(response);
}


export async function DELETE(request: Request, context: RequestContext) {
  const { id } = await context.params;

  const response = await apiFetcher({
    path: `${ORDERS}/${id}`,
    init: {
      method: 'DELETE',
    }

  })

  return getNextResponse(response);
}
