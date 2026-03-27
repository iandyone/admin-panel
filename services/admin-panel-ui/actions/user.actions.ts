/* eslint-disable no-console */
'use server'

import { isRedirectError } from 'next/dist/client/components/redirect-error';
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

    if (response.status === 401) {
      // redirect() выбрасывает специальную ошибку NEXT_REDIRECT
      redirect(ERoutes.SIGN_IN)
    }

    const data: UsersResponse = await response.json()

    return data;
  } catch (error) {
    if (isRedirectError(error)) {
      // Ошибка пробрасывается дальше. В клиентском запросе получим правильный статус-код - 401
      throw error;
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

    if (response.status === 401) {
      redirect(ERoutes.SIGN_IN)
    }

    const data: EmployeeResponse = await response.json();

    return data;
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    const EMPTY_EMPLOYEES: EmployeeResponse = {
      deliveryman: [],
      managers: []
    }

    console.log({ error });

    return EMPTY_EMPLOYEES
  }
}
