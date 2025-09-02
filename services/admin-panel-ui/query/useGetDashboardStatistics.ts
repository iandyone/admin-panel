import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { $axios } from '@/configs'
import { API_PATH, ENotificationTypes, FetchTags } from '@/constants'
import { useToast } from '@/hooks'
import { DashboardFilter, DashboardStatistic } from '@/types'


export const useGetDashboardStatistics = (filters?: DashboardFilter) => {
const { sendNotification } = useToast();

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
        sendNotification(ENotificationTypes.DASHBOARD_STATISTIC_FETCHING_ERROR);
        console.log({ error });

        return {} as DashboardStatistic;
      }
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  })
}
