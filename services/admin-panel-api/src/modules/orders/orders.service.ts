import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateOrderDto } from './dto/create-order.dto';
import { FindAllOrdersDto } from './dto/find-all-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import {
  OrderData,
  OrderResponse,
  OrdersFindAllProps,
  OrdersResponse,
} from '../../types';
import { filterNullValues } from '../../utils';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class OrdersService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(
    ordersFindAllData: OrdersFindAllProps,
  ): Promise<OrdersResponse> {
    const findAllOrdersDto = new FindAllOrdersDto(ordersFindAllData);

    const orderData = await this.db.getOrders(
      filterNullValues<FindAllOrdersDto>(findAllOrdersDto),
    );

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
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        manager: `${order.Manager.firstName} ${order.Manager.lastName}`,
        managerId: order.managerId,
        deliveryman: `${order.Deliveryman.firstName} ${order.Deliveryman.lastName}`,
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

  async create(orderData: OrderData) {
    const createOrderDto = new CreateOrderDto(orderData);

    return await this.db.createOrder(createOrderDto);
  }

  async update(id: number, orderData: Partial<OrderData>) {
    const updateOrderDto = new UpdateOrderDto(orderData);

    return await this.db.updateOrder(id, updateOrderDto);
  }

  async remove(id: number) {
    return await this.db.removeOrder(id);
  }
}
