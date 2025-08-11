'use server'


import { $axios_server } from '@/configs';
import { USERS_DEFAULT_FILTER } from '@/constants';
import { DEFAULT_ROWS_PER_PAGE, START_PAGE } from '@/constants/table';
import { EmployeeResponse, UsersResponse } from '@/types';


export const prefetchUsers = async (page = START_PAGE, perPage = DEFAULT_ROWS_PER_PAGE, filters = USERS_DEFAULT_FILTER) => {
  try {
    const response = await $axios_server.get<UsersResponse>(`/users`, {
      params: {
        page,
        perPage,
        ...filters
      }
    });
    const usersData = response.data;

    return usersData;
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
    const response = await $axios_server.get<EmployeeResponse>('employee')

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
