import { Decimal } from '@prisma/client/runtime/library';

export interface StatisticChart {
  day: string;
  benefit: Decimal;
  total: number;
  completed: number;
  cancelled: number;
}
