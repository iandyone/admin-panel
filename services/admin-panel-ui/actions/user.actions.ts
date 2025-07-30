'use server'

import { revalidateTag } from 'next/cache';

import { FetchTags } from '@/constants';
import { EUserStatuses } from '@/types';
import { UpdateUserDto } from '@/types/user';

interface Props {
  id: number;
  userData: UpdateUserDto
}

const API_BASE_PATH = process.env.NEXT_PUBLIC_API_BASE_PATH;

export const getUsers = async () => {
  try {


    const users = await fetch(`${API_BASE_PATH}/users`, {
      next: { tags: [FetchTags.USERS] },
    });

    return users ? users.json() : [];
  } catch (error) {
    console.log({ error })

    return []
  }
}

export const updateUserAction = async ({ id, userData: { firstName, lastName, role, status, phone } }: Props) => {

  const updatedUser = {
    firstName,
    lastName,
    phone,
    role: role.toUpperCase(),
    isActive: status === EUserStatuses.ACTIVE,
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
