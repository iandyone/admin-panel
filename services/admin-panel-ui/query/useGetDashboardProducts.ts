import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { $axios } from '@/configs'
import { API_PATH, FetchTags } from '@/constants'
import { DashboardFilter, DashboardProducts } from '@/types'

export const useGetDashboardProducts = (filters?: DashboardFilter) => {
  return useQuery({
    queryKey: [FetchTags.DASHBOARD_PRODUCTS, filters],
    queryFn: async () => {
      try {
        const response = await $axios.get<DashboardProducts[]>(API_PATH.DASHBOARD_PRODUCTS, {
          params: {
            ...filters
          }
        });


        return response.data;
      } catch (error) {
        console.log({ error });

        return [] as DashboardProducts[];
      }
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  })
}
