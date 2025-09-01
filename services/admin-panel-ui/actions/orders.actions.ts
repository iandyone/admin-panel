'use server'

import { $axios_server, auth } from '@/configs';
import { API_PATH, ORDERS_DEFAULT_FILTER } from '@/constants';
import { DEFAULT_ROWS_PER_PAGE, START_PAGE } from '@/constants/table';
import { OrdersResponse } from '@/types';


export const prefetchOrders = async (page = START_PAGE, perPage = DEFAULT_ROWS_PER_PAGE, filters = ORDERS_DEFAULT_FILTER) => {
  const session = await auth();
  
  try {
    const response = await $axios_server.get<OrdersResponse>(API_PATH.ORDERS, {
      params: {
        page,
        perPage,
        ...filters,
      },
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.log(error);

    return {
      total: 0,
      users: []
    }
  }
}
