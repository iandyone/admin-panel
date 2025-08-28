import { useQuery } from '@tanstack/react-query'

import { $axios } from '@/configs'
import { API_PATH, DEFAULT_ROWS_PER_PAGE, FetchTags, START_PAGE } from '@/constants'
import { UsersFilter, UsersResponse } from '@/types'

export const useGetUsersQuery = (page = START_PAGE, perPage = DEFAULT_ROWS_PER_PAGE, filters?: UsersFilter) => {
  return useQuery({
    queryKey: [FetchTags.USERS, page, perPage, filters],
    queryFn: async () => {
      try {
        const response = await $axios.get<UsersResponse>(API_PATH.USERS, {
          params: {
            page,
            perPage,
            ...filters
          }
        });


        return response.data;
      } catch (error) {
        console.log({ error });

        return {
          total: 0,
          users: []
        }
      }
    },
    placeholderData: (previousData) => previousData,

  })
}
