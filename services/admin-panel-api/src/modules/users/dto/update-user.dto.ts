import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  PHONE_MIN_LENGTH,
} from '../../../constants';

export class UpdateUserDto {
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

  @ApiProperty({ enum: $Enums.Role })
  role: string;

  @ApiPropertyOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ minLength: PASSWORD_MIN_LENGTH })
  password?: string;
}
