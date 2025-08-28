import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserResponse, UsersResponse } from '../../types';
import { formatDateISO } from '../../utils';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.db.createUser(createUserDto);
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
        Credentials: { role },
        _count: { DeliveredOrders },
      }) => ({
        id,
        firstName,
        lastName,
        phone,
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.db.updateUser(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.db.removeUser(id);
  }
}
