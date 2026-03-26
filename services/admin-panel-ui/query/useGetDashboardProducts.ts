import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { API_PATH, ENotificationTypes, FetchTags } from '@/constants'
import { useToast } from '@/hooks'
import { DashboardFilter, DashboardProducts } from '@/types'

export const useGetDashboardProducts = (filters?: DashboardFilter) => {
  const { sendNotification } = useToast();

  return useQuery({
    queryKey: [FetchTags.DASHBOARD_PRODUCTS, filters],
    queryFn: async () => {
      try {
        const searchParams = new URLSearchParams();

        Object.entries(filters ?? {}).forEach(([queryKey, queryValue]) => {
          if (queryValue) {
            searchParams.set(queryKey, queryValue)
          }
        });

        const response = await fetch(`/api${API_PATH.DASHBOARD_PRODUCTS}?${searchParams.toString()}`);

        const data: DashboardProducts[] = await response.json();

        return data;
      } catch (error) {
        sendNotification(ENotificationTypes.DASHBOARD_PRODUCTS_FETCHING_ERROR);
        console.log({ error });

        return [] as DashboardProducts[];
      }
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  })
}
