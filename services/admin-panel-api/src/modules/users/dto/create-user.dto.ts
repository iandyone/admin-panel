import { ApiProperty } from '@nestjs/swagger';

import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  PHONE_MIN_LENGTH,
} from '../../../constants';

export class CreateUserDto {
  @ApiProperty({ minLength: NAME_MIN_LENGTH, maxLength: NAME_MAX_LENGTH })
  firstName: string;

  @ApiProperty({ minLength: NAME_MIN_LENGTH, maxLength: NAME_MAX_LENGTH })
  lastName: string;

  @ApiProperty({ minLength: PHONE_MIN_LENGTH })
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ minLength: PASSWORD_MIN_LENGTH })
  password: string;
}
