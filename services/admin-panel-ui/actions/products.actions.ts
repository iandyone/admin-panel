'use server'

import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';

import { API_PATH, ERoutes } from '@/constants';
import { apiFetcher } from '@/server/lib';
import { Product } from '@/types';


export const prefetchProducts = async () => {
  try {
    const response = await apiFetcher({
      path: API_PATH.PRODUCTS
    })

    if (response.status === 401) {
      redirect(ERoutes.SIGN_IN)
    }

    const data: Product[] = await response.json();

    return data;
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    // eslint-disable-next-line no-console
    console.log({ error });

    return []
  }
}

