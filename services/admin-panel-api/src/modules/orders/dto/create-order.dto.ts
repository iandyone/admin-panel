import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
export class CreateOrderDto {
  @ApiProperty()
  customer: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  managerId: number;

  @ApiProperty()
  productsIds: number[];

  @ApiPropertyOptional()
  deliverymanId?: number;

  @ApiPropertyOptional({ default: OrderStatus.CREATED })
  status?: string;
}
