/* eslint-disable no-console */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATH, ENotificationTypes, FetchTags } from '@/constants';
import { useToast } from '@/hooks';
import { UpdateOrderPayload } from '@/types'
import { isUnauthorizedError, signOutAndRedirect } from '@/utils';

const { SESSION_EXPIRED, ORDER_UPDATE_ERROR, ORDER_UPDATE_SUCCESS } = ENotificationTypes

export const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();
  const { sendNotification } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...orderData }: UpdateOrderPayload) => {
      const response = await fetch(`/api${API_PATH.ORDERS}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Request failed', { cause: response });
      }

      const data = await response.json();

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FetchTags.ORDERS] });
      queryClient.invalidateQueries({ queryKey: [FetchTags.USERS] });
      sendNotification(ORDER_UPDATE_SUCCESS);
    },

    onError: async (error) => {
      console.log({ error, })

      if (isUnauthorizedError(error)) {
        return await signOutAndRedirect(() => sendNotification(SESSION_EXPIRED));
      }

      sendNotification(ORDER_UPDATE_ERROR);
    },
  })
}
