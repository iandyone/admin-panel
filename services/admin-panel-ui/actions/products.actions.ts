'use server'


import { $axios_server } from '@/configs';
import { Product } from '@/types';


export const prefetchProducts = async () => {
  try {
    const response = await $axios_server.get<Product[]>('products');

    return response.data;
  } catch (error) {
    console.log({ error });

    return []
  }
}

