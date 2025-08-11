import { useMutation, useQueryClient } from '@tanstack/react-query'

import { $axios } from '@/configs';
import { FetchTags } from '@/constants';
import { CreateOrderPayload } from '@/types'

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: CreateOrderPayload) => {
      const response = await $axios.post(`/orders`, { ...orderData },);

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
