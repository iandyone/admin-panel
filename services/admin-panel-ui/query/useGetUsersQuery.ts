import { useQuery } from '@tanstack/react-query'

import { getUsers } from '@/actions'
import { DEFAULT_ROWS_PER_PAGE, FetchTags, START_PAGE } from '@/constants'
import { UsersFilter } from '@/types'

export const useGetUsersQuery = (page = START_PAGE, perPage = DEFAULT_ROWS_PER_PAGE, filters?: UsersFilter) => {
  return useQuery({
    queryKey: [FetchTags.USERS, page, perPage, filters],
    queryFn: async () => await getUsers(page, perPage, filters),
    placeholderData: (previousData) => previousData,

  })
}
