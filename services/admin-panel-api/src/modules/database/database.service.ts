import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { $Enums, OrderStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt';

import { OrdersStatisticByStatus } from './entities/orders-statistic-by-status.entity';
import { SoldProductStatistic } from './entities/sold-product.entity';
import { StatisticChart } from './entities/statistic-chart.entity';
import { TrendsItemEntity } from './entities/trends.entity';
import { PrismaService } from './prisma.service';

import { DEFAULT_PER_PAGE, START_PAGE } from '../../constants';
import { getOrderItemsFromProductsIds } from '../../utils';
import { DashboardStatisticDto } from '../dashboard/dto/get-statistic.dto';
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
        include: {
          Credentials: true,
          _count: {
            select: {
              DeliveredOrders: {
                where: {
                  status: {
                    equals: OrderStatus.COMPLETED,
                  },
                },
              },
            },
          },
        },
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
        `User with id ${id} was not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.credentials.findUnique({
      where: { email },
      include: {
        User: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            isActive: true,
            Credentials: {
              select: {
                role: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new HttpException(
        { field: 'email', message: `User with email ${email} was not found` },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { firstName, lastName, phone, email, role, isActive } = createUserDto;

    const userData = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        phone,
        isActive,
        Credentials: {
          create: {
            email,
            role: $Enums.Role[role.toUpperCase()],
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
    const { role, password, ...updateUserData } = user;

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...updateUserData,
        Credentials: { update: { role: $Enums.Role[role.toUpperCase()] } },
      },
      omit: {
        updatedAt: true,
        createdAt: true,
      },
    });

    if (password) {
      const hash = await bcrypt.hash(user.password, 5);

      await this.prisma.credentials.update({
        where: {
          userId,
        },
        data: {
          password: hash,
        },
      });
    }

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
        `Order with id ${id} was not found`,
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
    } = createOrderDto;

    const productsData = getOrderItemsFromProductsIds(productsIds);

    const config = {
      location,
      customer,
      status: OrderStatus[status],
      Manager: { connect: { id: managerId } },
      OrderItems: { createMany: { data: productsData } },
    };

    if (deliverymanId) {
      config['Deliveryman'] = { connect: { id: deliverymanId } };
    }

    const order = await this.prisma.order.create({
      data: config,
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
    } = order;

    const products = await this.prisma.product.findMany();
    const orderProducts = products.filter(({ id }) => productsIds.includes(id));

    const orderItemsData = orderProducts.map(({ id, amount }) => ({
      orderId,
      productId: id,
      quantity: 1,
      amount: amount,
    }));

    const updateConfig = {
      location,
      customer,
      status: $Enums.OrderStatus[status],
      Manager: {
        connect: { id: managerId },
      },

      totalAmount: orderProducts.reduce(
        (acc, { amount }) => amount.plus(acc),
        new Decimal(0),
      ),
    };

    if (deliverymanId) {
      updateConfig['Deliveryman'] = {
        connect: { id: deliverymanId },
      };
    }

    const updatedOrderData = await this.prisma.$transaction([
      this.prisma.ordersItems.deleteMany({ where: { orderId } }),
      this.prisma.order.update({
        where: { id: orderId },
        data: updateConfig,
      }),
      this.prisma.ordersItems.createMany({
        data: orderItemsData,
      }),
    ]);

    return updatedOrderData[1];
  }

  async getEmployees() {
    const [managers, deliveryman] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where: {
          Credentials: {
            role: {
              not: $Enums.Role.DELIVERY,
            },
          },
        },

        select: {
          id: true,
          firstName: true,
          lastName: true,
          Credentials: {
            select: {
              role: true,
            },
          },
        },
      }),
      this.prisma.user.findMany({
        where: {
          Credentials: {
            role: $Enums.Role.DELIVERY,
          },
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          Credentials: {
            select: {
              role: true,
            },
          },
        },
      }),
    ]);

    return {
      managers,
      deliveryman,
    };
  }

  async getProducts() {
    return await this.prisma.product.findMany();
  }

  async getDashboardStatistic({ dateFrom, dateTo }: DashboardStatisticDto) {
    const fromDate: Date | null = dateFrom ? new Date(dateFrom) : null;
    const toDate: Date | null = dateTo ? new Date(dateTo) : null;

    const statisticData = await this.prisma.order.groupBy({
      by: ['status'],
      _count: { _all: true },
      _sum: { totalAmount: true },
      where: {
        createdAt: {
          gte: fromDate ?? undefined,
          lte: toDate ?? undefined,
        },
      },
    });

    const chartData = await this.prisma.$queryRaw<StatisticChart[]>`
    SELECT
      created_at::date AS order_date,
      to_char(created_at::date, 'DD.MM.YYYY') AS day,
      COALESCE(
        SUM(total_amount) FILTER (WHERE status = ${OrderStatus.COMPLETED}::"OrderStatus"),
        0
      ) AS benefit,
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE status = ${OrderStatus.COMPLETED}::"OrderStatus")::int AS completed,
      COUNT(*) FILTER (WHERE status = ${OrderStatus.CANCELLED}::"OrderStatus")::int AS cancelled
    FROM "orders"
    WHERE
      (${fromDate}::timestamp IS NULL OR created_at >= ${fromDate}::timestamp)
      AND (${toDate}::timestamp   IS NULL OR created_at <= ${toDate}::timestamp)
    GROUP BY order_date
    ORDER BY order_date
  `;

    const statistic = statisticData.reduce(
      (acc, { status, _count, _sum }) => {
        acc.total += _count._all;

        if (status === OrderStatus.COMPLETED) {
          acc.completed += _count._all;
          acc.benefit = acc.benefit.plus(_sum.totalAmount ?? 0);
        }

        if (status === OrderStatus.CANCELLED) {
          acc.cancelled += _count._all;
        }

        return acc;
      },
      { total: 0, completed: 0, cancelled: 0, benefit: new Decimal(0) },
    );

    const charts = chartData.reduce(
      (acc, { total, cancelled, completed, benefit, day }) => {
        acc.total.data.push(total);
        acc.total.days.push(day);

        acc.completed.data.push(completed);
        acc.completed.days.push(day);

        acc.cancelled.data.push(cancelled);
        acc.cancelled.days.push(day);

        acc.benefit.data.push(benefit.toNumber());
        acc.benefit.days.push(day);

        return acc;
      },
      {
        total: { data: [] as number[], days: [] as string[] },
        completed: { data: [] as number[], days: [] as string[] },
        cancelled: { data: [] as number[], days: [] as string[] },
        benefit: { data: [] as number[], days: [] as string[] },
      },
    );

    return {
      total: { count: statistic.total, ...charts.total },
      completed: { count: statistic.completed, ...charts.completed },
      cancelled: { count: statistic.cancelled, ...charts.cancelled },
      benefit: { count: statistic.benefit, ...charts.benefit },
    };
  }

  async getDashboardTrends({ dateFrom, dateTo }: DashboardStatisticDto) {
    const fromDate: Date | null = dateFrom ? new Date(dateFrom) : null;
    const toDate: Date | null = dateTo ? new Date(dateTo) : null;

    const data = await this.prisma.$queryRaw<TrendsItemEntity[]>`
      SELECT 
        oi.product_id AS product_id,
        p.name,
        p.category,
        p.amount AS amount,
        COUNT(DISTINCT oi.order_id)::INT     AS order_count,
        SUM(oi.quantity)::INT                AS total_quantity,
        SUM(oi.amount * oi.quantity)::NUMERIC(14,2) AS total_amount
      FROM orders_items oi
      JOIN orders   o ON o.id = oi.order_id
      JOIN products p ON p.id = oi.product_id
      WHERE (${fromDate}::timestamp IS NULL OR o.created_at >= ${fromDate}::timestamp)
        AND (${toDate}::timestamp   IS NULL OR o.created_at <  ${toDate}::timestamp)
      GROUP BY oi.product_id, p.name, p.category, p.amount
      ORDER BY total_quantity DESC, total_amount DESC, p.name DESC
      LIMIT 5
    `;

    return data;
  }

  async getDashboardOrders({ dateFrom, dateTo }: DashboardStatisticDto) {
    const fromDate: Date | null = dateFrom ? new Date(dateFrom) : null;
    const toDate: Date | null = dateTo ? new Date(dateTo) : null;

    const stats = await this.prisma.$queryRaw<OrdersStatisticByStatus[]>`
      SELECT
        status,
        COUNT(*)::INT AS total,
        ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) AS percent
      FROM orders o
      WHERE (${fromDate}::timestamp IS NULL OR o.created_at >= ${fromDate}::timestamp)
        AND (${toDate}::timestamp   IS NULL OR o.created_at <  ${toDate}::timestamp)
      GROUP BY status
    `;

    return stats;
  }

  async getDashboardSoldProducts({ dateFrom, dateTo }: DashboardStatisticDto) {
    const fromDate: Date | null = dateFrom ? new Date(dateFrom) : null;
    const toDate: Date | null = dateTo ? new Date(dateTo) : null;

    const stats = await this.prisma.$queryRaw<SoldProductStatistic[]>`
      SELECT
        p.category,
        ROUND(SUM(oi.quantity) * 100.0 / SUM(SUM(oi.quantity)) OVER (), 2) AS percent
      FROM products p
      JOIN orders_items oi ON p.id = oi.product_id
      JOIN orders o ON o.id = oi.order_id
      WHERE o.status IN ('COMPLETED')
        AND (${fromDate}::timestamp IS NULL OR o.created_at >= ${fromDate}::timestamp)
        AND (${toDate}::timestamp   IS NULL OR o.created_at <  ${toDate}::timestamp)
      GROUP BY p.category, oi.quantity
      ORDER BY percent DESC;
    `;

    return stats;
  }
}
