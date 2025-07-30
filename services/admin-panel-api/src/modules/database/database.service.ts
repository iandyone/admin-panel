import {
  HttpStatus,
  HttpException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { $Enums, OrderStatus, Prisma, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

import { PrismaService } from './prisma.service';

import { filterNullValues, getOrderItemsFromProductsIds } from '../../utils';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { UpdateOrderDto } from '../orders/dto/update-order.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Injectable()
export class DatabaseService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    const users = await this.prisma.user.findMany({
      include: { Credentials: true },
      orderBy: { id: 'asc' },
    });

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

  async createUser(createUserDto: CreateUserDto) {
    const { firstName, lastName, phone, email, password } = createUserDto;

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
    const { role, ...updateUserData } = filterNullValues<UpdateUserDto>(user);

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...updateUserData,
        Credentials: { update: { role: $Enums.Role[role] } },
      },
    });

    return updatedUser.id;
  }

  async getOrders() {
    const orders = await this.prisma.order.findMany();

    return orders;
  }

  async getOrder(id: number) {
    const user = await this.prisma.order.findUnique({ where: { id } });

    if (!user) {
      throw new HttpException(
        `Order with id ${id} was not founded`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const {
      customer,
      location,
      managerId,
      productsIds,
      status,
      deliverymanId,
    } = filterNullValues<CreateOrderDto>(createOrderDto);

    const productsData = getOrderItemsFromProductsIds(productsIds);

    const order = await this.prisma.order.create({
      data: {
        location,
        customer,
        status: OrderStatus[status],
        Manager: { connect: { id: managerId } },
        OrderItems: { createMany: { data: productsData } },
        Deliveryman: { connect: { id: deliverymanId } },
      },
    });

    return order;
  }

  async removeOrder(id: number) {
    const { id: orderId } = await this.getOrder(id);

    const [orderData, order] = await this.prisma.$transaction([
      this.prisma.ordersItems.deleteMany({ where: { orderId } }),
      this.prisma.order.delete({ where: { id: orderId } }),
    ]);

    return `Order: ${order.id} / Order items: ${orderData.count}`;
  }

  async updateOrder(id: number, order: UpdateOrderDto) {
    const { id: orderId } = await this.getOrder(id);
    const {
      productsIds,
      managerId,
      deliverymanId,
      customer,
      location,
      status,
    } = filterNullValues<UpdateOrderDto>(order);

    const data: Prisma.OrderUpdateInput = {};

    const productsData = getOrderItemsFromProductsIds(productsIds);

    if (location) data.location = location;

    if (customer) data.customer = customer;

    if (status) data.status = OrderStatus[status];

    if (deliverymanId) {
      const newDeliveryman = await this.prisma.credentials.findUnique({
        where: { id: deliverymanId, role: Role.DELIVERY },
      });

      if (!newDeliveryman) {
        return new BadRequestException({
          message: `Deliveryman with id ${deliverymanId} is not exists`,
        });
      }

      data.Deliveryman = { connect: { id: newDeliveryman.id } };
    }

    if (managerId) {
      const newManager = await this.prisma.credentials.findUnique({
        where: { id: deliverymanId, role: Role.MANAGER },
      });

      if (!newManager) {
        return new BadRequestException({
          message: `Manager with id ${managerId} is not exists`,
        });
      }

      data.Manager = { connect: { id: newManager.id } };
    }

    if (productsIds) {
      data.OrderItems = { createMany: { data: productsData } };
    }

    const updatedOrderData = await this.prisma.$transaction([
      this.prisma.ordersItems.deleteMany({ where: { orderId } }),
      this.prisma.order.update({
        where: { id: orderId },
        data: { ...data },
      }),
    ]);

    return updatedOrderData[1];
  }
}
