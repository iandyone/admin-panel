import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { $axios } from '@/configs'
import { API_PATH, ENotificationTypes, FetchTags } from '@/constants'
import { useToast } from '@/hooks'
import { DashboardFilter, TrendProduct } from '@/types'

export const useGetDashboardTrends = (filters?: DashboardFilter) => {
  const { sendNotification } = useToast();

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
        sendNotification(ENotificationTypes.DASHBOARD_TRENDS_FETCHING_ERROR);
        console.log({ error });

        return [] as TrendProduct[];
      }
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  })
}
