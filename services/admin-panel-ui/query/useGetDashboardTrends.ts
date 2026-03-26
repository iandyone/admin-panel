import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { API_PATH, ENotificationTypes, FetchTags } from '@/constants'
import { useToast } from '@/hooks'
import { DashboardFilter, TrendProduct } from '@/types'

export const useGetDashboardTrends = (filters?: DashboardFilter) => {
  const { sendNotification } = useToast();

  return useQuery({
    queryKey: [FetchTags.TRENDS, filters],
    queryFn: async () => {
      try {
        const searchParams = new URLSearchParams();

        Object.entries(filters ?? {}).forEach(([queryKey, queryValue]) => {
          if (queryValue) {
            searchParams.set(queryKey, queryValue)
          }
        });

        const response = await fetch(`/api${API_PATH.DASHBOARD_TRENDS}?${searchParams.toString()}`);

        const data: TrendProduct[] = await response.json();

        return data;
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
