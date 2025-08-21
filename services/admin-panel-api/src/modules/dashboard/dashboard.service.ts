import { Injectable } from '@nestjs/common';

import { DashboardStatisticDto } from './dto/get-statistic.dto';
import { TrendItem } from './entities/trend-item.entity';

import { DatabaseService } from '../database/database.service';

@Injectable()
export class DashboardService {
  constructor(private readonly db: DatabaseService) {}

  async getDashboardStatistic(dashboardStatisticDto: DashboardStatisticDto) {
    return await this.db.getDashboardStatistic(dashboardStatisticDto);
  }

  async getDashboardTrends(dashboardFilterDto: DashboardStatisticDto) {
    const result = await this.db.getDashboardTrends(dashboardFilterDto);

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

  async getDashboardOrders(dashboardStatisticDto: DashboardStatisticDto) {
    return await this.db.getDashboardOrders(dashboardStatisticDto);
  }

  async getDashboardSoldProducts(dashboardStatisticDto: DashboardStatisticDto) {
    return await this.db.getDashboardSoldProducts(dashboardStatisticDto);
  }
}
