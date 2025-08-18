import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';

@Injectable()
export class DashboardService {
  constructor(private readonly db: DatabaseService) {}

  async getStatistic() {
    return await this.db.getStatistic();
  }

  async getStatisticTest() {
    return await this.db.getStatisticTest();
  }
}
