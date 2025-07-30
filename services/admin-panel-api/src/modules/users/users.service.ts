import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserData, UserResponse, UsersResponse } from '../../types';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async create(userData: UserData) {
    const createUserDto = new CreateUserDto(userData);

    return await this.db.createUser(createUserDto);
  }

  async findAll(): Promise<UsersResponse> {
    const usersData = await this.db.getUsers();

    const users: UserResponse[] = usersData.map(
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
        lastActivity: lastActivity
          ? new Date(lastActivity).toLocaleDateString()
          : null,
        orders,
        isActive,
      }),
    );

    return users;
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
