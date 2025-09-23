import { EOrderStatuses, Order } from './orders';
import { ProductCategory } from './products';
import { Employee, EUserRoles, UpdateUserDto, User } from './user';

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
export interface CreateUserPayload {
  firstName: string,
  lastName: string,
  email: string;
  role: EUserRoles,
  phone: string,
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

export interface TrendProduct {
  category: ProductCategory;
  productId: number;
  name: string;
  amount: string;
  orderCount: number;
  totalQuantity: number;
  totalAmount: number;
}


export interface DashboardOrders {
  status: string;
  total: number;
  percent: number;
}

export interface DashboardProducts {
  category: ProductCategory;
  percent: number;
}
