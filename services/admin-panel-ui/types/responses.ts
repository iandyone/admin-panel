import { Order } from './orders';
import { UpdateUserDto, User } from './user';

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
  userData: UpdateUserDto
}

