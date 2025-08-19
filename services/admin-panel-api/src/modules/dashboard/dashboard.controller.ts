import { Controller, Get, Put, Query, UsePipes } from '@nestjs/common';

import { DashboardService } from './dashboard.service';

import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { DashboardStatisticProps } from '../../types';
import { dashboardStatisticSchema } from '../../validations';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @UsePipes(new JoiValidationPipe(dashboardStatisticSchema))
  getStatistic(@Query() query: DashboardStatisticProps) {
    return this.dashboardService.getStatistic(query);
  }

  @Put()
  getStatisticTest() {
    return this.dashboardService.getStatisticTest();
  }
}
