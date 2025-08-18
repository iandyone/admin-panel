import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { $axios } from '@/configs'
import { FetchTags } from '@/constants'
import { DashboardStatistic } from '@/types'

export const useGetDashboardStatistics = () => {
  return useQuery({
    queryKey: [FetchTags.DASHBOARD],
    queryFn: async () => {
      try {
        const response = await $axios.get<DashboardStatistic>('/dashboard');


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
