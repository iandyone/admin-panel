import { useQuery } from '@tanstack/react-query';

import { $axios } from '@/configs';
import { API_PATH, ENotificationTypes, FetchTags } from '@/constants';
import { useToast } from '@/hooks';
import { Product } from '@/types';


export const useGetProductsQuery = () => {
  const { sendNotification } = useToast();

  return (
    useQuery({
      queryKey: [FetchTags.PRODUCTS],
      queryFn: async () => {
        try {
          const response = await $axios.get<Product[]>(API_PATH.PRODUCTS);

          return response.data;
        } catch (error) {
          sendNotification(ENotificationTypes.PRODUCTS_FETCHING_ERROR);
          console.log({ error });

          return []
        }
      }
    })
  )
}
