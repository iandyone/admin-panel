import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { $axios } from '@/configs'
import { API_PATH, FetchTags } from '@/constants'
import { DashboardFilter, DashboardOrders } from '@/types'

export const useGetDashboardOrders = (filters?: DashboardFilter) => {
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
        console.log({ error });

        return [] as DashboardOrders[];
      }
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  })
}
