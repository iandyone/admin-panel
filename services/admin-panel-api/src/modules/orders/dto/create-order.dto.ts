import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums, OrderStatus } from '@prisma/client';

import {
  CUSTOMER_MAX_LENGTH,
  CUSTOMER_MIN_LENGTH,
  LOCATION_MAX_LENGTH,
  LOCATION_MIN_LENGTH,
} from '../../../constants';

export class CreateOrderDto {
  @ApiProperty({
    minLength: CUSTOMER_MIN_LENGTH,
    maxLength: CUSTOMER_MAX_LENGTH,
  })
  customer: string;

  @ApiProperty({
    minLength: LOCATION_MIN_LENGTH,
    maxLength: LOCATION_MAX_LENGTH,
  })
  location: string;

  @ApiProperty({ minimum: 1 })
  managerId: number;

  @ApiProperty()
  productsIds: number[];

  @ApiPropertyOptional({ minimum: 1 })
  deliverymanId?: number;

  @ApiPropertyOptional({
    enum: $Enums.OrderStatus,
    default: OrderStatus.CREATED,
  })
  status?: string;
}
