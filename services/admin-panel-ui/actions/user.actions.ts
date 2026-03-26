'use server'

import { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

import { API_PATH, ERoutes, USERS_DEFAULT_FILTER } from '@/constants';
import { DEFAULT_ROWS_PER_PAGE, START_PAGE } from '@/constants/table';
import { apiFetcher } from '@/server/lib';
import { EmployeeResponse, UsersResponse, } from '@/types';

const { USERS, EMPLOYEE } = API_PATH;


export const prefetchUsers = async (page = START_PAGE, perPage = DEFAULT_ROWS_PER_PAGE, filters = USERS_DEFAULT_FILTER) => {
  try {
    const response = await apiFetcher({
      path: USERS, init: {
        method: 'GET',
        params: {
          page,
          perPage,
          ...filters
        }
      }
    })

    const data: UsersResponse = await response.json()

    return data;
  } catch (error) {
    // TODO: больше не AxiosError
    if (error instanceof AxiosError && error.response?.status === 401) {
      redirect(ERoutes.SIGN_IN)
    }

    console.log(error);

    return {
      total: 0,
      users: []
    }
  }
}


export const prefetchEmployees = async () => {
  try {
    const response = await apiFetcher({
      path: EMPLOYEE,
    });

    const data: EmployeeResponse = await response.json();

    return data;
  } catch (error) {
    console.log({ error });

    if (error instanceof AxiosError && error.response?.status === 401) {
      redirect(ERoutes.SIGN_IN)
    }

    const nullResponse: EmployeeResponse = {
      deliveryman: [],
      managers: []
    }

    return nullResponse
  }
}
