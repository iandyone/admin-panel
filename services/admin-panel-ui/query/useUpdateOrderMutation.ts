import { useMutation, useQueryClient } from '@tanstack/react-query'

import { $axios } from '@/configs';
import { FetchTags } from '@/constants';
import { UpdateOrderPayload } from '@/types'

export const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...orderData }: UpdateOrderPayload) => {
      const response = await $axios.patch(`/orders/${id}`, { ...orderData },);

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
