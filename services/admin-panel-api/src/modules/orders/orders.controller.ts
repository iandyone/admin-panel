import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  ParseIntPipe,
  Patch,
  UsePipes,
  Query,
} from '@nestjs/common';
import { Order } from '@prisma/client';

import { OrdersService } from './orders.service';

import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { OrderData, OrdersFindAllProps } from '../../types';
import {
  idSchema,
  createOrderSchema,
  updateOrderSchema,
  findAllOrdersSchema,
} from '../../validations';
import { UseId } from '../decorators';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @UsePipes(new JoiValidationPipe(findAllOrdersSchema))
  findAll(@Query() query: OrdersFindAllProps) {
    return this.ordersService.findAll(query);
  }

  @Get(':id')
  @UseId()
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createOrderSchema))
  create(@Body() orderData: OrderData) {
    return this.ordersService.create(orderData);
  }

  @Patch(':id')
  update(
    @Param('id', new JoiValidationPipe(idSchema), ParseIntPipe) id: number,
    @Body(new JoiValidationPipe(updateOrderSchema)) order: Partial<Order>,
  ) {
    return this.ordersService.update(id, order);
  }

  @Delete(':id')
  @UseId()
  async remove(@Param('id') id: number) {
    return this.ordersService.remove(id);
  }
}
