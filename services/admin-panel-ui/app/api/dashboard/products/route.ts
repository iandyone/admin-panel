import { NextResponse } from 'next/server';

import { API_PATH } from '@/constants';
import { apiFetcher } from '@/server/lib';

export async function GET(request: Request) {
  const params = Object.fromEntries(new URL(request.url).searchParams.entries());

  const response = await apiFetcher({
    path: API_PATH.DASHBOARD_PRODUCTS,
    init: {
      params,
    }
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
