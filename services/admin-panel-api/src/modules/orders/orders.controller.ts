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
  Req,
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { FindAllOrdersDto } from './dto/find-all-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

import { Auth, Roles, UseId } from '../../decorators';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { UserAuthDtoProps } from '../../types';
import {
  idSchema,
  createOrderSchema,
  updateOrderSchema,
  findAllOrdersSchema,
} from '../../validations';

@Auth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @UsePipes(new JoiValidationPipe(findAllOrdersSchema))
  findAll(@Query() query: FindAllOrdersDto) {
    return this.ordersService.findAll(query);
  }

  @Get(':id')
  @UseId()
  findOne(@Param('id') id: number) {
    return this.ordersService.findOne(id);
  }

  @Post()
  @Roles(['ADMIN', 'MANAGER'])
  @UsePipes(new JoiValidationPipe(createOrderSchema))
  create(@Body() orderData: CreateOrderDto, @Req() request) {
    const { id: accountId }: UserAuthDtoProps = request['user'];

    return this.ordersService.create(orderData, accountId);
  }

  @Patch(':id')
  update(
    @Param('id', new JoiValidationPipe(idSchema), ParseIntPipe) id: number,
    @Body(new JoiValidationPipe(updateOrderSchema)) order: UpdateOrderDto,
    @Req() request,
  ) {
    const { id: accountId }: UserAuthDtoProps = request['user'];

    return this.ordersService.update({ id, order, accountId });
  }

  @Delete(':id')
  @Roles(['ADMIN', 'MANAGER'])
  @UseId()
  async remove(@Param('id') id: number, @Req() request) {
    const { id: accountId }: UserAuthDtoProps = request['user'];

    return this.ordersService.remove(id, accountId);
  }
}
