import { useQuery } from '@tanstack/react-query'
import { signOut } from 'next-auth/react';

import { API_PATH, DEFAULT_ROWS_PER_PAGE, ENotificationTypes, ERoutes, FetchTags, START_PAGE } from '@/constants'
import { useToast } from '@/hooks'
import { OrderFilter, OrdersResponse } from '@/types'

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
          throw new Error(response.statusText, { cause: response });
        }

        const data: OrdersResponse = await response.json();

        return data;
      } catch (error) {
        if (error instanceof Error && error.message.startsWith('Unauthorized')) {
          sendNotification(SESSION_EXPIRED);

          return await signOut({ redirectTo: `/${ERoutes.SIGN_IN}` });
        }

        console.log({ error });
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
