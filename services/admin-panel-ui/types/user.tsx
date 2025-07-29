export interface UserData {
  id: number;
  name: string;
  role: string;
  phone: number | string;
  lastActivity: number | string;
  orders: number;
  isActive?: boolean;
  status?: string;
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
