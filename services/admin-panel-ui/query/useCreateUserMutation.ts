import { useMutation, useQueryClient } from '@tanstack/react-query'

import { $axios } from '@/configs';
import { API_PATH, FetchTags } from '@/constants';
import { CreateUserPayload } from '@/types'

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: CreateUserPayload) => {
      const response = await $axios.post(API_PATH.USERS, { ...userData },);

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
