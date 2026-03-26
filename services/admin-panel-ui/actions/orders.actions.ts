'use server'

import { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

import { API_PATH, ERoutes, ORDERS_DEFAULT_FILTER } from '@/constants';
import { DEFAULT_ROWS_PER_PAGE, START_PAGE } from '@/constants/table';
import { apiFetcher } from '@/server/lib';
import { OrdersResponse } from '@/types';


export const prefetchOrders = async (page = START_PAGE, perPage = DEFAULT_ROWS_PER_PAGE, filters = ORDERS_DEFAULT_FILTER) => {
  try {
    const response = await apiFetcher({
      path: API_PATH.ORDERS,
      init: {
        params: {
          page,
          perPage,
          ...filters,
        }
      }
    })

    const data: OrdersResponse = await response.json()

    return data;
  } catch (error) {
    // TODO: больше не AxiosError
    if (error instanceof AxiosError && error.response?.status === 401) {
      redirect(ERoutes.SIGN_IN)
    }

    console.log(error);

    return {
      total: 0,
      users: []
    }
  }
}
