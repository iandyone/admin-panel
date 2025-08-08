import { $Enums, Credentials, Order, User } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export interface AppConfig {
  PORT_API: number;
}

export type UserData = User & Credentials;

export type OrderData = Order & { productsIds: string[] };

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  role: $Enums.Role;
  phone: string;
  lastActivity: number | null;
  orders: number;
  isActive: boolean;
}

export interface OrderResponse {
  id: number;
  order: string[];
  totalAmount: number | Decimal;
  location: string;
  customer: string;
  createdAt: Date;
  updatedAt: Date;
  manager: string;
  managerId: number;
  deliveryman: string;
  deliverymanId: number;
  status: string;
}

export interface UsersResponse {
  total: number;
  users: UserResponse[];
}

export interface OrdersResponse {
  orders: OrderResponse[];
  total: number;
}

export interface PaginationProps {
  page: number;
  perPage: number;
}

export interface UsersFindAllProps {
  page: string;
  perPage: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: string;
  dateFrom?: string;
  dateTo?: string;
  orders?: string;
  isActive?: string;
}
export interface OrdersFindAllProps {
  page: string;
  perPage: string;
  id?: string;
  order?: string;
  totalAmount?: string;
  location?: string;
  customer?: string;
  deliveryman?: string;
  dateFromCreated?: string;
  dateToCreated?: string;
  dateFromUpdated?: string;
  dateToUpdated?: string;
  manager?: string;
  status?: string;
}
