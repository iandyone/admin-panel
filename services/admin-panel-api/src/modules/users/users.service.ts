import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import {
  UserData,
  UserResponse,
  UsersFindAllProps,
  UsersResponse,
} from '../../types';
import { filterNullValues } from '../../utils';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async create(userData: UserData) {
    const createUserDto = new CreateUserDto(userData);

    return await this.db.createUser(createUserDto);
  }

  async findAll(usersFindAllData: UsersFindAllProps): Promise<UsersResponse> {
    const findAllUserDto = new FindAllUsersDto(usersFindAllData);
    const { users, total } = await this.db.getUsers(
      filterNullValues<FindAllUsersDto>(findAllUserDto),
    );

    const formattedUsers: UserResponse[] = users.map(
      ({
        id,
        firstName,
        lastName,
        phone,
        lastActivity,
        orders,
        isActive,
        Credentials: { role },
      }) => ({
        id,
        firstName,
        lastName,
        phone,
        role,
        lastActivity: lastActivity ? new Date(lastActivity).getTime() : null,
        orders,
        isActive,
      }),
    );

    return { users: formattedUsers, total };
  }

  async findOne(id: number) {
    return await this.db.getUser(id);
  }

  async update(id: number, user: Partial<User> & { role: string }) {
    const updateUserDto = new UpdateUserDto(user);

    return await this.db.updateUser(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.db.removeUser(id);
  }
}
