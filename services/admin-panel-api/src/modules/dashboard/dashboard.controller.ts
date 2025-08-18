import { Controller, Get, Put } from '@nestjs/common';

import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  getStatistic() {
    return this.dashboardService.getStatistic();
  }

  @Put()
  getStatisticTest() {
    return this.dashboardService.getStatisticTest();
  }
}
