'use server';

import { $axios_server } from '@/configs';
import { DASHBOARD_DEFAULT_FILTER } from '@/constants';
import { DashboardOrders, DashboardProducts, DashboardStatistic, TrendProduct } from '@/types';

export const getDashboardStats = async (filters = DASHBOARD_DEFAULT_FILTER) => {
  const response = await $axios_server.get<DashboardStatistic>('/dashboard', {
    params: {
      ...filters
    }
  });

  return response.data
}

export const getTrandingTrends = async (filters = DASHBOARD_DEFAULT_FILTER, limit?: number) => {
  const response = await $axios_server.get<TrendProduct[]>('/dashboard/trends', {
    params: {
      ...filters
    }
  });

  return limit ? response.data.splice(0, limit) : response.data;
}

export const getDashboardOrders= async (filters = DASHBOARD_DEFAULT_FILTER) => {
  const response = await $axios_server.get<DashboardOrders[]>('/dashboard/orders', {
    params: {
      ...filters
    }
  });

  return response.data;
}

export const getDashboardProducts= async (filters = DASHBOARD_DEFAULT_FILTER) => {
  const response = await $axios_server.get<DashboardProducts[]>('/dashboard/products', {
    params: {
      ...filters
    }
  });

  return response.data;
}
