import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATH, ENotificationTypes, FetchTags } from '@/constants';
import { useToast } from '@/hooks';
import { CreateOrderPayload } from '@/types'

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

      const data = await response.json();

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FetchTags.ORDERS], })
      sendNotification(ENotificationTypes.ORDER_CREATE_SUCCESS);
    },

    onError: (error) => {
      sendNotification(ENotificationTypes.ORDER_CREATE_ERROR);
      console.log({ error })
    },
  })
}
