import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUsersDto } from './dto/find-all-users.dto';

import {
  UpdateUserServiceProps,
  UserResponse,
  UsersResponse,
} from '../../types';
import { formatDateISO } from '../../utils';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async create(createUserDto: CreateUserDto, accountId: number) {
    return await this.db.createUser(createUserDto, accountId);
  }

  async findAll(findAllUserDto: FindAllUsersDto): Promise<UsersResponse> {
    const { users, total } = await this.db.getUsers(findAllUserDto);

    const formattedUsers: UserResponse[] = users.map(
      ({
        id,
        firstName,
        lastName,
        phone,
        lastActivity,
        isActive,
        Credentials: { role, email },
        _count: { DeliveredOrders },
      }) => ({
        id,
        firstName,
        lastName,
        phone,
        email,
        role,
        lastActivity: lastActivity ? formatDateISO(lastActivity) : null,
        orders: DeliveredOrders,
        isActive,
      }),
    );

    return { users: formattedUsers, total };
  }

  async findByEmail(email: string) {
    return await this.db.getUserByEmail(email);
  }

  async findOne(id: number) {
    return await this.db.getUser(id);
  }

  async update({ id, updateUserDto, accountId }: UpdateUserServiceProps) {
    return await this.db.updateUser({ id, updateUserDto, accountId });
  }

  async remove(id: number, accountId: number) {
    return await this.db.removeUser(id, accountId);
  }
}
