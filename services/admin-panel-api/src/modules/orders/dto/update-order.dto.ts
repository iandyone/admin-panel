import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

import {
  CUSTOMER_MAX_LENGTH,
  CUSTOMER_MIN_LENGTH,
  LOCATION_MAX_LENGTH,
  LOCATION_MIN_LENGTH,
} from '../../../constants';

export class UpdateOrderDto {
  @ApiProperty({
    minLength: LOCATION_MIN_LENGTH,
    maxLength: LOCATION_MAX_LENGTH,
  })
  location?: string;

  @ApiProperty({
    minLength: CUSTOMER_MIN_LENGTH,
    maxLength: CUSTOMER_MAX_LENGTH,
  })
  customer?: string;

  @ApiProperty({ minimum: 1 })
  managerId?: number;

  @ApiProperty()
  productsIds?: number[];

  @ApiPropertyOptional({ minimum: 1 })
  deliverymanId?: number;

  @ApiProperty({ enum: $Enums.OrderStatus })
  status?: string;
}
