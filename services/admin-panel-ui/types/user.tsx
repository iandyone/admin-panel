export interface UserData {
  id: number;
  name: string;
  role: string;
  phone: number | string;
  lastActivity: number | string;
  orders: number;
  isActive?: boolean;
  status?: EUserStatuses;
}

export enum EUserRoles {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  DELIVERY = "DELIVERY",
}

export enum EUserStatuses {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export type UpdateUserDto = Pick<
  UserData,
  "name" | "role" | "status" | "phone"
>;
