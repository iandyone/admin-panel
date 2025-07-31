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
  lastActivity: string | null;
  orders: number;
  isActive: boolean;
}

export type UsersResponse = UserResponse[];

export interface PaginationProps {
  page: number;
  perPage: number;
}
