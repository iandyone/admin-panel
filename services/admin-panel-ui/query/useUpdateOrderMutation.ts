import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATH, ENotificationTypes, FetchTags } from '@/constants';
import { useToast } from '@/hooks';
import { UpdateOrderPayload } from '@/types'

export const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();
  const { sendNotification } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...orderData }: UpdateOrderPayload) => {
      // const response = await $axios.patch(`${API_PATH.ORDERS}/${id}`, { ...orderData });
      const response = await fetch(`/api${API_PATH.ORDERS}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FetchTags.ORDERS] });
      queryClient.invalidateQueries({ queryKey: [FetchTags.USERS] });
      sendNotification(ENotificationTypes.ORDER_UPDATE_SUCCESS);
    },

    onError: (error) => {
      sendNotification(ENotificationTypes.ORDER_UPDATE_ERROR);
      console.log({ error })
    },
  })
}
