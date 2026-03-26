import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATH, ENotificationTypes, FetchTags } from '@/constants';
import { useToast } from '@/hooks';

export const useRemoveOrderMutation = () => {
  const queryClient = useQueryClient();
  const { sendNotification } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api${API_PATH.ORDERS}/${id}`, { method: 'DELETE' });

      const data = await response.json();

      return data;
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
