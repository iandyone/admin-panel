import { User } from './user';

export interface UsersResponse {
  users: User[];
  total: number;
}
