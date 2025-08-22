import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DEFAULT_PER_PAGE } from '../../../constants';

export class FindAllUsersDto {
  @ApiProperty({ default: 0 })
  page: number;

  @ApiProperty({ default: DEFAULT_PER_PAGE })
  perPage: number;

  @ApiPropertyOptional()
  id?: number;

  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  role?: string;

  @ApiPropertyOptional({ description: 'timestamp' })
  dateFrom?: number;

  @ApiPropertyOptional({ description: 'timestamp' })
  dateTo?: number;

  @ApiPropertyOptional()
  orders?: number;

  @ApiPropertyOptional()
  isActive?: boolean;
}
