import { UpdateUserDto, User } from './user';

export interface UsersResponse {
  users: User[];
  total: number;
}

export interface UpdateUserPayload {
  id: number;
  userData: UpdateUserDto
}
