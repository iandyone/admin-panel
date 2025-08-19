import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { $axios } from '@/configs'
import { FetchTags } from '@/constants'
import { DashboardFilter, DashboardStatistic } from '@/types'

export const useGetDashboardStatistics = (filters?: DashboardFilter) => {
  return useQuery({
    queryKey: [FetchTags.DASHBOARD, filters],
    queryFn: async () => {
      try {
        const response = await $axios.get<DashboardStatistic>('/dashboard', {
          params: {
            ...filters
          }
        });


        return response.data;
      } catch (error) {
        console.log({ error });

        return {} as DashboardStatistic;
      }
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  })
}
