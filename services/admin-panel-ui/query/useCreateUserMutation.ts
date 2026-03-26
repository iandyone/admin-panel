import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATH, ENotificationTypes, FetchTags } from '@/constants';
import { useToast } from '@/hooks';
import { CreateUserPayload } from '@/types'


export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  const { sendNotification } = useToast();

  return useMutation({
    mutationFn: async (userData: CreateUserPayload) => {
      const response = await fetch(`/api${API_PATH.USERS}`, {
        method: 'POST',
        body: JSON.stringify(userData),
      })

      const data = await response.json();

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FetchTags.USERS] });
      sendNotification(ENotificationTypes.USER_CREATE_SUCCESS);
    },

    onError: (error) => {
      sendNotification(ENotificationTypes.USER_CREATE_ERROR);
      console.log({ error })
    },
  })
}
