import { useMutation, useQueryClient } from '@tanstack/react-query'

import { $axios } from '@/configs'
import { FetchTags } from '@/constants'
import { UpdateUserPayload, User } from '@/types'

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, userData }: UpdateUserPayload) => {
      const response = await $axios.patch<User>(`/users/${id}`, { ...userData },);

      return response.data;
    },


    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FetchTags.USERS], })
    },

    onError: (error) => {
      console.log({ error })
    },

  })
}
