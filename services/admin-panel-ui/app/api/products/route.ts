import { NextResponse } from 'next/server';

import { API_PATH } from '@/constants';
import { apiFetcher } from '@/server/lib';
import { Product } from '@/types';

export async function GET() {
  const response = await apiFetcher({
    path: API_PATH.PRODUCTS
  })

  const data: Product[] = await response.json();

  return NextResponse.json(data, { status: response.status })
}
