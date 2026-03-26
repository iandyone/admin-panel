import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { API_PATH, ENotificationTypes, FetchTags } from '@/constants'
import { useToast } from '@/hooks'
import { DashboardFilter, DashboardStatistic } from '@/types'


export const useGetDashboardStatistics = (filters?: DashboardFilter) => {
  const { sendNotification } = useToast();

  return useQuery({
    queryKey: [FetchTags.STATISTIC, filters],
    queryFn: async () => {
      try {
        const searchParams = new URLSearchParams();

        Object.entries(filters ?? {}).forEach(([queryKey, queryValue]) => {
          if (queryValue) {
            searchParams.set(queryKey, queryValue)
          }
        })

        const response = await fetch(`/api${API_PATH.DASHBOARD}?${searchParams.toString()}`);

        const data: DashboardStatistic = await response.json();


        return data;
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
