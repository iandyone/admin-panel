import { OrderData } from '../../../types';

export class CreateOrderDto {
  location: string;
  customer: string;
  managerId: number;
  productsIds: number[];
  deliverymanId?: number;
  status?: string;

  constructor({
    location,
    customer,
    managerId,
    status,
    productsIds,
    deliverymanId,
  }: OrderData) {
    this.location = location;
    this.customer = customer;
    this.managerId = managerId;
    this.deliverymanId = deliverymanId;
    this.productsIds = productsIds;
    this.status = status;
  }
}
