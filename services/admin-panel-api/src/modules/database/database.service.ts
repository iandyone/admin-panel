import {
  HttpStatus,
  HttpException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { $Enums, OrderStatus, Prisma, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

import { PrismaService } from './prisma.service';

import { DEFAULT_PER_PAGE, START_PAGE } from '../../constants';
import { filterNullValues, getOrderItemsFromProductsIds } from '../../utils';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { FindAllOrdersDto } from '../orders/dto/find-all-orders.dto';
import { UpdateOrderDto } from '../orders/dto/update-order.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { FindAllUsersDto } from '../users/dto/find-all-users.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Injectable()
export class DatabaseService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers({
    page = START_PAGE,
    perPage = DEFAULT_PER_PAGE,
    ...filters
  }: FindAllUsersDto) {
    const usersFilter = Object.keys(filters).reduce((acc, key) => {
      const filterValue = filters[key];
      const filter =
        typeof filterValue === 'number'
          ? { equals: filterValue }
          : { startsWith: filterValue, mode: 'insensitive' };

      if (key === 'role') {
        return {
          ...acc,
          Credentials: {
            role: $Enums.Role[filters.role.toLocaleUpperCase()],
          },
        };
      }

      if (key === 'isActive') {
        return {
          ...acc,
          isActive: {
            equals: filters.isActive,
          },
        };
      }

      if (key === 'dateFrom' || key === 'dateTo') {
        const filterFrom = filters.dateFrom
          ? { gte: new Date(filters.dateFrom) }
          : {};
        const filterTo = filters.dateTo
          ? { lte: new Date(filters.dateTo) }
          : {};

        return {
          ...acc,
          lastActivity: {
            ...filterFrom,
            ...filterTo,
          },
        };
      }

      return {
        ...acc,
        [key]: { ...filter },
      };
    }, {});

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where: usersFilter,
        include: { Credentials: true },
        orderBy: { id: 'asc' },
        skip: page * perPage,
        take: perPage,
      }),
      this.prisma.user.count({ where: { ...usersFilter } }),
    ]);

    return {
      users,
      total: Math.ceil(total),
    };
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
      omit: {
        updatedAt: true,
        createdAt: true,
      },
    });

    return updatedUser;
  }

  async getOrders({
    page = START_PAGE,
    perPage = DEFAULT_PER_PAGE,
    ...filters
  }: FindAllOrdersDto) {
    const ordersFilter = Object.keys(filters).reduce((acc, key) => {
      const filterValue = filters[key];
      const filter =
        typeof filterValue === 'number'
          ? { equals: filterValue }
          : { startsWith: filterValue, mode: 'insensitive' };

      if (key === 'status') {
        return {
          ...acc,
          status: {
            equals: $Enums.OrderStatus[filters.status.toUpperCase()],
          },
        };
      }

      if (key === 'manager') {
        return {
          ...acc,
          Manager: {
            is: {
              firstName: filter,
            },
          },
        };
      }

      if (key === 'dateFromCreated' || key === 'dateToCreated') {
        const filterFrom = filters.dateFromCreated
          ? { gte: new Date(filters.dateFromCreated) }
          : {};
        const filterTo = filters.dateToCreated
          ? { lte: new Date(filters.dateToCreated) }
          : {};

        return {
          ...acc,
          createdAt: {
            ...filterFrom,
            ...filterTo,
          },
        };
      }

      if (key === 'dateFromUpdated' || key === 'dateToUpdated') {
        const filterFrom = filters.dateFromUpdated
          ? { gte: new Date(filters.dateFromUpdated) }
          : {};
        const filterTo = filters.dateToUpdated
          ? { lte: new Date(filters.dateToUpdated) }
          : {};

        return {
          ...acc,
          updatedAt: {
            ...filterFrom,
            ...filterTo,
          },
        };
      }

      if (key === 'deliveryman') {
        return {
          ...acc,
          Deliveryman: {
            firstName: filter,
          },
        };
      }

      if (key === 'order') {
        return {
          ...acc,
          OrderItems: {
            some: {
              Product: {
                name: filter,
              },
            },
          },
        };
      }

      return {
        ...acc,
        [key]: filter,
      };
    }, {});

    const [orders, total] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        where: ordersFilter,
        skip: page * perPage,
        take: perPage,
        orderBy: { id: 'asc' },
        include: {
          OrderItems: {
            select: {
              Product: {
                select: {
                  name: true,
                  amount: true,
                },
              },
            },
          },
          Manager: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          Deliveryman: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      }),

      this.prisma.order.count({ where: ordersFilter }),
    ]);

    return {
      orders,
      total: Math.ceil(total),
    };
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
