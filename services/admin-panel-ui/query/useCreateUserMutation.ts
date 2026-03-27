import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signOut } from 'next-auth/react';

import { API_PATH, ENotificationTypes, ERoutes, FetchTags } from '@/constants';
import { useToast } from '@/hooks';
import { CreateUserPayload } from '@/types'

const { USER_CREATE_SUCCESS, USER_CREATE_ERROR, SESSION_EXPIRED } = ENotificationTypes;

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  const { sendNotification } = useToast();

  return useMutation({
    mutationFn: async (userData: CreateUserPayload) => {
      const response = await fetch(`/api${API_PATH.USERS}`, {
        method: 'POST',
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        throw new Error(response.statusText, { cause: response });
      }

      const data = await response.json();

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FetchTags.USERS] });
      sendNotification(USER_CREATE_SUCCESS);
    },

    onError: async (error) => {
      if (error.message === 'Unauthorized') {
        sendNotification(SESSION_EXPIRED);

        return await signOut({ redirectTo: `/${ERoutes.SIGN_IN}` });
      }

      sendNotification(USER_CREATE_ERROR);
      console.log({ error })
    },
  })
}
