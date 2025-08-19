import { Injectable } from '@nestjs/common';

import { DashboardStatisticDto } from './dto/get-statistic.dto';

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

  async getStatisticTest() {
    return await this.db.getStatisticTest();
  }
}
