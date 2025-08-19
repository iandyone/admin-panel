import { DashboardStatisticProps } from 'src/types';

export class DashboardStatisticDto {
  dateFrom?: number;
  dateTo?: number;

  constructor({ dateFrom, dateTo }: DashboardStatisticProps) {
    this.dateFrom = Number(dateFrom);
    this.dateTo = Number(dateTo);
  }
}
