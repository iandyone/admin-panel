'use server'

import { revalidateTag } from 'next/cache';

import { $axios_server } from '@/configs';
import { FetchTags, USERS_DEFAULT_FILTER } from '@/constants';
import { DEFAULT_ROWS_PER_PAGE, START_PAGE } from '@/constants/table';
import { UsersResponse } from '@/types';
import { UpdateUserDto } from '@/types/user';

interface Props {
  id: number;
  userData: UpdateUserDto
}

const API_BASE_PATH = process.env.NEXT_PUBLIC_API_BASE_PATH;

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


export const updateUserAction = async ({ id, userData: { firstName, lastName, role, isActive, phone } }: Props) => {
  const updatedUser = {
    firstName,
    lastName,
    phone,
    role: role.toUpperCase(),
    isActive,
  }


  try {
    const response = await fetch(`${API_BASE_PATH}/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
      }
    })

    revalidateTag(FetchTags.USERS)

    return response.json()

  } catch (error) {
    return { error }
  }


}
