import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty()
  location?: string;

  @ApiProperty()
  customer?: string;

  @ApiProperty()
  managerId?: number;

  @ApiProperty()
  productsIds?: number[];

  @ApiPropertyOptional()
  deliverymanId?: number;

  @ApiProperty()
  status?: string;
}
