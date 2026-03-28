import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signOut } from 'next-auth/react';

import { API_PATH, ENotificationTypes, ERoutes, FetchTags } from '@/constants';
import { useToast } from '@/hooks';
import { CreateOrderPayload } from '@/types'
import { isUnauthorizedError } from '@/utils';


const { ORDER_CREATE_SUCCESS, ORDER_CREATE_ERROR, SESSION_EXPIRED } = ENotificationTypes;

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();
  const { sendNotification } = useToast();

  return useMutation({
    mutationFn: async (orderData: CreateOrderPayload) => {
      const response = await fetch(`/api${API_PATH.ORDERS}`, {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Request failed', { cause: response });
      }

      const data = await response.json();

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FetchTags.ORDERS], })
      sendNotification(ORDER_CREATE_SUCCESS);
    },

    onError: async (error) => {
      if (isUnauthorizedError(error)) {
        sendNotification(SESSION_EXPIRED);

        return await signOut({ redirectTo: `/${ERoutes.SIGN_IN}` });
      }

      sendNotification(ORDER_CREATE_ERROR);
      console.log({ error })
    },
  })
}
