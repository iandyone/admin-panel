import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  DEFAULT_PER_PAGE,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PHONE_MIN_LENGTH,
} from '../../../constants';

export class FindAllUsersDto {
  @ApiProperty({ default: 0 })
  page: number;

  @ApiProperty({ default: DEFAULT_PER_PAGE })
  perPage: number;

  @ApiPropertyOptional()
  id?: number;

  @ApiPropertyOptional({
    minLength: NAME_MIN_LENGTH,
    maxLength: NAME_MAX_LENGTH,
  })
  firstName?: string;

  @ApiPropertyOptional({
    minLength: NAME_MIN_LENGTH,
    maxLength: NAME_MAX_LENGTH,
  })
  lastName?: string;

  @ApiPropertyOptional({ minLength: PHONE_MIN_LENGTH })
  phone?: string;

  @ApiPropertyOptional()
  role?: string;

  @ApiPropertyOptional({ description: 'timestamp' })
  dateFrom?: number;

  @ApiPropertyOptional({ description: 'timestamp' })
  dateTo?: number;

  @ApiPropertyOptional({ minimum: 0 })
  orders?: number;

  @ApiPropertyOptional()
  isActive?: boolean;
}
