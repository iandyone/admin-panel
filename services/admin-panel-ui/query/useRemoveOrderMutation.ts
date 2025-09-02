import { useMutation, useQueryClient } from '@tanstack/react-query'

import { $axios } from '@/configs';
import { API_PATH, ENotificationTypes, FetchTags } from '@/constants';
import { useToast } from '@/hooks';

export const useRemoveOrderMutation = () => {
  const queryClient = useQueryClient();
  const { sendNotification } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await $axios.delete(`${API_PATH.ORDERS}/${id}`);

      return response.data;
    },

    onSuccess: () => {
      sendNotification(ENotificationTypes.ORDER_REMOVE_SUCCESS);
      queryClient.invalidateQueries({ queryKey: [FetchTags.ORDERS], })
    },

    onError: (error) => {
      sendNotification(ENotificationTypes.ORDER_REMOVE_ERROR);
      console.log({ error })
    },
  })
}
