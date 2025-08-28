import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { $axios } from '@/configs'
import { API_PATH, FetchTags } from '@/constants'
import { DashboardFilter, DashboardStatistic } from '@/types'


export const useGetDashboardStatistics = (filters?: DashboardFilter) => {
  return useQuery({
    queryKey: [FetchTags.STATISTIC, filters],
    queryFn: async () => {
      try {
        const response = await $axios.get<DashboardStatistic>(API_PATH.DASHBOARD, {
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
