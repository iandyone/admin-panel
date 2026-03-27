
import { API_PATH } from '@/constants';
import { apiFetcher } from '@/server/lib';
import { getNextResponse } from '@/server/lib/get-next-response';

export async function GET() {
  const response = await apiFetcher({
    path: API_PATH.EMPLOYEE
  })

  return getNextResponse(response);
}
