/* eslint-disable no-console */
import { useQuery } from '@tanstack/react-query'

import { API_PATH, DEFAULT_ROWS_PER_PAGE, ENotificationTypes, FetchTags, START_PAGE } from '@/constants'
import { useToast } from '@/hooks'
import { OrderFilter, OrdersResponse } from '@/types'
import { isUnauthorizedError, signOutAndRedirect } from '@/utils';

const { ORDERS_FETCHING_ERROR, SESSION_EXPIRED } = ENotificationTypes;;

export const useGetOrdersQuery = (page = START_PAGE, perPage = DEFAULT_ROWS_PER_PAGE, filters?: OrderFilter) => {
  const { sendNotification } = useToast();

  return useQuery({
    queryKey: [FetchTags.ORDERS, page, perPage, filters],
    queryFn: async () => {
      try {
        const searchParams = new URLSearchParams({
          page: String(page),
          perPage: String(perPage)
        })

        Object.entries(filters ?? {}).forEach(([queryKey, queryValue]) => {
          if (queryValue) {
            searchParams.set(queryKey, queryValue)
          }
        })

        const response = await fetch(`/api${API_PATH.ORDERS}?${searchParams.toString()}`);

        if (!response.ok) {
          throw new Error('Request failed', { cause: response });
        }

        const data: OrdersResponse = await response.json();

        return data;
      } catch (error) {
        console.log({ error });

        if (isUnauthorizedError(error)) {
          return await signOutAndRedirect(() => sendNotification(SESSION_EXPIRED));
        }

        sendNotification(ORDERS_FETCHING_ERROR);

        return {
          total: 0,
          orders: []
        }
      }
    },


    placeholderData: (previousData) => previousData,
  })
}
