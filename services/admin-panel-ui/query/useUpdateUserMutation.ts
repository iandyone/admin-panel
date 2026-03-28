/* eslint-disable no-console */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATH, ENotificationTypes, FetchTags } from '@/constants'
import { useToast } from '@/hooks'
import { UpdateUserPayload, User } from '@/types'
import { isUnauthorizedError, signOutAndRedirect } from '@/utils';


const { USER_UPDATE_SUCCESS, USER_UPDATE_ERROR, SESSION_EXPIRED } = ENotificationTypes;

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
        throw new Error('Request failed', { cause: response });
      }

      const data: User = await response.json();

      return data;
    },


    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FetchTags.USERS] });
      sendNotification(USER_UPDATE_SUCCESS);
    },

    onError: async (error) => {
      console.log({ error });

      if (isUnauthorizedError(error)) {
        return await signOutAndRedirect(() => sendNotification(SESSION_EXPIRED));
      }

      sendNotification(USER_UPDATE_ERROR);
    },

  })
}
