/* eslint-disable no-console */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATH, ENotificationTypes, FetchTags } from '@/constants';
import { useToast } from '@/hooks';
import { CreateUserPayload } from '@/types'
import { isUnauthorizedError, signOutAndRedirect } from '@/utils';

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
        throw new Error('Request failed', { cause: response });
      }

      const data = await response.json();

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FetchTags.USERS] });
      sendNotification(USER_CREATE_SUCCESS);
    },

    onError: async (error) => {
      console.log({ error })

      if (isUnauthorizedError(error)) {
        return await signOutAndRedirect(() => sendNotification(SESSION_EXPIRED));
      }

      sendNotification(USER_CREATE_ERROR);
    },
  })
}
