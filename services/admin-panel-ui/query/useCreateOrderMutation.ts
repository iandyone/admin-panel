import { useMutation, useQueryClient } from '@tanstack/react-query'

import { $axios } from '@/configs';
import { API_PATH, ENotificationTypes, FetchTags } from '@/constants';
import { useToast } from '@/hooks';
import { CreateOrderPayload } from '@/types'

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();
  const { sendNotification } = useToast();

  return useMutation({
    mutationFn: async (orderData: CreateOrderPayload) => {
      const response = await $axios.post(API_PATH.ORDERS, { ...orderData });

      return response.data;
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
