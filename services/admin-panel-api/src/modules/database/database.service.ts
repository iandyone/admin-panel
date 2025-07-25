import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { PrismaService } from './prisma.service';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Injectable()
export class DatabaseService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    const users = await this.prisma.user.findMany();

    return users;
  }
  async getUser(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new HttpException(
        `User with id ${id} was not founded`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async createUser({
    firstName,
    lastName,
    phone,
    email,
    password,
  }: CreateUserDto) {
    const userData = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        phone,
        Credentials: {
          create: {
            email,
            password: await bcrypt.hash(password, 5),
          },
        },
      },
    });

    return userData;
  }

  async removeUser(id: number) {
    const { id: userId } = await this.getUser(id);

    const [userData] = await this.prisma.$transaction([
      this.prisma.credentials.delete({ where: { userId } }),
      this.prisma.user.delete({ where: { id: userId } }),
    ]);

    return userData.id;
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const { id: userId } = await this.getUser(id);

    const updateUserData = Object.keys(user).reduce((acc, key) => {
      return user[key] ? { ...acc, [key]: user[key] } : acc;
    }, {});

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { ...updateUserData },
    });

    return updatedUser.id;
  }
}
