'use server'

import { $axios_server, auth } from '@/configs';
import { API_PATH, USERS_DEFAULT_FILTER } from '@/constants';
import { DEFAULT_ROWS_PER_PAGE, START_PAGE } from '@/constants/table';
import { EmployeeResponse, UsersResponse } from '@/types';

const { USERS, EMPLOYEE } = API_PATH;

export const prefetchUsers = async (page = START_PAGE, perPage = DEFAULT_ROWS_PER_PAGE, filters = USERS_DEFAULT_FILTER) => {
  const session = await auth();

  try {
    const response = await $axios_server.get<UsersResponse>(USERS, {
      params: {
        page,
        perPage,
        ...filters
      },
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      },
    });

    return response.data;

  } catch (error) {
    console.log(error);

    return {
      total: 0,
      users: []
    }
  }
}


export const prefetchEmployees = async () => {
  try {
    const session = await auth();

    const response = await $axios_server.get<EmployeeResponse>(EMPLOYEE, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      },
    })

    return response.data;
  } catch (error) {
    console.log({ error });

    const nullResponse: EmployeeResponse = {
      deliveryman: [],
      managers: []
    }

    return nullResponse
  }
}
