import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signOut } from 'next-auth/react';

import { API_PATH, ENotificationTypes, ERoutes, FetchTags } from '@/constants'
import { useToast } from '@/hooks'
import { UpdateUserPayload, User } from '@/types'


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
        throw new Error(response.statusText, { cause: response });
      }

      const data: User = await response.json();

      return data;
    },


    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FetchTags.USERS] });
      sendNotification(USER_UPDATE_SUCCESS);
    },

    onError: async (error) => {
      if (error.message === 'Unauthorized') {
        sendNotification(SESSION_EXPIRED);

        return await signOut({ redirectTo: `/${ERoutes.SIGN_IN}` });
      }

      console.log({ error })
      sendNotification(USER_UPDATE_ERROR);
    },

  })
}
