import { $Enums } from '@prisma/client';

export interface TrendItem {
  productId: number;
  name: string;
  amount: string;
  category: $Enums.ProductCategory;
  orderCount: number;
  totalQuantity: number;
  totalAmount: number;
}
