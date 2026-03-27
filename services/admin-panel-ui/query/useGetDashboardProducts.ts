import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { signOut } from 'next-auth/react';

import { API_PATH, ENotificationTypes, ERoutes, FetchTags } from '@/constants'
import { useToast } from '@/hooks'
import { DashboardFilter, DashboardProducts } from '@/types'

const { DASHBOARD_PRODUCTS_FETCHING_ERROR, SESSION_EXPIRED } = ENotificationTypes;

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

        if (!response.ok) {
          throw new Error(response.statusText, { cause: response });
        }

        const data: DashboardProducts[] = await response.json();

        return data;
      } catch (error) {
        if (error instanceof Error && error.message.startsWith('Unauthorized')) {
          sendNotification(SESSION_EXPIRED);

          await signOut({ redirectTo: `/${ERoutes.SIGN_IN}` });

          return [];
        }

        sendNotification(DASHBOARD_PRODUCTS_FETCHING_ERROR);
        console.log({ error });

        return [] as DashboardProducts[];
      }
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  })
}
