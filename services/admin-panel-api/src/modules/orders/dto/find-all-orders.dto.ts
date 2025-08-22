import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DEFAULT_PER_PAGE } from '../../../constants';

export class FindAllOrdersDto {
  @ApiProperty({ default: 0 })
  page: number;

  @ApiProperty({ default: DEFAULT_PER_PAGE })
  perPage: number;

  @ApiPropertyOptional()
  id: number;

  @ApiPropertyOptional()
  order: string;

  @ApiPropertyOptional()
  customer: string;

  @ApiPropertyOptional()
  deliveryman: string;

  @ApiPropertyOptional()
  location: string;

  @ApiPropertyOptional()
  manager: string;

  @ApiPropertyOptional()
  totalAmount: number;

  @ApiPropertyOptional({ description: 'timestamp' })
  dateFromCreated: number;

  @ApiPropertyOptional({ description: 'timestamp' })
  dateToCreated: number;

  @ApiPropertyOptional({ description: 'timestamp' })
  dateFromUpdated: number;

  @ApiPropertyOptional({ description: 'timestamp' })
  dateToUpdated: number;

  @ApiPropertyOptional()
  status: string;
}
