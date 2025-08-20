import { Injectable } from '@nestjs/common';

import { DashboardStatisticDto } from './dto/get-statistic.dto';
import { TrendItem } from './entities/trend-item.entity';

import { DashboardStatisticProps } from '../../types';
import { filterNullValues } from '../../utils';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class DashboardService {
  constructor(private readonly db: DatabaseService) {}

  async getStatistic(filter: DashboardStatisticProps) {
    const dashboardStatisticDto = new DashboardStatisticDto(filter);

    return await this.db.getStatistic(
      filterNullValues<DashboardStatisticDto>(dashboardStatisticDto),
    );
  }

  async getTrends(filter: DashboardStatisticProps) {
    const dashboardFilterDto = new DashboardStatisticDto(filter);

    const result = await this.db.getTrends(
      filterNullValues<DashboardStatisticDto>(dashboardFilterDto),
    );

    const data: TrendItem[] = result.map(
      ({
        name,
        order_count,
        category,
        amount,
        product_id,
        total_quantity,
        total_amount,
      }) => ({
        productId: product_id,
        name,
        category,
        amount: amount.toFixed(2),
        orderCount: order_count,
        totalQuantity: total_quantity,
        totalAmount: total_amount,
      }),
    );

    return data;
  }
}
