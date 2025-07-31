import { Injectable } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { OrderData, PaginationProps } from '../../types';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class OrdersService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(paginationProps: PaginationProps) {
    return await this.db.getOrders(paginationProps);
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
