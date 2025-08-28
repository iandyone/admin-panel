import { useQuery } from '@tanstack/react-query';

import { $axios } from '@/configs';
import { API_PATH, FetchTags } from '@/constants';
import { Product } from '@/types';

export const useGetProductsQuery = () => (
  useQuery({
    queryKey: [FetchTags.PRODUCTS],
    queryFn: async () => {
      try {
        const response = await $axios.get<Product[]>(API_PATH.PRODUCTS);

        return response.data;
      } catch (error) {
        console.log({ error });

        return []
      }
    }
  })
)
