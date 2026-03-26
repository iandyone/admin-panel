'use server'

import { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

import { API_PATH, ERoutes } from '@/constants';
import { apiFetcher } from '@/server/lib';
import { Product } from '@/types';


export const prefetchProducts = async () => {
  try {
    const response = await apiFetcher({
      path: API_PATH.PRODUCTS
    })

    const data: Product[] = await response.json();

    return data;
  } catch (error) {
    console.log({ error });

    if (error instanceof AxiosError && error.response?.status === 401) {
      redirect(ERoutes.SIGN_IN)
    }

    return []
  }
}

