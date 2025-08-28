'use server'

import { $axios_server } from '@/configs';
import { API_PATH } from '@/constants';
import { Product } from '@/types';


export const prefetchProducts = async () => {
  try {
    const response = await $axios_server.get<Product[]>(API_PATH.PRODUCTS);

    return response.data;
  } catch (error) {
    console.log({ error });

    return []
  }
}

