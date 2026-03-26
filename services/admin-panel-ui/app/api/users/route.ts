import { NextResponse } from 'next/server';

import { API_PATH } from '@/constants';
import { apiFetcher } from '@/server/lib';

const { USERS } = API_PATH;

export async function GET(request: Request) {
  const params = Object.fromEntries(new URL(request.url).searchParams.entries());

  const response = await apiFetcher({
    path: USERS,
    init: {
      params
    },
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}


export async function POST(request: Request) {
  const body = await request.text();

  const response = await apiFetcher({
    path: USERS,
    init: {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status })
}
