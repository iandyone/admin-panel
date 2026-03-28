
import { API_PATH } from '@/constants';
import { apiFetcher, getNextResponse } from '@/server/lib';

export async function GET() {
  const response = await apiFetcher({
    path: API_PATH.EMPLOYEE
  })

  return getNextResponse(response);
}
