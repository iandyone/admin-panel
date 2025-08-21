import { Controller, Get, Query, UsePipes } from '@nestjs/common';

import { DashboardService } from './dashboard.service';
import { DashboardStatisticDto } from './dto/get-statistic.dto';

import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { dashboardStatisticSchema } from '../../validations';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @UsePipes(new JoiValidationPipe(dashboardStatisticSchema))
  getStatistic(@Query() query: DashboardStatisticDto) {
    return this.dashboardService.getDashboardStatistic(query);
  }

  @Get('/trends')
  @UsePipes(new JoiValidationPipe(dashboardStatisticSchema))
  getTrends(@Query() query: DashboardStatisticDto) {
    return this.dashboardService.getDashboardTrends(query);
  }

  @Get('/orders')
  @UsePipes(new JoiValidationPipe(dashboardStatisticSchema))
  getOrdersStatisticByStatus(@Query() query: DashboardStatisticDto) {
    return this.dashboardService.getDashboardOrders(query);
  }

  @Get('/products')
  @UsePipes(new JoiValidationPipe(dashboardStatisticSchema))
  getSoldProductsByCategory(@Query() query: DashboardStatisticDto) {
    return this.dashboardService.getDashboardSoldProducts(query);
  }
}
