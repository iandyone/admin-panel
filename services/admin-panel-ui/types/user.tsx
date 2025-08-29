export interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  lastActivity: number | string;
  orders: number;
  isActive?: boolean;
}

export enum EUserRoles {
  ADMIN = "admin",
  MANAGER = "manager",
  DELIVERY = "delivery",
}

export enum EUserStatuses {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export type UpdateUserDto = Pick<
  User,
  "firstName" | "lastName" | "role" | "isActive" | "phone"
>;

export interface Employee {
  id: number;
  name: string;
  role: EUserRoles;
}

export interface UserAuthData {
  id: number;
  email: string;
  role: EUserRoles;
  firstName: string;
  lastName: string;
  isActive: boolean;
  isNewUser: boolean;
  iat: number;
  exp: number;
}
