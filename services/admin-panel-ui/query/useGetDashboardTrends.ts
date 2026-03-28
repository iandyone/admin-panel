/* eslint-disable no-console */
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { API_PATH, ENotificationTypes, FetchTags } from '@/constants'
import { useToast } from '@/hooks'
import { DashboardFilter, TrendProduct } from '@/types'
import { isUnauthorizedError, signOutAndRedirect } from '@/utils';

const { DASHBOARD_TRENDS_FETCHING_ERROR, SESSION_EXPIRED } = ENotificationTypes;

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

        if (!response.ok) {
          throw new Error('Request failed', { cause: response });
        }

        const data: TrendProduct[] = await response.json();

        return data;
      } catch (error) {
        console.log({ error });

        if (isUnauthorizedError(error)) {
          await signOutAndRedirect(() => sendNotification(SESSION_EXPIRED));

          return [];
        }
        sendNotification(DASHBOARD_TRENDS_FETCHING_ERROR);

        return [] as TrendProduct[];
      }
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  })
}
