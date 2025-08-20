import { $Enums } from '@prisma/client';

export interface TrendsItemEntity {
  product_id: number;
  name: string;
  category: $Enums.ProductCategory;
  amount: number;
  order_count: number;
  total_quantity: number;
  total_amount: number;
}
