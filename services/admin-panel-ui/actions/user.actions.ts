'use server'

import { revalidateTag } from 'next/cache';

import { FetchTags } from '@/constants';
import { EUserStatuses } from '@/types';
import { UpdateUserDto } from '@/types/user';

interface Props {
  id: number;
  userData: UpdateUserDto
}

export const getUsers = async () => {
  try {
    const users = await fetch(`http://api:8080/users`, {
      next: { tags: [FetchTags.USERS] },
    });

    return users ? users.json() : [];
  } catch (error) {
    return { error }
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
    const response = await fetch(`http://api:8080/users/${id}`, {
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
