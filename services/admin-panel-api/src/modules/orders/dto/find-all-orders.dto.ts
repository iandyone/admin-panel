import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

import {
  CUSTOMER_MAX_LENGTH,
  CUSTOMER_MIN_LENGTH,
  DEFAULT_PER_PAGE,
  LOCATION_MAX_LENGTH,
  LOCATION_MIN_LENGTH,
  STRING_FILTER_MIN_LENGTH,
} from '../../../constants';

export class FindAllOrdersDto {
  @ApiProperty({ default: 0 })
  page: number;

  @ApiProperty({ default: DEFAULT_PER_PAGE })
  perPage: number;

  @ApiPropertyOptional({ minimum: 1 })
  id: number;

  @ApiPropertyOptional({ minLength: STRING_FILTER_MIN_LENGTH })
  order: string;

  @ApiPropertyOptional({
    minLength: CUSTOMER_MIN_LENGTH,
    maxLength: CUSTOMER_MAX_LENGTH,
  })
  customer: string;

  @ApiPropertyOptional()
  deliveryman: string;

  @ApiPropertyOptional({
    minLength: LOCATION_MIN_LENGTH,
    maxLength: LOCATION_MAX_LENGTH,
  })
  location: string;

  @ApiPropertyOptional({
    minLength: CUSTOMER_MIN_LENGTH,
    maxLength: CUSTOMER_MAX_LENGTH,
  })
  manager: string;

  @ApiPropertyOptional({ minimum: 0 })
  totalAmount: number;

  @ApiPropertyOptional({ description: 'timestamp' })
  dateFromCreated: number;

  @ApiPropertyOptional({ description: 'timestamp' })
  dateToCreated: number;

  @ApiPropertyOptional({ description: 'timestamp' })
  dateFromUpdated: number;

  @ApiPropertyOptional({ description: 'timestamp' })
  dateToUpdated: number;

  @ApiPropertyOptional({ enum: $Enums.OrderStatus })
  status: string;
}
