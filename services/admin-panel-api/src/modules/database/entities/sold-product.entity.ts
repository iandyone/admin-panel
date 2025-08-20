import { ProductCategory } from '@prisma/client';

export interface SoldProductStatistic {
  category: ProductCategory;
  percent: number;
}
