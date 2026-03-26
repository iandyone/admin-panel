import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATH, ENotificationTypes, FetchTags } from '@/constants'
import { useToast } from '@/hooks'
import { UpdateUserPayload, User } from '@/types'

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  const { sendNotification } = useToast();

  return useMutation({
    mutationFn: async ({ id, userData }: UpdateUserPayload) => {
      const response = await fetch(`/api${API_PATH.USERS}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.status}`);
      }

      const data: User = await response.json();

      return data;
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
