import { ApiPropertyOptional } from '@nestjs/swagger';

export class DashboardStatisticDto {
  @ApiPropertyOptional({ description: 'timestamp' })
  dateFrom?: number;

  @ApiPropertyOptional({ description: 'timestamp' })
  dateTo?: number;
}
