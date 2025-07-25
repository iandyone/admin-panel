import { Injectable } from '@nestjs/common';
import { Credentials, User } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async create(userData: User & Credentials) {
    const createUserDto = new CreateUserDto(userData);

    return await this.db.createUser(createUserDto);
  }

  async findAll() {
    return await this.db.getUsers();
  }

  async findOne(id: number) {
    return await this.db.getUser(id);
  }

  async update(id: number, user: Partial<User>) {
    const updateUserDto = new UpdateUserDto(id, user);

    return await this.db.updateUser(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.db.removeUser(id);
  }
}
