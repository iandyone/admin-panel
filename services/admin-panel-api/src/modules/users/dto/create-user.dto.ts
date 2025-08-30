import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PHONE_MIN_LENGTH,
} from '../../../constants';

export class CreateUserDto {
  @ApiProperty({ minLength: NAME_MIN_LENGTH, maxLength: NAME_MAX_LENGTH })
  firstName: string;

  @ApiProperty({ minLength: NAME_MIN_LENGTH, maxLength: NAME_MAX_LENGTH })
  lastName: string;

  @ApiProperty({ enum: $Enums.Role })
  role: string;

  @ApiProperty({ minLength: PHONE_MIN_LENGTH })
  phone: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  isActive: boolean;
}
