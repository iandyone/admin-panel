/* eslint-disable no-console */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATH, ENotificationTypes, FetchTags } from '@/constants';
import { useToast } from '@/hooks';
import { isUnauthorizedError, signOutAndRedirect } from '@/utils';

const { ORDER_REMOVE_SUCCESS, SESSION_EXPIRED, ORDER_REMOVE_ERROR } = ENotificationTypes


export const useRemoveOrderMutation = () => {
  const queryClient = useQueryClient();
  const { sendNotification } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api${API_PATH.ORDERS}/${id}`, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error('Request failed', { cause: response });
      }

      const data = await response.json();

      return data;
    },

    onSuccess: () => {
      sendNotification(ORDER_REMOVE_SUCCESS);
      queryClient.invalidateQueries({ queryKey: [FetchTags.ORDERS], })
    },

    onError: async (error) => {
      console.log({ error })
      
      if (isUnauthorizedError(error)) {
        return await signOutAndRedirect(() => sendNotification(SESSION_EXPIRED));
      }

      sendNotification(ORDER_REMOVE_ERROR);
    },
  })
}
