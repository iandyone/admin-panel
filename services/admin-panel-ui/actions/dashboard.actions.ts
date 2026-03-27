/* eslint-disable no-console */
'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';

import { API_PATH, DASHBOARD_DEFAULT_FILTER, ERoutes } from '@/constants';
import { apiFetcher } from '@/server/lib';
import { DashboardOrders, DashboardProducts, DashboardStatistic, TrendProduct } from '@/types';

const { DASHBOARD, DASHBOARD_TRENDS, DASHBOARD_ORDERS, DASHBOARD_PRODUCTS } = API_PATH;

export const getDashboardStats = async (filters = DASHBOARD_DEFAULT_FILTER) => {
  try {
    const response = await apiFetcher({
      path: DASHBOARD,
      init: {
        params: {
          ...filters
        }
      }
    });

    if (response.status === 401) {
      redirect(ERoutes.SIGN_IN)
    }

    const data: DashboardStatistic = await response.json();

    return data;

  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    console.log(error);
  }

}

export const getProductTrends = async (filters = DASHBOARD_DEFAULT_FILTER, limit?: number) => {
  try {
    const response = await apiFetcher({
      path: DASHBOARD_TRENDS,
      init: {
        params: {
          ...filters
        }
      }
    });

    if (response.status === 401) {
      redirect(ERoutes.SIGN_IN)
    }

    const data: TrendProduct[] = await response.json();

    return limit ? data.splice(0, limit) : data;


  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    
    console.log(error);
  }
}

export const getDashboardOrders = async (filters = DASHBOARD_DEFAULT_FILTER) => {
  try {
    const response = await apiFetcher({
      path: DASHBOARD_ORDERS,
      init: {
        params: {
          ...filters
        }
      }
    })

    if (response.status === 401) {
      redirect(ERoutes.SIGN_IN)
    }

    const data: DashboardOrders[] = await response.json();

    return data;
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }

    console.log(error);
  }
}

export const getDashboardProducts = async (filters = DASHBOARD_DEFAULT_FILTER) => {
  try {
    const response = await apiFetcher({
      path: DASHBOARD_PRODUCTS,
      init: {
        params: { ...filters }
      }
    })

    if (response.status === 401) {
      redirect(ERoutes.SIGN_IN)
    }

    const data: DashboardProducts[] = await response.json();

    return data;
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }

    console.log(error);
  }

}
