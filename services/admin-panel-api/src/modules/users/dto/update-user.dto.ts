import { ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

export class UpdateUserDto {
  @ApiPropertyOptional()
  firstName: string;

  @ApiPropertyOptional()
  lastName: string;

  @ApiPropertyOptional()
  phone: string;

  @ApiPropertyOptional({ enum: $Enums.Role })
  role: string;

  @ApiPropertyOptional()
  isActive: boolean;
}
