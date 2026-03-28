/* eslint-disable no-console */
import { useQuery } from '@tanstack/react-query';

import { API_PATH, ENotificationTypes, FetchTags } from '@/constants';
import { useToast } from '@/hooks';
import { Product } from '@/types';
import { isUnauthorizedError, signOutAndRedirect } from '@/utils';

const { PRODUCTS_FETCHING_ERROR, SESSION_EXPIRED } = ENotificationTypes;

export const useGetProductsQuery = () => {
  const { sendNotification } = useToast();

  return (
    useQuery({
      queryKey: [FetchTags.PRODUCTS],
      queryFn: async () => {
        try {
          const response = await fetch(`/api${API_PATH.PRODUCTS}`);

          if (!response.ok) {
            throw new Error('Request failed', { cause: response });
          }

          const data: Product[] = await response.json();

          return data;
        } catch (error) {
          console.log({ error });

          if (isUnauthorizedError(error)) {
            return await signOutAndRedirect(() => sendNotification(SESSION_EXPIRED));
          }

          sendNotification(PRODUCTS_FETCHING_ERROR);

          return []
        }
      }
    })
  )
}
