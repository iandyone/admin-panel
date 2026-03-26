import { NextResponse } from 'next/server';

import { API_PATH } from '@/constants';
import { apiFetcher } from '@/server/lib';
import { EmployeeResponse } from '@/types';

export async function GET() {
  const response = await apiFetcher({
    path: API_PATH.EMPLOYEE
  })

  const data: EmployeeResponse = await response.json();

  return NextResponse.json(data, { status: response.status })
}
