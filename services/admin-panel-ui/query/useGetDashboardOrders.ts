import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { $axios } from '@/configs'
import { API_PATH, ENotificationTypes, FetchTags } from '@/constants'
import { useToast } from '@/hooks'
import { DashboardFilter, DashboardOrders } from '@/types'

export const useGetDashboardOrders = (filters?: DashboardFilter) => {
  const { sendNotification } = useToast();

  return useQuery({
    queryKey: [FetchTags.DASHBOARD_ORDERS, filters],
    queryFn: async () => {
      try {
        const response = await $axios.get<DashboardOrders[]>(API_PATH.DASHBOARD_ORDERS, {
          params: {
            ...filters
          }
        });

        return response.data;
      } catch (error) {
        sendNotification(ENotificationTypes.DASHBOARD_ORDERS_FETCHING_ERROR);
        console.log({ error });

        return [] as DashboardOrders[];
      }
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  })
}
