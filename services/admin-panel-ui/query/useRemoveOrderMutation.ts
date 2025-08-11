import { useMutation, useQueryClient } from '@tanstack/react-query'

import { $axios } from '@/configs';
import { FetchTags } from '@/constants';

export const useRemoveOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await $axios.delete(`/orders/${id}`,);

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FetchTags.ORDERS], })
    },

    onError: (error) => {
      console.log({ error })
    },
  })
}
