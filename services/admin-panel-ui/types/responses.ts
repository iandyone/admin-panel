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

export interface UpdateOrderPayload {
  id: number,
  customer: string;
  location: string;
  deliverymanId?: number;
  managerId: number;
  status: EOrderStatuses;
  productsIds: number[]
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
