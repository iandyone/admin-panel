import { NextResponse } from 'next/server';

import { API_PATH } from '@/constants';
import { apiFetcher } from '@/server/lib';

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

  const data = await response.json();

  return NextResponse.json(data);
}


export async function DELETE(request: Request, context: RequestContext) {
  const { id } = await context.params;

  const response = await apiFetcher({
    path: `${ORDERS}/${id}`,
    init: {
      method: 'DELETE',
    }

  })
  const data = await response.text();

  return NextResponse.json(data, { status: response.status })
}
