import { useQuery } from '@tanstack/react-query'

import { $axios } from '@/configs'
import { API_PATH, DEFAULT_ROWS_PER_PAGE, ENotificationTypes, FetchTags, START_PAGE } from '@/constants'
import {  useToast } from '@/hooks'
import { OrderFilter, OrdersResponse } from '@/types'

export const useGetOrdersQuery = (page = START_PAGE, perPage = DEFAULT_ROWS_PER_PAGE, filters?: OrderFilter) => {
  const { sendNotification } = useToast();

  return useQuery({
    queryKey: [FetchTags.ORDERS, page, perPage, filters],
    queryFn: async () => {
      try {
        const response = await $axios.get<OrdersResponse>(API_PATH.ORDERS, {
          params: {
            page,
            perPage,
            ...filters
          }
        });

        return response.data;
      } catch (error) {
        console.log({ error });
        sendNotification(ENotificationTypes.ORDERS_FETCHING_ERROR);

        return {
          total: 0,
          orders: []
        }
      }
    },


    placeholderData: (previousData) => previousData,

  })
}
