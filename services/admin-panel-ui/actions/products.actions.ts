'use server'

import { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

import { $axios_server } from '@/configs';
import { API_PATH, ERoutes } from '@/constants';
import { Product } from '@/types';


export const prefetchProducts = async () => {

  try {
    const response = await $axios_server.get<Product[]>(API_PATH.PRODUCTS);

    return response.data;
  } catch (error) {
    console.log({ error });

    if (error instanceof AxiosError && error.response?.status === 401) {
      redirect(ERoutes.SIGN_IN)
    }

    return []
  }
}

