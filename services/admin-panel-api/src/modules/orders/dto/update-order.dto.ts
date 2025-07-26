import { OrderData } from '../../../types';

export class UpdateOrderDto {
  location?: string | null;
  customer?: string | null;
  managerId?: number | null;
  productsIds?: string[] | null;
  deliverymanId?: number | null;
  status?: string | null;

  constructor({
    location,
    customer,
    managerId,
    status,
    productsIds,
    deliverymanId,
  }: Partial<OrderData>) {
    this.location = location || null;
    this.customer = customer || null;
    this.managerId = managerId || null;
    this.deliverymanId = deliverymanId || null;
    this.productsIds = productsIds || null;
    this.status = status || null;
  }
}
