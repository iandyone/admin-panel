import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { $axios } from '@/configs'
import { API_PATH, FetchTags } from '@/constants'
import { DashboardFilter, TrendProduct } from '@/types'

export const useGetDashboardTrends = (filters?: DashboardFilter) => {
  return useQuery({
    queryKey: [FetchTags.TRENDS, filters],
    queryFn: async () => {
      try {
        const response = await $axios.get<TrendProduct[]>(API_PATH.DASHBOARD_TRENDS, {
          params: {
            ...filters
          }
        });


        return response.data;
      } catch (error) {
        console.log({ error });

        return [] as TrendProduct[];
      }
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  })
}
