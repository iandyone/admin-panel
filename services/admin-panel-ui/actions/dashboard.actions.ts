'use server';

import { $axios_server } from '@/configs';
import { DASHBOARD_DEFAULT_FILTER } from '@/constants';
import { DashboardStatistic, TrendProduct } from '@/types';

export const getDashboardStats = async (filters = DASHBOARD_DEFAULT_FILTER) => {
  const response = await $axios_server.get<DashboardStatistic>('/dashboard', {
    params: {
      ...filters
    }
  });

  return response.data
}

export const getTrandingProducts = async (filters = DASHBOARD_DEFAULT_FILTER) => {
  const response = await $axios_server.get<TrendProduct[]>('/dashboard/trends', {
    params: {
      ...filters
    }
  });

  return response.data
}
