import { useQuery } from '@tanstack/react-query'

import { API_PATH, DEFAULT_ROWS_PER_PAGE, ENotificationTypes, FetchTags, START_PAGE } from '@/constants'
import { useToast } from '@/hooks'
import { UsersFilter, UsersResponse } from '@/types'

export const useGetUsersQuery = (page = START_PAGE, perPage = DEFAULT_ROWS_PER_PAGE, filters?: UsersFilter) => {
  const { sendNotification } = useToast();

  return useQuery({
    queryKey: [FetchTags.USERS, page, perPage, filters],
    queryFn: async () => {
      try {
        const searchParams = new URLSearchParams({
          page: String(page),
          perPage: String(perPage),
        });

        Object.entries(filters ?? {}).forEach(([queryKey, queryValue]) => {
          if (queryValue) {
            searchParams.set(queryKey, String(queryValue))
          }
        });

        const response = await fetch(`/api${API_PATH.USERS}?${searchParams.toString()}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }

        const data: UsersResponse = await response.json();

        return data;
      } catch (error) {
        console.log({ error });
        sendNotification(ENotificationTypes.USERS_FETCHING_ERROR);

        return {
          total: 0,
          users: []
        }
      }
    },

    placeholderData: (previousData) => previousData,

  })
}
