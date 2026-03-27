import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signOut } from 'next-auth/react';

import { API_PATH, ENotificationTypes, ERoutes, FetchTags } from '@/constants';
import { useToast } from '@/hooks';

const { ORDER_REMOVE_SUCCESS, SESSION_EXPIRED, ORDER_REMOVE_ERROR } = ENotificationTypes


export const useRemoveOrderMutation = () => {
  const queryClient = useQueryClient();
  const { sendNotification } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api${API_PATH.ORDERS}/${id}`, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error(response.statusText, { cause: response });
      }

      const data = await response.json();

      return data;
    },

    onSuccess: () => {
      sendNotification(ORDER_REMOVE_SUCCESS);
      queryClient.invalidateQueries({ queryKey: [FetchTags.ORDERS], })
    },

    onError: async (error) => {
      if (error.message === 'Unauthorized') {
        sendNotification(SESSION_EXPIRED);

        return await signOut({ redirectTo: `/${ERoutes.SIGN_IN}` });
      }

      sendNotification(ORDER_REMOVE_ERROR);
      console.log({ error })
    },
  })
}
