import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateOrderDto } from './dto/create-order.dto';
import { FindAllOrdersDto } from './dto/find-all-orders.dto';

import {
  OrderResponse,
  OrdersResponse,
  UpdateOrderServiceProps,
} from '../../types';
import { formatDateISO } from '../../utils';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class OrdersService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(findAllOrdersDto: FindAllOrdersDto): Promise<OrdersResponse> {
    const orderData = await this.db.getOrders(findAllOrdersDto);

    const orders: OrderResponse[] = orderData.orders.map((order) => {
      const { orderItems, totalPrice } = order.OrderItems.reduce(
        (acc, { Product }) => {
          const price = Product?.amount ?? new Prisma.Decimal(0);

          return {
            orderItems: Product
              ? [...acc.orderItems, Product.name]
              : acc.orderItems,
            totalPrice: acc.totalPrice.add(price),
          };
        },
        { orderItems: [] as string[], totalPrice: new Prisma.Decimal(0) },
      );

      return {
        id: order.id,
        order: orderItems,
        totalAmount: totalPrice.toNumber(),
        location: order.location,
        customer: order.customer,
        updatedAt: formatDateISO(order.updatedAt, { timeZone: 'Europe/Minsk' }),
        createdAt: formatDateISO(order.createdAt, { timeZone: 'Europe/Minsk' }),
        manager: `${order.Manager.firstName} ${order.Manager.lastName}`,
        managerId: order.managerId,
        deliveryman: order.Deliveryman
          ? `${order.Deliveryman.firstName} ${order.Deliveryman.lastName}`
          : '—',
        deliverymanId: order.deliverymanId,
        status: order.status,
      };
    });

    return {
      orders,
      total: orderData.total,
    };
  }

  async findOne(id: number) {
    return await this.db.getOrder(id);
  }

  async create(createOrderDto: CreateOrderDto, accountId: number) {
    return await this.db.createOrder(createOrderDto, accountId);
  }

  async update(updateOrderProps: UpdateOrderServiceProps) {
    return await this.db.updateOrder(updateOrderProps);
  }

  async remove(id: number, accountId: number) {
    return await this.db.removeOrder(id, accountId);
  }
}
