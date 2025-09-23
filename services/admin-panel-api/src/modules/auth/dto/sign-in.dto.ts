import { ApiProperty } from '@nestjs/swagger';

import { PASSWORD_MIN_LENGTH } from '../../../constants';

export class SignInDto {
  @ApiProperty()
  email: string;

  @ApiProperty({ minLength: PASSWORD_MIN_LENGTH })
  password: string;
}
