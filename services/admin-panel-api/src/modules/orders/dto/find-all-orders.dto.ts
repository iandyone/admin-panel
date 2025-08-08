import { $Enums } from '@prisma/client';
import { OrdersFindAllProps } from 'src/types';

export class FindAllOrdersDto {
  page: number;
  perPage: number;
  id: number;
  order: string;
  customer: string;
  deliveryman: string;
  location: string;
  manager: string;
  totalAmount: number;
  dateFromCreated: number;
  dateToCreated: number;
  dateFromUpdated: number;
  dateToUpdated: number;
  status: string;

  constructor({
    page,
    perPage,
    id,
    order,
    customer,
    deliveryman,
    location,
    manager,
    totalAmount,
    dateFromCreated,
    dateFromUpdated,
    dateToCreated,
    dateToUpdated,
    status,
  }: OrdersFindAllProps) {
    this.page = Number(page);
    this.perPage = Number(perPage);
    this.id = Number(id);
    this.order = order;
    this.deliveryman = deliveryman;
    this.customer = customer;
    this.location = location;
    this.manager = manager;
    this.totalAmount = Number(totalAmount);
    this.status = $Enums.OrderStatus[status?.toUpperCase()];
    this.dateFromCreated = Number(dateFromCreated);
    this.dateToCreated = Number(dateToCreated);
    this.dateFromUpdated = Number(dateFromUpdated);
    this.dateToUpdated = Number(dateToUpdated);
  }
}
