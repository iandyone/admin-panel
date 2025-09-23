import { useMutation, useQueryClient } from '@tanstack/react-query'

import { $axios } from '@/configs'
import { API_PATH, ENotificationTypes, FetchTags } from '@/constants'
import { useToast } from '@/hooks'
import { UpdateUserPayload, User } from '@/types'

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  const { sendNotification } = useToast();

  return useMutation({
    mutationFn: async ({ id, userData }: UpdateUserPayload) => {
      const response = await $axios.patch<User>(`${API_PATH.USERS}/${id}`, { ...userData });

      return response.data;
    },


    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FetchTags.USERS] });
      sendNotification(ENotificationTypes.USER_UPDATE_SUCCESS);
    },

    onError: (error) => {
      console.log({ error })
      sendNotification(ENotificationTypes.USER_UPDATE_ERROR);
    },

  })
}
