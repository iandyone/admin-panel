import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signOut } from 'next-auth/react';

import { API_PATH, ENotificationTypes, ERoutes, FetchTags } from '@/constants';
import { useToast } from '@/hooks';
import { UpdateOrderPayload } from '@/types'
import { isUnauthorizedError } from '@/utils';

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
      if (isUnauthorizedError(error)) {
        sendNotification(SESSION_EXPIRED);

        return await signOut({ redirectTo: `/${ERoutes.SIGN_IN}` });
      }

      sendNotification(ORDER_UPDATE_ERROR);
      console.log({ error, })
    },
  })
}
