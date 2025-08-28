import { useMutation, useQueryClient } from '@tanstack/react-query'

import { $axios } from '@/configs';
import { API_PATH, FetchTags } from '@/constants';
import { UpdateOrderPayload } from '@/types'

export const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...orderData }: UpdateOrderPayload) => {
      const response = await $axios.patch(`${API_PATH.ORDERS}/${id}`, { ...orderData },);

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
