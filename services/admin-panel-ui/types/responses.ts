import { EOrderStatuses, Order } from './orders';
import { ProductCategory } from './products';
import { Employee, UpdateUserDto, User } from './user';

export interface OrdersResponse {
  orders: Array<Omit<Order, 'order'> & { order: string[] }>;
  total: number;
}
export interface UsersResponse {
  users: User[];
  total: number;
}

export interface UpdateUserPayload {
  id: number;
  userData: UpdateUserDto;
}

export interface CreateOrderPayload {
  customer: string;
  location: string;
  productsIds: number[];
  status: EOrderStatuses;
  deliverymanId?: number;
  managerId?: number;
}

export interface UpdateOrderPayload extends CreateOrderPayload {
  id: number,
}


export interface EmployeeResponse {
  managers: Employee[];
  deliveryman: Employee[]
}

export interface Product {
  id: number;
  name: string;
  amount: number;
  category: ProductCategory;
  createdAt: string;
  updatedAt: string;
}

export interface StatisticDatasetItem {
  data: number[];
  days: number[];
}

export interface DashboardStatisticItem extends StatisticDatasetItem {
  count: number;
}

export interface DashboardStatistic {
  total: DashboardStatisticItem;
  completed: DashboardStatisticItem;
  cancelled: DashboardStatisticItem;
  benefit: DashboardStatisticItem;
}
