import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { API_PATH, ENotificationTypes, FetchTags } from '@/constants'
import { useToast } from '@/hooks'
import { DashboardFilter, DashboardOrders } from '@/types'

export const useGetDashboardOrders = (filters?: DashboardFilter) => {
  const { sendNotification } = useToast();

  return useQuery({
    queryKey: [FetchTags.DASHBOARD_ORDERS, filters],
    queryFn: async () => {
      try {

        const searchParams = new URLSearchParams();

        Object.entries(filters ?? {}).forEach(([queryKey, queryValue]) => {
          if (queryValue) {
            searchParams.set(queryKey, queryValue)
          }
        })

        const response = await fetch(`/api${API_PATH.DASHBOARD_ORDERS}?${searchParams.toString()}`);

        const data: DashboardOrders[] = await response.json();

        return data;
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
