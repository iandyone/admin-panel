'use server';

import { $axios_server, auth } from '@/configs';
import { API_PATH, DASHBOARD_DEFAULT_FILTER } from '@/constants';
import { DashboardOrders, DashboardProducts, DashboardStatistic, TrendProduct } from '@/types';

const { DASHBOARD, DASHBOARD_TRENDS, DASHBOARD_ORDERS, DASHBOARD_PRODUCTS } = API_PATH;

export const getDashboardStats = async (filters = DASHBOARD_DEFAULT_FILTER) => {
  const session = await auth();
  const response = await $axios_server.get<DashboardStatistic>(DASHBOARD, {
    params: {
      ...filters
    },
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    }
  });

  return response.data
}

export const getProductTrends = async (filters = DASHBOARD_DEFAULT_FILTER, limit?: number) => {
  const session = await auth();
  const response = await $axios_server.get<TrendProduct[]>(DASHBOARD_TRENDS, {
    params: {
      ...filters
    },
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    }
  });

  return limit ? response.data.splice(0, limit) : response.data;
}

export const getDashboardOrders = async (filters = DASHBOARD_DEFAULT_FILTER) => {
  const session = await auth();
  const response = await $axios_server.get<DashboardOrders[]>(DASHBOARD_ORDERS, {
    params: {
      ...filters
    },
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    }
  });

  return response.data;
}

export const getDashboardProducts = async (filters = DASHBOARD_DEFAULT_FILTER) => {
  const session = await auth();
  const response = await $axios_server.get<DashboardProducts[]>(DASHBOARD_PRODUCTS, {
    params: {
      ...filters
    },
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    }
  });

  return response.data;
}
