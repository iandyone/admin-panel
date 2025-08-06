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
