import { $Enums, Credentials, Order, User } from '@prisma/client';

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

export interface UsersResponse {
  total: number;
  users: UserResponse[];
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
