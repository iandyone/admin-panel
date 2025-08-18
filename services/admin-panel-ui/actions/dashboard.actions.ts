'use server';

import { $axios_server } from '@/configs';
import { DashboardStatistic } from '@/types';

export const getDashboardStats = async () => {
  const response = await $axios_server.get<DashboardStatistic>('/dashboard');

  return response.data
}
