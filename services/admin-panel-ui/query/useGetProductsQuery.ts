import { useQuery } from '@tanstack/react-query';

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
          const response = await fetch(`/api${API_PATH.PRODUCTS}`);

          const data: Product[] = await response.json();

          return data;
        } catch (error) {
          sendNotification(ENotificationTypes.PRODUCTS_FETCHING_ERROR);
          console.log({ error });

          return []
        }
      }
    })
  )
}
