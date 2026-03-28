/* eslint-disable no-console */
import { useQuery } from '@tanstack/react-query'

import { API_PATH, DEFAULT_ROWS_PER_PAGE, ENotificationTypes, FetchTags, START_PAGE } from '@/constants'
import { useToast } from '@/hooks'
import { UsersFilter, UsersResponse } from '@/types'
import { isUnauthorizedError, signOutAndRedirect } from '@/utils';

const { USERS_FETCHING_ERROR, SESSION_EXPIRED } = ENotificationTypes;

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
          throw new Error('Request failed', { cause: response });
        }

        const data: UsersResponse = await response.json();

        return data;
      } catch (error) {
        console.log({ error });

        const EMPTY_USERS = {
          total: 0,
          users: []
        };

        if (isUnauthorizedError(error)) {
          await signOutAndRedirect(() => sendNotification(SESSION_EXPIRED));

          return EMPTY_USERS
        }

        sendNotification(USERS_FETCHING_ERROR);

        return EMPTY_USERS
      }
    },

    placeholderData: (previousData) => previousData,
  })
}
