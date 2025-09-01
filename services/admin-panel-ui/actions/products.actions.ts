'use server'

import { $axios_server, auth } from '@/configs';
import { API_PATH } from '@/constants';
import { Product } from '@/types';


export const prefetchProducts = async () => {
  const session = await auth();

  try {
    const response = await $axios_server.get<Product[]>(API_PATH.PRODUCTS, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.log({ error });

    return []
  }
}

