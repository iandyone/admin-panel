import { useMutation, useQueryClient } from '@tanstack/react-query'

import { $axios } from '@/configs';
import { API_PATH, ENotificationTypes, FetchTags } from '@/constants';
import { useToast } from '@/hooks';
import { UpdateOrderPayload } from '@/types'

export const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();
  const { sendNotification } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...orderData }: UpdateOrderPayload) => {
      const response = await $axios.patch(`${API_PATH.ORDERS}/${id}`, { ...orderData });

      return response.data;
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
