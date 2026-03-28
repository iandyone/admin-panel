import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { signOut } from 'next-auth/react';

import { API_PATH, ENotificationTypes, ERoutes, FetchTags } from '@/constants'
import { useToast } from '@/hooks'
import { DashboardFilter, DashboardStatistic } from '@/types'
import { isUnauthorizedError } from '@/utils';

const { DASHBOARD_STATISTIC_FETCHING_ERROR, SESSION_EXPIRED } = ENotificationTypes;

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

        if (!response.ok) {
          throw new Error('Request failed', { cause: response });
        }

        const data: DashboardStatistic = await response.json();


        return data;
      } catch (error) {
        if (isUnauthorizedError(error)) {
          sendNotification(SESSION_EXPIRED);

          return await signOut({ redirectTo: `/${ERoutes.SIGN_IN}` });
        }

        sendNotification(DASHBOARD_STATISTIC_FETCHING_ERROR);
        console.log({ error });

        return {} as DashboardStatistic;
      }
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  })
}
