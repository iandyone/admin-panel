import { useQuery } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

import { API_PATH, ENotificationTypes, ERoutes, FetchTags } from '@/constants';
import { useToast } from '@/hooks';
import { Product } from '@/types';

const { PRODUCTS_FETCHING_ERROR, SESSION_EXPIRED } = ENotificationTypes;

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
          if (error instanceof Error && error.message.startsWith('Unauthorized')) {
            sendNotification(SESSION_EXPIRED);

            return await signOut({ redirectTo: `/${ERoutes.SIGN_IN}` });
          }

          sendNotification(PRODUCTS_FETCHING_ERROR);
          console.log({ error });

          return []
        }
      }
    })
  )
}
